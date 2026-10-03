import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { FilteredProductGrid } from "@/components/filtered-product-grid";
import { brands, getBrand, getBrandProducts } from "@/lib/brands";

type PageProps<T extends string = ""> = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return brands.map((b) => ({ id: b.id }));
}

export async function generateMetadata({
  params,
}: PageProps<"/brands/[id]">): Promise<Metadata> {
  const { id } = await params;
  const brand = getBrand(id);
  if (!brand) return { title: "Brand not found" };
  return {
    title: `${brand.name} | British Brands`,
    description: brand.description,
  };
}

export default async function BrandPage({ params }: PageProps<"/brands/[id]">) {
  const { id } = await params;
  const brand = getBrand(id);
  if (!brand) notFound();

  const items = getBrandProducts(brand.id);

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
        <span className="text-ink">{brand.name}</span>
      </nav>

      <header className="mt-10 mb-12 flex flex-col items-center text-center">
        {/* <div className="relative h-24 w-full aspect-[4/3] mb-6">
          <Image
            src={brand.logo}
            alt={`${brand.name} logo`}
            fill
            className="object-contain rounded-md"
          />
        </div> */}
        {/* <p className="eyebrow-rule text-[11px] font-medium uppercase tracking-[0.45em] text-gold">
          Featured Brand
        </p> */}
        <h1 className="mt-4 font-display text-2xl font-semibold uppercase tracking-[0.18em] md:text-3xl">
          {brand.name}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-[15px] font-light leading-[1.9] text-muted">
          {brand.description}
        </p>
      </header>

      {/* <div className="mt-10 flex flex-col items-center gap-4 border-y border-line py-6">
        <nav
          aria-label="Brands"
          className="flex flex-wrap justify-center gap-2"
        >
          {brands.map((b) => {
            const active = b.id === brand.id;
            return (
              <Link
                key={b.id}
                href={`/brands/${b.id}`}
                aria-current={active ? "page" : undefined}
                className={`px-5 py-2.5 text-[10px] font-medium uppercase tracking-[0.22em] transition-colors duration-300 ${
                  active
                    ? "bg-ink text-white"
                    : "border border-line text-muted hover:border-ink hover:text-ink"
                }`}
              >
                {b.name}
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
