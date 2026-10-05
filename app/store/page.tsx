import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { contact, telHref, whatsappHref } from "@/lib/site";
import { StoreGallery } from "@/components/store-gallery";

export const metadata: Metadata = {
  title: "Visit Our Store | British Brands",
  description:
    "Experience our fragrance collection in person at the British Brands store in Libya.",
};

export default function StorePage() {
  return (
    <div className="pb-24">
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[400px] w-full overflow-hidden">
        <Image
          src="/DSC00596.webp"
          alt="British Brands Store"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-ink/60" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-5">
          <Reveal>
            <p className="eyebrow-rule text-[11px] font-medium uppercase tracking-[0.45em] text-gold before:bg-gold after:bg-gold">
              Our Location
            </p>
            <h1 className="mt-4 font-display text-3xl font-semibold uppercase tracking-[0.18em] text-white md:text-5xl">
              Visit British Brands
            </h1>
          </Reveal>
        </div>
      </section>

      {/* Info & Map Section */}
      <section className="mx-auto max-w-[1500px] px-5 py-20 lg:px-14 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-start">
          <Reveal delay={100}>
            <div className="space-y-8">
              <div>
                <h2 className="font-display text-2xl font-semibold uppercase tracking-wide text-ink">
                  Experience our collection
                </h2>
                <p className="mt-4 text-[15px] font-light leading-[1.9] text-muted">
                  Experience our fragrance collection in person at the British
                  Brands store in Libya. Visit us to explore our available
                  brands, discover new fragrances and speak with our team about
                  finding the right scent for you.
                </p>
              </div>

              <div className="bg-bg p-8 border border-line rounded-md">
                <h3 className="font-display text-[14px] font-semibold uppercase tracking-[0.15em] text-ink border-b border-line pb-4 mb-6">
                  Store Information
                </h3>
                <dl className="space-y-4 text-[14px]">
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
                    <dt className="w-32 font-medium uppercase tracking-wider text-ink text-[11px]">
                      Location
                    </dt>
                    <dd className="font-light text-muted flex-1">
                      {contact.address}
                    </dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
                    <dt className="w-32 font-medium uppercase tracking-wider text-ink text-[11px]">
                      City
                    </dt>
                    <dd className="font-light text-muted flex-1">
                      {contact.city}, Libya
                    </dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
                    <dt className="w-32 font-medium uppercase tracking-wider text-ink text-[11px]">
                      Phone
                    </dt>
                    <dd className="font-light text-muted flex-1">
                      {contact.phoneDisplay}
                    </dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
                    <dt className="w-32 font-medium uppercase tracking-wider text-ink text-[11px]">
                      WhatsApp
                    </dt>
                    <dd className="font-light text-muted flex-1">
                      {contact.phoneDisplay}
                    </dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
                    <dt className="w-32 font-medium uppercase tracking-wider text-ink text-[11px]">
                      Opening Hours
                    </dt>
                    <dd className="font-light text-muted flex-1">
                      Sat – Thu, 10:00 AM – 10:30 PM
                      <br />
                      Fri, 4:30 PM – 10:30 PM
                    </dd>
                  </div>
                </dl>

                <div className="mt-8 flex flex-col items-center sm:flex-row gap-3">
                  <a
                    href="https://maps.google.com" // Update with real maps link
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center bg-ink px-4 py-3.5 text-[10px] font-medium rounded-sm uppercase tracking-[0.20em] text-white transition-colors duration-300 hover:bg-gold"
                  >
                    Get Directions
                  </a>
                  <a
                    href={whatsappHref(
                      "Hi British Brands, I would like to visit the store.",
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center bg-[#25D366] px-4 py-3.5 text-[10px] font-medium rounded-sm uppercase tracking-[0.20em] text-white transition-colors duration-300 hover:bg-[#1DA851]"
                  >
                    WhatsApp
                  </a>
                  <a
                    href={telHref}
                    className="flex-1 text-center border border-ink px-4 py-3.5 text-[10px] rounded-sm font-medium uppercase tracking-[0.20em] text-ink transition-colors duration-300 hover:bg-ink hover:text-white"
                  >
                    Call Us
                  </a>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={200} className="h-full">
            <div className="h-[400px] lg:h-full min-h-[400px] w-full rounded-md overflow-hidden border border-line bg-line">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3381.3688583794287!2d20.0778105!3d32.0592708!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13831b0055179289%3A0x828acb956ab2b56!2sBritish%20brands!5e0!3m2!1sen!2sin!4v1791184751651!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="British Brands Store Location"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Store Experience Section */}
      <StoreGallery />
    </div>
  );
}
