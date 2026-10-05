import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FilteredProductGrid } from "@/components/filtered-product-grid";

type PageProps<T extends string = ""> = {
  params: Promise<{ handle: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({
  params,
}: PageProps<"/collections/[handle] ">): Promise<Metadata> {
  const { handle } = await params;
  try {
    const apiUrl =
      process.env.NEXT_PUBLIC_API_URL ||
      "https://britishbrandbck.demotempwebsite.co.in/wp-json";
    const res = await fetch(`${apiUrl}/custom/v1/getAllCategories`, {
      next: { revalidate: 60 },
    });
    const data = await res.json();
    const collection = data.categories?.find((c: any) => c.slug === handle);
    if (collection) {
      return {
        title: `${collection.name} Fragrances`,
        description: `Long-lasting Eau de Parfums by BRITISH BRANDS.`,
      };
    }
  } catch (err) {}

  return { title: "Collection not found" };
}

export default async function CollectionPage({
  params,
  searchParams,
}: PageProps<"/collections/[handle]">) {
  const { handle } = await params;
  const resolvedSearchParams = await searchParams;

  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL ||
    "https://britishbrandbck.demotempwebsite.co.in/wp-json";

  let collection = null;
  let items = [];
  let filters = null;

  try {
    // 1. Fetch category metadata
    const catRes = await fetch(`${apiUrl}/custom/v1/getAllCategories`, {
      next: { revalidate: 60 },
    });
    const catData = await catRes.json();
    collection = catData.categories?.find((c: any) => c.slug === handle);

    if (!collection) {
      return notFound();
    }

    // 2. Build the products API URL with searchParams
    const query = new URLSearchParams();
    query.append("slug", handle);

    // add any other filters (brand, gender, family, availability)
    if (resolvedSearchParams.brand)
      query.append("brand", resolvedSearchParams.brand as string);
    if (resolvedSearchParams.gender)
      query.append("gender", resolvedSearchParams.gender as string);
    if (resolvedSearchParams.family)
      query.append("family", resolvedSearchParams.family as string);
    if (resolvedSearchParams.availability)
      query.append("availability", resolvedSearchParams.availability as string);

    // 3. Fetch products
    const prodRes = await fetch(
      `${apiUrl}/custom/v1/getProductsByCategory?${query.toString()}`,
    );
    const prodData = await prodRes.json();

    if (prodData.success && prodData.products) {
      items = prodData.products.map((p: any) => ({
        ...p,
        image: Array.isArray(p.image)
          ? p.image[0]
          : p.image ||
            "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
        tagline: p.tagline || "",
        price: p.price || 0,
        mrp: p.mrp || 1,
      }));
      filters = prodData.filters || null;
    }
  } catch (err) {
    console.error("Collection page error:", err);
  }

  if (!collection) notFound();

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
        <span
          className="text-ink"
          dangerouslySetInnerHTML={{
            __html: collection.name || collection.title,
          }}
        />
      </nav>

      <header className="mt-10 mb-12 text-center">
        <h1
          className="mt-4 font-display text-2xl font-medium uppercase tracking-[0.08em] md:text-3xl"
          dangerouslySetInnerHTML={{
            __html: collection.name || collection.title,
          }}
        />
        {collection.description && (
          <p className="mx-auto mt-2 max-w-xl text-[15px] font-light leading-[1.9] text-muted">
            {collection.description}
          </p>
        )}
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

      <FilteredProductGrid products={items} filters={filters} />
    </div>
  );
}
