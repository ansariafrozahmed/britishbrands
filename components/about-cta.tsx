import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@/components/reveal";

export function AboutCta() {
  return (
    <section className="relative overflow-hidden mt-12 lg:mt-0">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/DSC00596.webp"
          alt="Store Background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-ink/80" />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-5 py-24 text-center lg:py-32">
        <Reveal>
          <h2 className="font-display text-2xl font-semibold uppercase tracking-wide md:text-3xl text-white">
            Experience It For Yourself
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[15px] font-light leading-[1.9] text-white/80">
            Visit our store to explore our exclusive collections in person, or
            get in touch with our team for personalized assistance.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="rounded bg-gold px-10 py-4 text-[11px] font-medium uppercase tracking-[0.28em] text-white transition-all hover:bg-gold-light hover:shadow-md"
            >
              Contact Us
            </Link>
            <Link
              href="/store"
              className="rounded border border-white/30 bg-white/5 px-10 py-4 text-[11px] font-medium uppercase tracking-[0.28em] text-white backdrop-blur-sm transition-all hover:bg-white hover:text-ink hover:border-white hover:shadow-md"
            >
              Visit Store
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
