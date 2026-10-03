import { Reveal } from "@/components/reveal";

const approaches = [
  {
    title: "Selection",
    copy: "Bringing together a carefully selected range of fragrance products and brands.",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
  },
  {
    title: "Experience",
    copy: "Providing customers with the opportunity to explore fragrances in a physical retail environment.",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M2 12h4l3-9 5 18 3-9h5" />
      </svg>
    ),
  },
  {
    title: "Service",
    copy: "Helping customers discover fragrances according to their preferences, occasions and requirements.",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: "Growth",
    copy: "Continuously exploring opportunities to expand our brand and product portfolio.",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
        <polyline points="16 7 22 7 22 13" />
      </svg>
    ),
  },
];

export function OurApproach() {
  return (
    <section className="bg-bg py-12 lg:py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <Reveal className="text-center">
          <p className="eyebrow-rule text-[11px] font-medium uppercase tracking-[0.45em] text-gold">
            Our Approach
          </p>
          <h2 className="mt-4 font-display text-2xl font-semibold uppercase tracking-[0.18em] md:text-3xl">
            A Curated Fragrance Experience
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[15px] font-light leading-[1.9] text-muted">
            Our approach is centred around:
          </p>
        </Reveal>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {approaches.map((item, i) => (
            <Reveal key={item.title} delay={i * 100} className="h-full">
              <div className="flex h-full flex-col items-center text-center p-8 border border-line bg-white transition-all hover:border-gold-light hover:shadow-[0_8px_30px_rgba(22,19,15,0.08)]">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-ink text-white">
                  {item.icon}
                </div>
                <h3 className="font-display text-[14px] font-semibold uppercase tracking-[0.15em] text-ink">
                  {item.title}
                </h3>
                <p className="mt-4 text-[13px] font-light leading-[1.8] text-muted flex-1">
                  {item.copy}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
