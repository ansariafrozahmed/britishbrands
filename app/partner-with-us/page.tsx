import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { B2bForm } from "@/components/b2b-form";

export const metadata: Metadata = {
  title: "B2B & Brand Partnerships | British Brands",
  description:
    "British Brands is open to conversations with international fragrance brands seeking retail, market-entry and partnership opportunities in Libya.",
};

export default function B2BPage() {
  return (
    <div className="bg-bg">
      {/* HERO SECTION */}
      <section className="relative w-full bg-ink py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/DSC00632.webp"
            alt="British Brands Store"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative mx-auto max-w-7xl px-5 lg:px-10 text-center">
          <Reveal>
            <p className="eyebrow-rule text-[11px] font-medium uppercase tracking-[0.45em] text-gold before:bg-gold after:bg-gold">
              B2B & Partnerships
            </p>
            <h1 className="mt-8 mx-auto max-w-4xl font-display text-2xl font-semibold tracking-wide text-white md:text-5xl lg:text-6xl uppercase leading-tight">
              Bring Your Fragrance Brand to the Libyan Market
            </h1>
            <p className="mx-auto mt-8 max-w-2xl text-[14px] lg:text-[15px] font-light leading-[1.9] text-white/80">
              British Brands is open to conversations with international
              fragrance brands seeking retail, market-entry and partnership
              opportunities in Libya.
            </p>
            <div className="mt-12 flex justify-center">
              <a
                href="#partner-form"
                className="bg-gold px-10 py-5 text-[11px] font-semibold uppercase tracking-[0.25em] text-white transition-all hover:bg-white hover:text-ink"
              >
                Partner With Us
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* WHY PARTNER WITH US */}
      <section className="mx-auto max-w-7xl px-5 py-24 lg:px-10 lg:py-32">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl font-semibold uppercase tracking-wide text-ink">
              Why Partner With British Brands?
            </h2>
          </div>
        </Reveal>
        <div className="grid gap-12 md:grid-cols-2 lg:gap-16">
          <Reveal delay={100}>
            <div className="border-t border-line pt-6">
              <h3 className="text-[13px] font-semibold uppercase tracking-[0.2em] text-ink mb-4">
                Retail Presence
              </h3>
              <p className="text-[14.5px] font-light leading-[1.9] text-muted">
                [Describe the physical store, location and customer
                environment.]
              </p>
            </div>
          </Reveal>
          <Reveal delay={200}>
            <div className="border-t border-line pt-6">
              <h3 className="text-[13px] font-semibold uppercase tracking-[0.2em] text-ink mb-4">
                Local Market Understanding
              </h3>
              <p className="text-[14.5px] font-light leading-[1.9] text-muted">
                [Insert confirmed experience and knowledge of the Libyan
                fragrance market.]
              </p>
            </div>
          </Reveal>
          <Reveal delay={300}>
            <div className="border-t border-line pt-6">
              <h3 className="text-[13px] font-semibold uppercase tracking-[0.2em] text-ink mb-4">
                Brand Presentation
              </h3>
              <p className="text-[14.5px] font-light leading-[1.9] text-muted">
                We provide a professional retail environment where fragrance
                brands can be presented directly to customers.
              </p>
            </div>
          </Reveal>
          <Reveal delay={400}>
            <div className="border-t border-line pt-6">
              <h3 className="text-[13px] font-semibold uppercase tracking-[0.2em] text-ink mb-4">
                Customer Access
              </h3>
              <p className="text-[14.5px] font-light leading-[1.9] text-muted">
                [Insert confirmed customer base, footfall, audience, social
                following or other measurable information.]
              </p>
            </div>
          </Reveal>
          <Reveal delay={500} className="md:col-span-2">
            <div className="border-t border-line pt-6">
              <h3 className="text-[13px] font-semibold uppercase tracking-[0.2em] text-ink mb-4">
                Market Development
              </h3>
              <p className="text-[14.5px] font-light leading-[1.9] text-muted max-w-3xl">
                [Insert confirmed capabilities relating to wholesale,
                distribution, additional retail locations, sales teams or market
                expansion.]
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* OUR MARKET */}
      <section className="bg-line/30">
        <div className="mx-auto max-w-7xl px-5 py-24 lg:px-10 lg:py-32 grid gap-16 lg:grid-cols-[1fr_1.5fr] items-start">
          <Reveal>
            <h2 className="font-display text-3xl font-semibold uppercase tracking-wide text-ink mb-6">
              Building Opportunities in Libya
            </h2>
            <div className="space-y-6 text-[15px] font-light leading-[1.9] text-muted">
              <p>
                Libya presents opportunities for fragrance brands looking to
                establish or expand their presence in the market.
              </p>
              <p>
                British Brands is interested in developing relationships with
                international fragrance houses whose products align with the
                preferences and opportunities within the Libyan market.
              </p>
              <div className="p-6 bg-white border border-line rounded-sm">
                <p className="text-[13px] font-medium text-ink uppercase tracking-wider mb-2">
                  [Add confirmed cities / regions / customer coverage here]
                </p>
                <p className="text-sm">
                  If British Brands has coverage beyond its own store, this
                  section should clearly explain: Cities served, Retail
                  locations, Wholesale customers, Distribution network, Sales
                  representatives, Warehousing, Logistics, Existing retail
                  partners.
                  <br />
                  <br />
                  <span className="italic text-red-600/80">
                    Note: Do not publish any of these as claims until confirmed.
                  </span>
                </p>
              </div>
            </div>
          </Reveal>
          <Reveal
            delay={200}
            className="relative h-[400px] lg:h-[600px] w-full rounded-sm overflow-hidden"
          >
            <Image
              src="/DSC00714.webp"
              alt="Fragrance presentation"
              fill
              className="object-cover"
            />
          </Reveal>
        </div>
      </section>

      {/* BRANDS LOOKING TO ENTER LIBYA & PROCESS */}
      <section className="mx-auto max-w-7xl px-5 py-24 lg:px-10 lg:py-32">
        <div className="grid gap-20 lg:grid-cols-2">
          {/* Left Column */}
          <Reveal>
            <h2 className="font-display text-3xl font-semibold uppercase tracking-wide text-ink mb-8">
              Looking to Enter the Libyan Market?
            </h2>
            <div className="space-y-6 text-[15px] font-light leading-[1.9] text-muted mb-12">
              <p>
                We welcome conversations with fragrance brands interested in
                exploring opportunities in Libya.
              </p>
              <p>
                Whether you are an established international fragrance house or
                an emerging brand looking for a local market partner, we would
                be interested in understanding your brand, products and
                expansion objectives.
              </p>
            </div>

            <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ink mb-6">
              We Are Interested In:
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[14px] font-light text-muted">
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-gold rounded-full shrink-0"></span>{" "}
                International fragrance brands
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-gold rounded-full shrink-0"></span>{" "}
                Niche fragrance houses
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-gold rounded-full shrink-0"></span>{" "}
                Luxury fragrances
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-gold rounded-full shrink-0"></span>{" "}
                Arabic & Middle Eastern brands
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-gold rounded-full shrink-0"></span>{" "}
                Emerging fragrance brands
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-gold rounded-full shrink-0"></span>{" "}
                Oud and attar brands
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-gold rounded-full shrink-0"></span>{" "}
                Fragrance and beauty companies
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-gold rounded-full shrink-0"></span>{" "}
                [Other confirmed categories]
              </li>
            </ul>
          </Reveal>

          {/* Right Column: Process */}
          <Reveal delay={200} className="h-full">
            <div className="bg-charcoal text-white p-10 lg:p-12 rounded-sm h-full flex flex-col justify-center">
              <h2 className="font-display text-2xl font-semibold uppercase tracking-wide mb-12 text-gold">
                B2B Partnership Process
              </h2>
              <div className="space-y-10">
                <div className="relative pl-10 border-l border-white/20">
                  <span className="absolute -left-4 top-0 w-8 h-8 rounded-full bg-gold flex items-center justify-center text-[10px] font-bold">
                    01
                  </span>
                  <h3 className="text-[13px] font-semibold uppercase tracking-[0.2em] mb-3">
                    Introduce Your Brand
                  </h3>
                  <p className="text-[14px] font-light text-white/70 leading-relaxed">
                    Tell us about your company, brand and fragrance collection.
                  </p>
                </div>
                <div className="relative pl-10 border-l border-white/20">
                  <span className="absolute -left-4 top-0 w-8 h-8 rounded-full bg-gold flex items-center justify-center text-[10px] font-bold">
                    02
                  </span>
                  <h3 className="text-[13px] font-semibold uppercase tracking-[0.2em] mb-3">
                    Explore The Opportunity
                  </h3>
                  <p className="text-[14px] font-light text-white/70 leading-relaxed">
                    Our team reviews your brand and discusses the potential for
                    the Libyan market.
                  </p>
                </div>
                <div className="relative pl-10 border-l border-white/20">
                  <span className="absolute -left-4 top-0 w-8 h-8 rounded-full bg-gold flex items-center justify-center text-[10px] font-bold">
                    03
                  </span>
                  <h3 className="text-[13px] font-semibold uppercase tracking-[0.2em] mb-3">
                    Build The Partnership
                  </h3>
                  <p className="text-[14px] font-light text-white/70 leading-relaxed">
                    Where there is a suitable fit, both parties can explore
                    retail, wholesale, distribution or other commercial
                    opportunities.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FORM SECTION */}
      <section
        id="partner-form"
        className="bg-line/30 border-t border-line scroll-mt-24"
      >
        <div className="mx-auto max-w-4xl px-5 py-24 lg:py-32">
          <Reveal className="text-center mb-16">
            <h2 className="font-display text-3xl font-semibold uppercase tracking-wide text-ink mb-6">
              Partnership Enquiry Form
            </h2>
            <p className="text-[15px] font-light leading-[1.9] text-muted max-w-2xl mx-auto">
              Please provide detailed information about your brand to help us
              evaluate the partnership potential.
            </p>
          </Reveal>

          <Reveal delay={150}>
            <B2bForm />
          </Reveal>
        </div>
      </section>

      {/* GLOBAL B2B CTA */}
      <section className="relative bg-ink py-24 lg:py-32 text-center text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="/DSC00759.webp"
            alt="British Brands Displays"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative z-10 mx-auto max-w-3xl px-5">
          <Reveal>
            <h2 className="font-display text-3xl md:text-4xl font-semibold uppercase tracking-[0.15em] mb-6">
              Let's Explore The Opportunity
            </h2>
            <p className="text-[16px] font-light leading-[1.9] text-white/80 mb-10">
              If you are a fragrance brand looking to explore the Libyan market,
              we would be happy to learn more about your business and discuss
              potential opportunities.
            </p>
            <a
              href="#partner-form"
              className="inline-block bg-white text-ink px-10 py-5 text-[11px] font-semibold uppercase tracking-[0.25em] transition-colors hover:bg-gold hover:text-white"
            >
              Partner With British Brands
            </a>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
