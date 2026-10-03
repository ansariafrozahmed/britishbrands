import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[65svh] flex-col items-center justify-center px-6 py-20 text-center">
      <p className="eyebrow-rule text-[11px] font-medium uppercase tracking-[0.45em] text-gold">
        404
      </p>
      <h1 className="mt-6 font-display text-2xl font-semibold uppercase tracking-[0.18em] md:text-3xl">
        This Page Has Evaporated
      </h1>
      <p className="mt-5 max-w-md text-[15px] font-light leading-[1.9] text-muted">
        The page you&apos;re looking for doesn&apos;t exist. The fragrances,
        however, are right where you left them.
      </p>
      <Link
        href="/collections"
        className="mt-9 bg-ink px-10 py-4 text-[11px] font-medium uppercase tracking-[0.28em] text-white transition-colors duration-300 hover:bg-gold"
      >
        Explore Collections
      </Link>
    </div>
  );
}
