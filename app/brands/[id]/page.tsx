import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { FilteredProductGrid } from "@/components/filtered-product-grid";

type PageProps<T extends string = ""> = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({
  params,
}: PageProps<"/brands/[id]">): Promise<Metadata> {
  const { id } = await params;
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://britishbrandbck.demotempwebsite.co.in/wp-json";
    const res = await fetch(`${apiUrl}/custom/v1/getAllBrands`, { next: { revalidate: 60 } });
    const data = await res.json();
    const brand = data.brands?.find((b: any) => b.slug === id);
    if (brand) {
      return {
        title: `${brand.name} | British Brands`,
        description: brand.description || `Explore ${brand.name} fragrances.`,
      };
    }
  } catch (err) {}
  return { title: "Brand not found" };
}

export default async function BrandPage({ 
  params,
  searchParams,
}: PageProps<"/brands/[id]">) {
  const { id } = await params;
  const resolvedSearchParams = await searchParams;

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://britishbrandbck.demotempwebsite.co.in/wp-json";
  let brand = null;
  let items = [];
  let filters = null;

  try {
    // 1. Fetch brand metadata
    const brandRes = await fetch(`${apiUrl}/custom/v1/getAllBrands`, { next: { revalidate: 60 } });
    const brandData = await brandRes.json();
    brand = brandData.brands?.find((b: any) => b.slug === id);

    if (!brand) return notFound();

    // 2. Build the products API URL with searchParams
    const query = new URLSearchParams();
    query.append("slug", id);
    
    if (resolvedSearchParams.availability) query.append("availability", resolvedSearchParams.availability as string);
    if (resolvedSearchParams.category) query.append("category", resolvedSearchParams.category as string);
    if (resolvedSearchParams.gender) query.append("gender", resolvedSearchParams.gender as string);
    if (resolvedSearchParams.family) query.append("family", resolvedSearchParams.family as string);

    // 3. Fetch products
    const prodRes = await fetch(`${apiUrl}/custom/v1/getProductsByBrand?${query.toString()}`);
    const prodData = await prodRes.json();
    
    if (prodData.success && prodData.products) {
      items = prodData.products.map((p: any) => ({
        ...p,
        image: Array.isArray(p.image) ? p.image[0] : (p.image || "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"),
        tagline: p.tagline || "",
        price: p.price || 0,
        mrp: p.mrp || 1,
      }));
      filters = prodData.filters || null;
    }
  } catch (err) {
    console.error("Brand page error:", err);
  }

  if (!brand) notFound();

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
        <span className="text-ink" dangerouslySetInnerHTML={{ __html: brand.name }} />
      </nav>

      <header className="mt-10 mb-12 flex flex-col items-center text-center">
        {brand.image && (
          <div className="relative h-24 w-full aspect-[4/3] mb-6">
            <Image
              src={brand.image}
              alt={`${brand.name} logo`}
              fill
              className="object-contain rounded-md"
            />
          </div>
        )}
        <h1 
          className="mt-4 font-display text-2xl font-semibold uppercase tracking-[0.18em] md:text-3xl"
          dangerouslySetInnerHTML={{ __html: brand.name }}
        />
        {brand.description && (
          <p className="mx-auto mt-4 max-w-xl text-[15px] font-light leading-[1.9] text-muted">
            {brand.description}
          </p>
        )}
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

      <FilteredProductGrid products={items} filters={filters} />
    </div>
  );
}
