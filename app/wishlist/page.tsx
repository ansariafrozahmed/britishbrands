import type { Metadata } from "next";
import { WishlistGrid } from "@/components/wishlist-grid";

export const metadata: Metadata = {
  title: "Wishlist",
  description: "Fragrances you've saved for later at BRITISH BRANDS.",
};

export default function WishlistPage() {
  return (
    <div className="mx-auto max-w-[1500px] px-5 pb-24 pt-14 lg:px-14 lg:pt-20">
      <header className="text-center">
        <p className="eyebrow-rule text-[11px] font-medium uppercase tracking-[0.45em] text-gold">
          Saved For Later
        </p>
        <h1 className="mt-6 font-display text-2xl font-semibold uppercase tracking-[0.18em] md:text-3xl">
          Your Wishlist
        </h1>
      </header>

      <div className="mt-12">
        <WishlistGrid />
      </div>
    </div>
  );
}
