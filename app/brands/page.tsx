import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { brands } from "@/lib/brands";

export const metadata: Metadata = {
  title: "Featured Brands | British Brands",
  description: "Discover the world's most luxurious fragrance houses.",
};

export default async function BrandsPage() {
  let apiBrands: any[] = [];

  try {
    const apiUrl =
      process.env.NEXT_PUBLIC_API_URL ||
      "https://britishbrandbck.demotempwebsite.co.in/wp-json";
    const res = await fetch(`${apiUrl}/custom/v1/getAllBrands`, { next: { revalidate: 60 } });
    const data = await res.json();
    if (data.success && data.brands) {
      apiBrands = data.brands;
    }
  } catch (err) {
    console.error("Brands API error:", err);
  }

  const items = apiBrands.length > 0 ? apiBrands : [];

  return (
    <div className="pb-24">
      <div className="mx-auto max-w-[1500px] px-5 pt-10 lg:px-14 lg:pt-14">
        <nav
          aria-label="Breadcrumb"
          className="text-[10px] uppercase text-center tracking-[0.25em] text-muted"
        >
          <Link href="/" className="transition-colors hover:text-ink">
            Home
          </Link>
          <span className="mx-3">/</span>
          <span className="text-ink">Brands</span>
        </nav>

        <header className="mt-10 mb-16 text-center">
          <h1 className="mt-4 font-display text-2xl font-semibold uppercase tracking-[0.18em] md:text-3xl">
            Featured Brands
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-[15px] font-light leading-[1.9] text-muted">
            Discover our curated collection of the world's most luxurious and
            exclusive fragrance houses.
          </p>
        </header>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((brand: any, i: number) => {
            const handle = brand.slug || brand.id;
            // Fallback to local logo if api image is empty
            const imageUrl =
              brand.image ||
              "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png";
            const brandName = brand.name || handle;

            return (
              <Reveal key={handle}>
                <Link
                  href={`/brands/${handle}`}
                  className="group flex flex-col h-full overflow-hidden rounded-md border border-line bg-white transition-all duration-300 hover:border-gold-light hover:shadow-[0_8px_30px_rgba(22,19,15,0.08)]"
                >
                  <div className="flex h-48 w-full items-center justify-center p-8 bg-white">
                    <div className="relative h-full w-[80%]">
                      <Image
                        src={imageUrl}
                        alt={`${brandName} logo`}
                        fill
                        className="object-contain transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                      />
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-8 text-center border-t border-line/50">
                    <h2 className="font-display text-[15px] font-semibold uppercase tracking-[0.1em] text-ink">
                      {brandName}
                    </h2>
                    <p className="mt-4 flex-1 text-[13px] font-light leading-[1.8] text-muted">
                      {brand.description || ""}
                    </p>
                    <div className="mt-6">
                      <span className="inline-flex items-center justify-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-gold transition-transform duration-300 group-hover:translate-x-1">
                        Explore Collection <span aria-hidden>→</span>
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </div>
  );
}
