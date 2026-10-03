import type { Metadata } from "next";
import Link from "next/link";
import { CollectionTiles } from "@/components/category-grid";

export const metadata: Metadata = {
  title: "Collections",
  description:
    "Shop BRITISH BRANDS by collection — long-lasting Eau de Parfums For Him, For Her and Unisex.",
};

export default function CollectionsPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 pb-24 pt-10 lg:px-10 lg:pt-14">
      <nav
        aria-label="Breadcrumb"
        className="text-[10px] uppercase text-center tracking-[0.25em] text-muted"
      >
        <Link href="/" className="transition-colors hover:text-ink">
          Home
        </Link>
        <span className="mx-3">/</span>
        <span className="text-ink">Collections</span>
      </nav>

      <header className="mt-8 text-center">
        <p className="eyebrow-rule text-[11px] font-medium uppercase tracking-[0.45em] text-gold">
          Shop by
        </p>
        <h1 className="mt-4 font-display text-2xl font-semibold uppercase tracking-[0.18em] md:text-3xl">
          Collections
        </h1>
      </header>

      <div className="mt-12">
        <CollectionTiles />
      </div>
    </div>
  );
}
