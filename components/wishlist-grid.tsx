"use client";

import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { useWishlist } from "@/components/wishlist";
import { whatsappHref } from "@/lib/site";

export function WishlistGrid() {
  const { items: saved } = useWishlist();

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

  const enquireMessage = `Hi British Brands, I'm interested in the following products:\n\n${saved
    .map((p) => `- ${p.name}`)
    .join("\n")}\n\nCould you share availability and offers?`;

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-muted">
          {saved.length} {saved.length === 1 ? "Fragrance" : "Fragrances"} saved
        </p>
        <a
          href={whatsappHref(enquireMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex h-12 items-center gap-3 bg-[#25D366] px-8 text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition-all hover:bg-[#1ebe5a] rounded-md"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
            <path d="M12 2.2A9.8 9.8 0 003.6 17l-1.4 4.8 4.9-1.3A9.8 9.8 0 1012 2.2zm0 17.9a8.1 8.1 0 01-4.1-1.1l-.3-.2-2.9.8.8-2.8-.2-.3A8.1 8.1 0 1112 20.1zm4.4-6c-.2-.1-1.4-.7-1.7-.8-.2-.1-.4-.1-.5.1l-.8.9c-.1.2-.3.2-.5.1a6.7 6.7 0 01-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5a.9.9 0 00-.7.3 2.8 2.8 0 00-.9 2.1 4.9 4.9 0 001 2.6 11.2 11.2 0 004.3 3.8c1.6.7 2.2.7 3 .6a2.6 2.6 0 001.7-1.2 2.1 2.1 0 00.1-1.2c0-.1-.2-.2-.4-.3z" />
          </svg>
          Enquire About All
        </a>
      </div>
      <div className="mt-8 grid grid-cols-2 gap-5 lg:grid-cols-4 lg:gap-6">
        {saved.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </>
  );
}
