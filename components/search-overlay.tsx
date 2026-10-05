"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { formatPrice } from "@/lib/products";

export function SearchOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  // mounts fresh on every open, so the query resets without effects
  if (!open) return null;
  return <SearchPanel onClose={onClose} />;
}

function SearchPanel({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  useEffect(() => {
    const q = query.trim();
    if (!q) {
      setResults([]);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      setLoading(true);
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://britishbrandbck.demotempwebsite.co.in/wp-json";
        const res = await fetch(`${apiUrl}/custom/v1/search-products?search=${encodeURIComponent(q)}`);
        const data = await res.json();
        if (data && data.success && data.products) {
          setResults(data.products);
        } else {
          setResults([]);
        }
      } catch (err) {
        console.error("Search API error:", err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  return (
    <div
      className="fixed inset-0 z-[60] overflow-y-auto bg-bg"
      role="dialog"
      aria-modal="true"
      aria-label="Search fragrances"
    >
      <div className="mx-auto max-w-3xl px-5 pb-20 pt-24">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close search"
          className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center border border-line transition-colors hover:border-ink hover:bg-ink hover:text-white"
        >
          <svg viewBox="0 0 20 20" className="h-4 w-4" stroke="currentColor" strokeWidth="1.5" fill="none">
            <path d="M4 4l12 12M16 4L4 16" />
          </svg>
        </button>

        <p className="eyebrow-rule text-[11px] font-medium uppercase tracking-[0.45em] text-gold">
          Search
        </p>
        <div className="mt-6 flex items-center gap-4 border-b border-ink pb-4">
          <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-muted" fill="none" stroke="currentColor" strokeWidth="1.6">
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-3.8-3.8" />
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search fragrances, notes, families…"
            aria-label="Search"
            className="w-full bg-transparent font-display text-xl font-medium uppercase tracking-[0.1em] placeholder:normal-case placeholder:font-sans placeholder:font-light placeholder:tracking-normal placeholder:text-muted/50 focus:outline-none"
          />
        </div>

        <p className="mt-6 text-[10px] font-medium uppercase tracking-[0.25em] text-muted">
          {loading ? "Searching..." : `${results.length} ${results.length === 1 ? "Result" : "Results"}`}
        </p>

        {!loading && results.length === 0 ? (
          query.trim() ? (
            <p className="mt-10 text-sm font-light text-muted">
              Nothing matches “{query}”. Try a note like{" "}
              <em>vanilla</em>, <em>lavender</em> or <em>bergamot</em>.
            </p>
          ) : (
            <p className="mt-10 text-sm font-light text-muted">
              Start typing to search for fragrances, notes, or families...
            </p>
          )
        ) : (
          <ul className="mt-4 divide-y divide-line">
            {results.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/products/${p.slug}`}
                  onClick={onClose}
                  className="group flex items-center gap-5 py-4"
                >
                  <span className="relative block h-16 w-14 shrink-0 overflow-hidden">
                    <Image
                      src={Array.isArray(p.image) ? p.image[0] : p.image}
                      alt=""
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-[13px] font-semibold uppercase tracking-[0.15em] transition-colors group-hover:text-gold">
                      {p.name}
                    </span>
                    <span className="mt-1 block truncate text-xs font-light text-muted">
                      {p.family}{p.tagline ? ` · ${p.tagline}` : ""}
                    </span>
                  </span>
                  <span className="shrink-0 text-sm font-medium">
                    {formatPrice(Number(p.price))}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
