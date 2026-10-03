import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/reveal";

export function AboutHero() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-12 lg:px-10 lg:py-20">
      <nav
        aria-label="Breadcrumb"
        className="text-[10px] uppercase tracking-[0.25em] text-muted text-center"
      >
        <Link href="/" className="transition-colors hover:text-ink">
          Home
        </Link>
        <span className="mx-3">/</span>
        <span className="text-ink">About Us</span>
      </nav>

      <Reveal className="mt-8 lg:mt-12 text-center">
        <p className="eyebrow-rule text-[11px] font-medium uppercase tracking-[0.45em] text-gold">
          Our Story
        </p>
        <h1 className="mt-4 font-display text-3xl font-semibold uppercase tracking-[0.18em] md:text-4xl">
          About British Brands
        </h1>
      </Reveal>

      <div className="mt-10 grid items-center gap-10 lg:mt-16 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <div className="relative aspect-[4/5] w-full overflow-hidden border border-line">
            <Image
              src="/DSC00596.webp"
              alt="British Brands Store"
              fill
              className="object-cover"
            />
          </div>
        </Reveal>

        <div className="space-y-12">
          <Reveal delay={100}>
            <h2 className="font-display text-xl font-semibold uppercase tracking-wide text-ink">
              Intro
            </h2>
            <p className="mt-4 text-[15px] font-light leading-[1.9] text-muted">
              British Brands is a fragrance retailer based in Libya, bringing
              together a curated selection of fragrance brands and products
              for customers seeking quality, variety and a distinctive
              fragrance experience.
            </p>
          </Reveal>

          <Reveal delay={200}>
            <h2 className="font-display text-xl font-semibold uppercase tracking-wide text-ink">
              Company Story
            </h2>
            <div className="mt-4 space-y-4 text-[15px] font-light leading-[1.9] text-muted">
              <p>
                British Brands was established to create a destination where
                fragrance enthusiasts can discover a diverse range of scents
                and explore products from recognised and emerging fragrance
                houses.
              </p>
              <p>
                Our physical retail presence allows customers to experience
                fragrances in person and receive assistance when selecting
                products for themselves, their families or as gifts.
              </p>
              <Reveal delay={250}>
                <dl className="mt-10 grid grid-cols-3 gap-8 border-t border-gold-light/20 pt-8">
                  {[
                    ["2018", "Established"],
                    ["Libya", "Location"],
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
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
