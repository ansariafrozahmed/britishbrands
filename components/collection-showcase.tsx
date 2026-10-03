"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/reveal";
import type { Product } from "@/lib/products";

type View = "grid" | "slider";

export function CollectionShowcase({
  title,
  tagline,
  products,
  href,
  defaultView = "grid",
}: {
  title: string;
  tagline: string;
  products: Product[];
  href: string;
  defaultView?: View;
}) {
  const [view, setView] = useState<View>(defaultView);
  const track = useRef<HTMLDivElement>(null);

  const slide = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const step = card ? card.offsetWidth + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-28">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow-rule text-[11px] font-medium uppercase tracking-[0.45em] text-gold">
              The Edit
            </p>
            <h2 className="mt-5 font-display text-2xl font-semibold uppercase tracking-[0.18em] md:text-3xl">
              {title}
            </h2>
            <p className="mt-3 max-w-md text-sm font-light leading-relaxed text-muted">
              {tagline}
            </p>
          </div>

          <div className="flex items-center gap-5">
            <div
              className="flex border border-line"
              role="group"
              aria-label="Layout"
            >
              <button
                type="button"
                onClick={() => setView("grid")}
                aria-pressed={view === "grid"}
                aria-label="Grid view"
                className={`flex h-10 w-10 items-center justify-center transition-colors ${
                  view === "grid"
                    ? "bg-ink text-white"
                    : "text-muted hover:text-ink"
                }`}
              >
                <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="currentColor">
                  <rect x="1" y="1" width="6" height="6" />
                  <rect x="9" y="1" width="6" height="6" />
                  <rect x="1" y="9" width="6" height="6" />
                  <rect x="9" y="9" width="6" height="6" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => setView("slider")}
                aria-pressed={view === "slider"}
                aria-label="Slider view"
                className={`flex h-10 w-10 items-center justify-center transition-colors ${
                  view === "slider"
                    ? "bg-ink text-white"
                    : "text-muted hover:text-ink"
                }`}
              >
                <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="currentColor">
                  <rect x="0" y="3" width="2.5" height="10" />
                  <rect x="4.5" y="3" width="7" height="10" />
                  <rect x="13.5" y="3" width="2.5" height="10" />
                </svg>
              </button>
            </div>

            {view === "slider" && (
              <div className="flex">
                <button
                  type="button"
                  onClick={() => slide(-1)}
                  aria-label="Previous"
                  className="flex h-10 w-10 items-center justify-center border border-line transition-colors hover:border-ink hover:bg-ink hover:text-white"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={() => slide(1)}
                  aria-label="Next"
                  className="-ml-px flex h-10 w-10 items-center justify-center border border-line transition-colors hover:border-ink hover:bg-ink hover:text-white"
                >
                  →
                </button>
              </div>
            )}
          </div>
        </div>
      </Reveal>

      {view === "grid" ? (
        <div className="mt-12 grid grid-cols-2 gap-5 lg:grid-cols-4 lg:gap-6">
          {products.map((product, i) => (
            <Reveal key={product.slug} delay={i * 80}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      ) : (
        <div
          ref={track}
          className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2"
        >
          {products.map((product) => (
            <div
              key={product.slug}
              data-card
              className="w-[72%] shrink-0 snap-start sm:w-[42%] lg:w-[23.5%]"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}

      <Reveal className="mt-14 text-center">
        <Link
          href={href}
          className="link-sweep text-[11px] font-medium uppercase tracking-[0.35em] text-ink"
        >
          View the Full Edit
        </Link>
      </Reveal>
    </section>
  );
}
