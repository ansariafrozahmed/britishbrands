"use client";

import { useEffect, useState } from "react";

const KEY = "britishbrands-wishlist";
const EVENT = "britishbrands-wishlist-change";

function read(): string[] {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) ?? "[]");
    return Array.isArray(raw) ? raw.filter((s) => typeof s === "string") : [];
  } catch {
    return [];
  }
}

function write(slugs: string[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(slugs));
  } catch {
    // storage unavailable — wishlist lives for this render only
  }
  window.dispatchEvent(new Event(EVENT));
}

export function useWishlist() {
  const [slugs, setSlugs] = useState<string[]>([]);

  useEffect(() => {
    const sync = () => setSlugs(read());
    sync();
    window.addEventListener(EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const toggle = (slug: string) => {
    const current = read();
    write(
      current.includes(slug)
        ? current.filter((s) => s !== slug)
        : [...current, slug],
    );
  };

  return { slugs, toggle, has: (slug: string) => slugs.includes(slug) };
}

export function WishlistButton({
  slug,
  className = "",
}: {
  slug: string;
  className?: string;
}) {
  const { has, toggle } = useWishlist();
  const saved = has(slug);

  return (
    <button
      type="button"
      aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
      aria-pressed={saved}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(slug);
      }}
      className={`flex h-9 w-9 bg-white rounded-xs items-center justify-center transition-colors duration-300 ${className}`}
    >
      <svg
        viewBox="0 0 24 24"
        className={`h-4 w-4 transition-colors duration-300 ${
          saved ? "text-gold" : "text-ink"
        }`}
        fill={saved ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.6"
      >
        <path d="M12 20.5C6.8 16.6 3.5 13.4 3.5 9.9A4.4 4.4 0 0112 7.2a4.4 4.4 0 018.5 2.7c0 3.5-3.3 6.7-8.5 10.6z" />
      </svg>
    </button>
  );
}
