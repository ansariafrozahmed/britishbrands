"use client";

import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { brands as localBrands } from "@/lib/brands";
import { useEffect, useState } from "react";

export function BrandsSection() {
  const [brands, setBrands] = useState<any[]>([]);

  useEffect(() => {
    async function fetchBrands() {
      try {
        const apiUrl =
          process.env.NEXT_PUBLIC_API_URL ||
          "https://britishbrandbck.demotempwebsite.co.in/wp-json";
        const res = await fetch(`${apiUrl}/custom/v1/getFeaturedBrands`, {
          next: { revalidate: 20 },
        });
        const data = await res.json();
        if (data.success && data.brands) {
          setBrands(data.brands);
        }
      } catch (err) {
        console.error("Featured Brands API error:", err);
      }
    }
    fetchBrands();
  }, []);

  const items = brands.length > 0 ? brands : [];

  return (
    <section className="mx-auto max-w-[1500px] px-5 py-12 lg:px-14 lg:py-20">
      <Reveal className="text-center">
        <h2 className="font-display text-[1.6rem] uppercase font-normal tracking-[0.01em] text-[#3F2E19] leading-[1.4] md:text-[1.8rem]">
          Featured Brands
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-[14px] font-normal leading-[1.8] text-muted">
          Discover the fragrance houses and brands currently available through
          British Brands.
        </p>
      </Reveal>

      <div className="mt-10 grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {items.map((brand, i) => {
          const handle = brand.slug || brand.id;
          const imageUrl = brand.image || brand.logo;
          const brandName = brand.name || handle;

          return (
            <Reveal key={handle} delay={i * 50}>
              <Link
                href={`/brands/${handle}`}
                className="group flex h-full flex-col items-center rounded-md bg-white border border-line px-6 py-4 text-center transition-all duration-300 hover:border-gold-light shadow-[0_8px_30px_rgba(22,19,15,0.08)]"
              >
                <div className="relative aspect-[4/2.5] h-full w-full">
                  <Image
                    src={imageUrl}
                    alt={`${brandName} logo`}
                    fill
                    className="object-contain rounded-md opacity-80 transition-opacity duration-300 group-hover:opacity-100"
                  />
                </div>
                {/* <h3 className="font-display text-[14px] font-semibold uppercase tracking-[0.1em] text-ink">
                {brand.name}
              </h3> */}
                {/* <p className="mt-2 flex-1 text-[12px] font-light leading-[1.6] text-muted line-clamp-2">
                {brand.description}
              </p> */}
                {/* <span className="mt-4 inline-flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-gold transition-transform duration-300 group-hover:translate-x-1">
                View Collection <span aria-hidden>→</span>
              </span> */}
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
