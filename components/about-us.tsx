import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { whatsappHref } from "@/lib/site";

export function AboutUs() {
  return (
    <section className=" text-[#3F2E19]">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20 mx-auto max-w-7xl px-5 py-12 lg:px-10 lg:py-20">
        <Reveal>
          <div className="relative">
            <div className="absolute -right-4 -top-4 hidden h-full w-full border border-gold-light lg:block" />
            <div className="relative aspect-[4/4] overflow-hidden">
              <Image
                src="/DSC00596.webp"
                alt="British Brands bottles"
                fill
                sizes="(max-width: 1024px) 90vw, 45vw"
                className="object-cover"
              />
            </div>
          </div>
        </Reveal>
        <div>
          <Reveal>
            <p className="eyebrow-rule text-[11px] font-medium uppercase tracking-[0.45em] text-gold-light">
              About Us
            </p>
            <h2 className="mt-6 font-display text-[1.6rem] uppercase font-normal tracking-[0.015em]  leading-[1.4] md:text-[2rem]">
              A Fragrance <br /> Destination in Libya
            </h2>
          </Reveal>
          <Reveal delay={150}>
            <p className="mt-7 text-[15px] font-normal leading-[1.9] text-[#3F2E19]/85">
              British Brands brings together a selection of fragrance brands and
              products for customers looking to discover, explore and purchase
              fragrances in-store. From everyday favourites to distinctive and
              premium scents, our collection is carefully presented to provide
              customers with a convenient place to discover fragrances for
              different personalities, occasions and preferences.
            </p>
          </Reveal>
          <Reveal delay={250}>
            <dl className="mt-10 grid grid-cols-3 gap-8 border-t border-gold-light/20 pt-8">
              {[
                ["2018", "Established"],
                ["Libya", "Location"],
                // ["50+", "Brands"],
              ].map(([value, label]) => (
                <div key={label}>
                  <dt className="sr-only">{label}</dt>
                  <dd className="font-display text-3xl font-semibold text-[#3F2E19]">
                    {value}
                  </dd>
                  <dd className="mt-2 text-[10px] uppercase tracking-[0.2em] text-[#3F2E19]/75">
                    {label}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <Reveal delay={350}>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/store"
                className="bg-ink px-8 py-4 text-[10px] font-medium rounded-sm uppercase tracking-[0.20em] text-white transition-colors duration-300 hover:bg-gold"
              >
                Visit our store
              </Link>
              <Link
                href="/partner-with-us"
                className="border border-ink px-8 py-4 text-[10px] rounded-sm font-medium uppercase tracking-[0.20em] text-ink transition-colors duration-300 hover:bg-ink hover:text-white"
              >
                Partner with us
              </Link>
              {/* <a
                href={whatsappHref("Hi British Brands, I have an enquiry.")}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] px-8 py-4 text-[10px] font-medium rounded-lg uppercase tracking-[0.20em] text-white transition-colors duration-300 hover:bg-[#1DA851]"
              >
                Enquire on whatsapp
              </a> */}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
