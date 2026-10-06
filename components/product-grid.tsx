import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/reveal";
import {
  getCollection,
  getCollectionProducts,
  products,
  type Product,
} from "@/lib/products";

function GridSection({
  eyebrow,
  title,
  items,
  link,
}: {
  eyebrow: string;
  title: string;
  items: Product[];
  link: { href: string; label: string };
}) {
  return (
    <section className="mx-auto max-w-[1500px] px-5 py-12 lg:px-14 lg:py-20">
      <Reveal className="text-center">
        <p className="eyebrow-rule text-[11px] font-medium uppercase tracking-[0.45em] text-gold">
          {eyebrow}
        </p>
        <h2 className="mt-3 font-display text-[1.6rem] uppercase font-normal tracking-[0.01em] text-[#3F2E19] leading-[1.4] md:text-[1.8rem]">
          {title}
        </h2>
      </Reveal>

      <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 lg:mt-12 lg:gap-x-4 lg:gap-y-12">
        {items.map((product, i) => (
          <Reveal key={product.slug} delay={(i % 4) * 80}>
            <ProductCard product={product} />
          </Reveal>
        ))}
      </div>

      <div className="mt-10 text-center lg:mt-12">
        <Link
          href={link.href}
          className="sweep-parent group inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-ink"
        >
          <span className="link-sweep">{link.label}</span>
          <span className="transition-transform duration-300 group-hover:translate-x-1.5">
            →
          </span>
        </Link>
      </div>
    </section>
  );
}

export async function ProductGrid() {
  let apiProducts: any[] = [];
  try {
    const apiUrl =
      process.env.NEXT_PUBLIC_API_URL ||
      "https://britishbrandbck.demotempwebsite.co.in/wp-json";
    const res = await fetch(`${apiUrl}/custom/v1/getProducts`, { next: { revalidate: 60 } });
    const data = await res.json();
    if (data.success && data.products) {
      apiProducts = data.products;
    }
  } catch (err) {
    console.error("Products API error:", err);
  }

  if (apiProducts.length === 0) return null;

  const mappedProducts = apiProducts.map((p) => ({
    ...p,
    image: Array.isArray(p.image)
      ? p.image[0]
      : p.image ||
        "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
    tagline: p.tagline || "",
    price: p.price || 0,
    mrp: p.mrp || 1, // prevent division by zero in discountPercent
  }));

  return (
    <GridSection
      eyebrow="The Collection"
      title="Our Fragrances"
      items={mappedProducts as any}
      link={{ href: "/collections", label: "Shop by Collection" }}
    />
  );
}

export function CollectionProductGrid({ handle }: { handle: string }) {
  const collection = getCollection(handle);
  if (!collection) return null;
  return (
    <GridSection
      eyebrow="Collection"
      title={collection.title}
      items={getCollectionProducts(handle)}
      link={{
        href: `/collections/${collection.handle}`,
        label: `View All ${collection.title}`,
      }}
    />
  );
}
