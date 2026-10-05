import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FilteredProductGrid } from "@/components/filtered-product-grid";
import {
  collections,
  getCollection,
  getCollectionProducts,
} from "@/lib/products";

export function generateStaticParams() {
  return collections.map((c) => ({ handle: c.handle }));
}

export async function generateMetadata({
  params,
}: PageProps<"/collections/[handle]">): Promise<Metadata> {
  const { handle } = await params;
  const collection = getCollection(handle);
  if (!collection) return { title: "Collection not found" };
  return {
    title: `${collection.title} Fragrances`,
    description: `${collection.description} Long-lasting Eau de Parfums by BRITISH BRANDS.`,
  };
}

export default async function CollectionPage({
  params,
}: PageProps<"/collections/[handle]">) {
  const { handle } = await params;
  const collection = getCollection(handle);
  if (!collection) notFound();

  const items = getCollectionProducts(collection.handle);

  return (
    <div className="mx-auto max-w-[1500px] px-5 pb-24 pt-10 lg:px-14 lg:pt-14">
      <nav
        aria-label="Breadcrumb"
        className="text-[10px] uppercase text-center tracking-[0.25em] text-muted"
      >
        <Link href="/" className="transition-colors hover:text-ink">
          Home
        </Link>
        <span className="mx-3">/</span>
        <Link href="/collections" className="transition-colors hover:text-ink">
          Collections
        </Link>
        <span className="mx-3">/</span>
        <span className="text-ink">{collection.title}</span>
      </nav>

      <header className="mt-10 mb-12 text-center">
        {/* <p className="eyebrow-rule text-[11px] font-medium uppercase tracking-[0.45em] text-gold">
          Collection
        </p> */}
        <h1 className="mt-4 font-display text-2xl font-semibold uppercase tracking-[0.18em] md:text-3xl">
          {collection.title}
        </h1>
        <p className="mx-auto mt-2 max-w-xl text-[15px] font-light leading-[1.9] text-muted">
          {collection.description}
        </p>
      </header>

      {/* <div className="mt-10 flex flex-col items-center gap-4 border-y border-line py-6">
        <nav
          aria-label="Collections"
          className="flex flex-wrap justify-center gap-2"
        >
          {collections.map((c) => {
            const active = c.handle === collection.handle;
            return (
              <Link
                key={c.handle}
                href={`/collections/${c.handle}`}
                aria-current={active ? "page" : undefined}
                className={`px-5 py-2.5 text-[10px] font-medium uppercase tracking-[0.22em] transition-colors duration-300 ${
                  active
                    ? "bg-ink text-white"
                    : "border border-line text-muted hover:border-ink hover:text-ink"
                }`}
              >
                {c.title}
              </Link>
            );
          })}
        </nav>
        <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-muted">
          {items.length} {items.length === 1 ? "Product" : "Products"}
        </p>
      </div> */}

      <FilteredProductGrid products={items} />
    </div>
  );
}
