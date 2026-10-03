"use client";

import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { useWishlist } from "@/components/wishlist";
import { products } from "@/lib/products";

export function WishlistGrid() {
  const { slugs } = useWishlist();
  const saved = products.filter((p) => slugs.includes(p.slug));

  if (saved.length === 0) {
    return (
      <div className="py-20 text-center">
        <svg
          viewBox="0 0 24 24"
          className="mx-auto h-10 w-10 text-line"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
        >
          <path d="M12 20.5C6.8 16.6 3.5 13.4 3.5 9.9A4.4 4.4 0 0112 7.2a4.4 4.4 0 018.5 2.7c0 3.5-3.3 6.7-8.5 10.6z" />
        </svg>
        <p className="mt-6 font-display text-lg font-semibold uppercase tracking-[0.2em] text-muted">
          Nothing Saved Yet
        </p>
        <p className="mx-auto mt-3 max-w-sm text-sm font-light leading-relaxed text-muted">
          Tap the heart on any fragrance to keep it here while you decide.
        </p>
        <Link
          href="/collections"
          className="mt-8 inline-block bg-ink px-10 py-4 text-[11px] font-medium uppercase tracking-[0.28em] text-white transition-colors duration-300 hover:bg-gold"
        >
          Browse Fragrances
        </Link>
      </div>
    );
  }

  return (
    <>
      <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-muted">
        {saved.length} {saved.length === 1 ? "Fragrance" : "Fragrances"} saved
      </p>
      <div className="mt-8 grid grid-cols-2 gap-5 lg:grid-cols-3 lg:gap-6">
        {saved.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </>
  );
}
