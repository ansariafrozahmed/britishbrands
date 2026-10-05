import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@/components/reveal";

export function B2bSection() {
  return (
    <section className=" text-[#3F2E19]">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20 mx-auto max-w-[1500px] px-5 py-12 lg:px-14 lg:py-20">
        <Reveal>
          <div className="relative">
            <div className="absolute -right-4 -top-4 hidden h-full w-full border border-gold-light lg:block" />
            <div className="relative aspect-[4/3.5] overflow-hidden">
              <Image
                src="https://pub-ab787ccfc74d4e3fb148587fdedd4650.r2.dev/DSC00779.JPG"
                alt="British Brands bottles"
                height={600}
                width={600}
                sizes="(max-width: 1024px) 90vw, 90vw"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </Reveal>
        <div>
          <Reveal>
            <p className="eyebrow-rule text-[11px] font-medium uppercase tracking-[0.45em] text-gold-light">
              B2B & Wholesale
            </p>
            <h2 className="mt-6 font-display text-[1.6rem] uppercase font-normal tracking-[0.015em]  leading-[1.4] md:text-[2rem]">
              Bring Your Fragrance <br /> Brand to Libya
            </h2>
          </Reveal>
          <Reveal delay={150}>
            <p className="mt-7 text-[15px] font-normal leading-[1.9] text-[#3F2E19]/85">
              We are actively seeking conversations with international fragrance
              houses looking to explore the Libyan market. Partner with British
              Brands to expand your reach through our established retail
              presence and nationwide distribution network.
            </p>
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
