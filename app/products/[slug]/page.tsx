import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { ProductCard } from "@/components/product-card";
import { QuickEnquiry } from "@/components/quick-enquiry";
import { Reveal } from "@/components/reveal";
import {
  categoryLabel,
  discountPercent,
  formatPrice,
  getCollection,
  getProduct,
  getRelated,
  products,
} from "@/lib/products";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Fragrance not found" };
  return {
    title: `${product.name} Eau de Parfum`,
    description: product.description,
  };
}

function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-[11px] font-semibold uppercase tracking-[0.3em]">
      {children}
    </h2>
  );
}

function Accordion({
  title,
  defaultOpen = false,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: ReactNode;
}) {
  return (
    <details open={defaultOpen} className="group border-b border-line">
      <summary className="flex cursor-pointer list-none items-center justify-between py-5 [&::-webkit-details-marker]:hidden">
        <span className="text-[11px] font-semibold uppercase tracking-[0.3em]">
          {title}
        </span>
        <span
          aria-hidden
          className="relative h-3 w-3 transition-transform duration-300 group-open:rotate-45"
        >
          <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-ink" />
          <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-ink" />
        </span>
      </summary>
      <div className="pb-6">{children}</div>
    </details>
  );
}

export default async function ProductPage({
  params,
}: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = getRelated(product);
  const off = discountPercent(product);
  const collection = getCollection(product.collections[0]);

  const pyramid = [
    { tier: "Top Notes", notes: product.notes.top },
    { tier: "Middle Notes", notes: product.notes.middle },
    { tier: "Base Notes", notes: product.notes.base },
  ];

  const specs = [
    ["Formulation", product.specs.formulation],
    ["Target Gender", product.specs.targetGender],
    ["Bottle Volume", product.specs.volume],
    ["Ideal Wear", product.specs.idealWear],
    ["Packaging", product.specs.packaging],
    ["Storage", product.specs.storage],
  ];

  return (
    <div className="pt-10">
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <nav
          aria-label="Breadcrumb"
          className="text-[10px] uppercase tracking-[0.25em] text-muted"
        >
          <Link href="/" className="transition-colors hover:text-ink">
            Home
          </Link>
          <span className="mx-3">/</span>
          <Link href="/collections" className="transition-colors hover:text-ink">
            Collections
          </Link>
          {collection && (
            <>
              <span className="mx-3">/</span>
              <Link
                href={`/collections/${collection.handle}`}
                className="transition-colors hover:text-ink"
              >
                {collection.title}
              </Link>
            </>
          )}
          <span className="mx-3">/</span>
          <span className="text-ink">{product.name}</span>
        </nav>

        <div className="mt-8 grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* ————— image ————— */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src={product.image}
                alt={`${product.name} Eau de Parfum bottle`}
                fill
                preload
                sizes="(max-width: 1024px) 95vw, 48vw"
                className="object-cover"
              />
            </div>
            <div className="grid grid-cols-3 border border-t-0 border-line text-center">
              {[
                ["Longevity", product.longevity],
                ["Category", categoryLabel[product.gender].split(" (")[0]],
                ["Size", product.sizes[0]],
              ].map(([label, value], i) => (
                <div
                  key={label}
                  className={`px-2 py-4 ${i > 0 ? "border-l border-line" : ""}`}
                >
                  <p className="text-[9px] uppercase tracking-[0.25em] text-muted">
                    {label}
                  </p>
                  <p className="mt-1.5 text-[13px] font-medium">{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ————— details ————— */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-gold">
              {categoryLabel[product.gender]} · {product.sizes[0]}
            </p>
            <h1 className="mt-4 font-display text-3xl font-semibold uppercase tracking-[0.14em] md:text-4xl">
              {product.name}
            </h1>
            <p className="mt-3 text-[15px] font-light text-muted">
              {product.family}
            </p>

            <div className="mt-7 flex flex-wrap items-baseline gap-3 border-y border-line py-5">
              <span className="text-3xl font-semibold tracking-wide">
                {formatPrice(product.price)}
              </span>
              <span className="text-base font-light text-muted line-through">
                <span className="sr-only">MRP </span>
                {formatPrice(product.mrp)}
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
                {off}% Off
              </span>
              <span className="ml-auto text-[11px] font-light text-muted">
                Inclusive of all taxes
              </span>
            </div>

            <div className="mt-6">
              <QuickEnquiry product={product} />
            </div>

            {/* about */}
            <div className="mt-12">
              <SectionTitle>About the Fragrance</SectionTitle>
              <p className="mt-4 text-[15px] font-light leading-[1.9] text-ink">
                {product.description}
              </p>
            </div>

            {/* pyramid */}
            <div className="mt-12">
              <SectionTitle>Fragrance Pyramid</SectionTitle>
              <dl className="mt-5 border-t border-line">
                {pyramid.map(({ tier, notes }) => (
                  <div
                    key={tier}
                    className="grid gap-2 border-b border-line py-4 sm:grid-cols-[140px_1fr] sm:gap-6"
                  >
                    <dt className="text-[10px] font-semibold uppercase tracking-[0.28em] text-gold">
                      {tier}
                    </dt>
                    <dd className="text-sm font-light leading-relaxed">
                      {notes.join(", ")}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* performance */}
            <div className="mt-12">
              <SectionTitle>Performance</SectionTitle>
              <div className="mt-5 grid border border-line sm:grid-cols-2">
                <div className="p-5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-gold">
                    Longevity
                  </p>
                  <p className="mt-2 text-lg font-medium">{product.longevity}</p>
                </div>
                <div className="border-t border-line p-5 sm:border-l sm:border-t-0">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-gold">
                    Projection / Sillage
                  </p>
                  <p className="mt-2 text-sm font-light leading-relaxed">
                    {product.sillage}
                  </p>
                </div>
              </div>
            </div>

            {/* details */}
            <div className="mt-12 border-t border-line">
              <Accordion title="How to Use" defaultOpen>
                <ol className="space-y-4">
                  {product.howToUse.map((s, i) => (
                    <li key={s.step} className="flex gap-4">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center border border-gold/50 text-[10px] font-semibold text-gold">
                        {i + 1}
                      </span>
                      <p className="text-sm font-light leading-relaxed">
                        <span className="font-medium text-ink">{s.step}: </span>
                        {s.text}
                      </p>
                    </li>
                  ))}
                </ol>
              </Accordion>

              <Accordion title="Product Specifications">
                <dl>
                  {specs.map(([label, value]) => (
                    <div
                      key={label}
                      className="grid gap-1 border-b border-line/70 py-3 last:border-b-0 sm:grid-cols-[140px_1fr] sm:gap-6"
                    >
                      <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">
                        {label}
                      </dt>
                      <dd className="text-sm font-light leading-relaxed">{value}</dd>
                    </div>
                  ))}
                </dl>
              </Accordion>

              <Accordion title="Ingredients">
                <p className="text-sm font-light leading-relaxed">
                  {product.ingredients}
                </p>
              </Accordion>
            </div>
          </div>
        </div>
      </div>

      {/* ————— related ————— */}
      <section className="mt-24 border-t border-line bg-cream/60">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-10">
          <Reveal>
            <div className="flex items-end justify-between gap-6">
              <h2 className="font-display text-xl font-semibold uppercase tracking-[0.18em] md:text-2xl">
                You May Also Like
              </h2>
              <Link
                href={collection ? `/collections/${collection.handle}` : "/collections"}
                className="link-sweep hidden text-[10px] font-medium uppercase tracking-[0.3em] sm:block"
              >
                View All
              </Link>
            </div>
          </Reveal>
          <div className="mt-10 grid grid-cols-2 gap-5 lg:grid-cols-4 lg:gap-6">
            {related.map((p, i) => (
              <Reveal key={p.slug} delay={i * 90}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
