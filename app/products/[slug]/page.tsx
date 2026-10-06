import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { ProductCard } from "@/components/product-card";
import { ProductInteractive } from "@/components/product-interactive";
import { Reveal } from "@/components/reveal";

export async function generateMetadata({
  params,
}: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  try {
    const apiUrl =
      process.env.NEXT_PUBLIC_API_URL ||
      "https://britishbrandbck.demotempwebsite.co.in/wp-json";
    const res = await fetch(
      `${apiUrl}/custom/v1/getProductBySlug?slug=${slug}`,
    );
    const data = await res.json();
    if (data.success && data.product) {
      return {
        title: `${data.product.name} Eau de Parfum`,
        description:
          data.product.description?.replace(/<[^>]*>?/gm, "") ||
          data.product.tagline,
      };
    }
  } catch (err) {}

  return { title: "Fragrance not found" };
}

// SectionTitle and Accordion moved to product-interactive

export default async function ProductPage({
  params,
}: PageProps<"/products/[slug]">) {
  const { slug } = await params;

  let product: any = null;
  let related: any[] = [];
  try {
    const apiUrl =
      process.env.NEXT_PUBLIC_API_URL ||
      "https://britishbrandbck.demotempwebsite.co.in/wp-json";

    // Fetch product
    const res = await fetch(
      `${apiUrl}/custom/v1/getProductBySlug?slug=${slug}`,
      { next: { revalidate: 60 } },
    );
    const data = await res.json();
    if (data.success && data.product) {
      product = data.product;
    }

    // Fetch related (we'll just use getProducts and filter)
    const relatedRes = await fetch(`${apiUrl}/custom/v1/getProducts`, {
      next: { revalidate: 60 },
    });
    const relatedData = await relatedRes.json();
    if (relatedData.success && relatedData.products) {
      // Map it to fit ProductCard expectations
      related = relatedData.products
        .filter((p: any) => p.slug !== slug)
        .slice(0, 4)
        .map((p: any) => ({
          ...p,
          image: Array.isArray(p.image)
            ? p.image[0]
            : p.image ||
              "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
          tagline: p.tagline || "",
          price: p.price || 0,
          mrp: p.mrp || 1,
        }));
    }
  } catch (err) {
    console.error(err);
  }

  if (!product) notFound();

  const collection = product.collections?.[0];

  return (
    <div className="pt-10">
      <div className="mx-auto max-w-[1500px] px-5 lg:px-14">
        <nav
          aria-label="Breadcrumb"
          className="text-[10px] uppercase tracking-[0.25em] text-muted"
        >
          <Link href="/" className="transition-colors hover:text-ink">
            Home
          </Link>
          <span className="mx-3">/</span>
          <Link
            href="/collections"
            className="transition-colors hover:text-ink"
          >
            Collections
          </Link>
          {collection && (
            <>
              <span className="mx-3">/</span>
              <Link
                href={`/collections/${collection.slug}`}
                className="transition-colors hover:text-ink"
                dangerouslySetInnerHTML={{ __html: collection.name }}
              />
            </>
          )}
          <span className="mx-3">/</span>
          <span className="text-ink">{product.name}</span>
        </nav>

        <ProductInteractive product={product} />
      </div>

      {/* ————— related ————— */}
      <section className="mt-24 border-t border-line bg-cream/60">
        <div className="mx-auto max-w-[1500px] px-5 py-20 lg:px-10">
          <Reveal>
            <div className="flex items-end justify-between gap-6">
              <h2 className="font-display text-xl font-semibold uppercase tracking-[0.18em] md:text-2xl">
                You May Also Like
              </h2>
              <Link
                href={
                  collection
                    ? `/collections/${collection.slug}`
                    : "/collections"
                }
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
