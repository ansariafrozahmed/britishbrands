import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { whatsappHref } from "@/lib/site";

export function CtaSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/DSC00759.webp"
          alt="Store Background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-ink/75" />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-5 py-24 text-center lg:py-32">
        <Reveal>
          <p className="eyebrow-rule text-[11px] font-medium uppercase tracking-[0.45em] text-gold before:bg-gold after:bg-gold">
            Experience British Brands
          </p>
          <h2 className="mt-6 font-display text-[1.6rem] uppercase font-normal tracking-[0.01em] leading-[1.4] md:text-[1.8rem] text-white">
            Discover Your
            <br />
            Signature In Store
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-[15px] font-normal leading-[1.9] text-white/80">
            Step into our boutique to explore an exclusive curation of the
            world&apos;s finest fragrance houses firsthand. Looking to stock our
            collections? We&apos;re always eager to collaborate with new retail
            partners.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <Link
              href="/store"
              className="bg-gold px-8 py-4 text-[10px] font-medium rounded-sm uppercase tracking-[0.20em] text-white transition-colors duration-300 hover:bg-gold-light"
            >
              Visit our store
            </Link>
            <Link
              href="/partner-with-us"
              className="border border-white/30 bg-white/5 px-8 py-4 text-[10px] rounded-sm font-medium uppercase tracking-[0.20em] text-white backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-ink hover:border-white"
            >
              Partner with us
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
