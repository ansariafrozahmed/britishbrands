import Link from "next/link";

export function HeroCarousel() {
  return (
    <section className="relative overflow-hidden bg-cream w-full h-[80vh] lg:h-screen group">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover object-center"
      >
        <source
          src="https://storage.siyahfy.com/sagartech-assets/videos/WhatsApp%20Video%202026-10-05%20at%206.12.26%20PM.mp4"
          type="video/mp4"
        />
      </video>

      {/* Overlay content */}
      <div className="absolute inset-0 z-10 pb-6 lg:pb-8 flex flex-col items-center justify-end bg-gradient-to-t from-[#1B1815]/85 via-transparent to-[#1B1815]/50 text-center px-6">
        <h1 className="text-[28px] md:text-3xl lg:text-[2rem] font-semibold text-white tracking-wide uppercase mb-4 lg:mb-5 max-w-4xl [text-shadow:0_4px_12px_rgba(0,0,0,0.8)]">
          Discover Your Signature Scent
        </h1>
        <p className="text-[13px] md:text-base text-white/90 font-normal max-w-xl mb-6 lg:mb-10 [text-shadow:0_2px_8px_rgba(0,0,0,0.8)] leading-relaxed">
          Explore a curated selection of fragrances from British Brands,
          available through our retail store in Libya.
        </p>
        <div className="grid grid-cols-2 items-center gap-4 w-full sm:w-auto">
          <Link
            href="/collections"
            className="flex h-12 w-full sm:w-auto items-center justify-center bg-white px-2 lg:px-8 text-[10px] lg:text-[11px] font-semibold uppercase tracking-[0.1em] text-ink transition-colors hover:bg-gold hover:text-white"
          >
            Explore Fragrance
          </Link>
          <Link
            href="/store"
            className="flex h-12 w-full sm:w-auto items-center justify-center border border-white px-2 lg:px-8 text-[10px] lg:text-[11px] font-semibold uppercase tracking-[0.1em] text-white transition-colors hover:bg-white hover:text-ink"
          >
            Visit Our Store
          </Link>
        </div>
      </div>
    </section>
  );
}
