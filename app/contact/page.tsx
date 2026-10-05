import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { contact, telHref, whatsappHref } from "@/lib/site";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with British Brands on WhatsApp, by phone or by email — product enquiries, bulk orders and gifting. We reply within 24 hours.",
};

const channels = [
  {
    label: "WhatsApp",
    value: contact.phoneDisplay,
    note: "Fastest reply — scent advice, orders and bulk pricing",
    cta: "Chat on WhatsApp",
    href: whatsappHref("Hi British Brands, I have a question."),
    external: true,
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-6 w-6"
        fill="currentColor"
        aria-hidden
      >
        <path d="M12 2.2A9.8 9.8 0 003.6 17l-1.4 4.8 4.9-1.3A9.8 9.8 0 1012 2.2zm0 17.9a8.1 8.1 0 01-4.1-1.1l-.3-.2-2.9.8.8-2.8-.2-.3A8.1 8.1 0 1112 20.1zm4.4-6c-.2-.1-1.4-.7-1.7-.8-.2-.1-.4-.1-.5.1l-.8.9c-.1.2-.3.2-.5.1a6.7 6.7 0 01-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5a.9.9 0 00-.7.3 2.8 2.8 0 00-.9 2.1 4.9 4.9 0 001 2.6 11.2 11.2 0 004.3 3.8c1.6.7 2.2.7 3 .6a2.6 2.6 0 001.7-1.2 2.1 2.1 0 00.1-1.2c0-.1-.2-.2-.4-.3z" />
      </svg>
    ),
  },
  {
    label: "Call Us",
    value: contact.phoneDisplay,
    note: "Speak to our team, Sat – Thu 10:00 AM – 10:30 PM | Fri 4:30 PM – 10:30 PM",
    cta: "Call Now",
    href: telHref,
    external: false,
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden
      >
        <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" />
      </svg>
    ),
  },
  {
    label: "Email",
    value: contact.email,
    note: `Sales: ${contact.salesEmail}`,
    cta: "Send an Email",
    href: `mailto:${contact.email}?subject=${encodeURIComponent("Enquiry — British Brands")}`,
    external: false,
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden
      >
        <rect x="3" y="5" width="18" height="14" />
        <path d="M3 6l9 7 9-7" />
      </svg>
    ),
  },
  {
    label: "Location",
    value: contact.city,
    note: contact.address,
    cta: "Get Directions",
    href: "https://maps.google.com/?q=Venesia+Street,+Benghazi,+Libya",
    external: true,
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden
      >
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
      </svg>
    ),
  },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-[1500px] px-5 pb-24 pt-14 lg:px-14 lg:pt-20">
      <header className="text-center">
        <p className="eyebrow-rule text-[11px] font-medium uppercase tracking-[0.45em] text-gold">
          Get in Touch
        </p>
        <h1 className="mt-6 font-display text-2xl font-semibold uppercase tracking-[0.18em] md:text-3xl text-ink">
          Contact Us
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-[15px] font-light leading-[1.9] text-muted">
          Questions about a fragrance, bulk and gifting orders, or need a scent
          recommendation? Reach us however suits you.
        </p>
      </header>

      {/* Quick Contact Methods */}
      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {channels.map((c, i) => (
          <Reveal key={c.label} delay={i * 90}>
            <a
              href={c.href}
              {...(c.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="sweep-parent group flex h-full flex-col border border-line p-8 transition-colors duration-300 hover:border-ink lg:p-10"
            >
              <span className="flex h-14 w-14 items-center justify-center border border-gold/40 text-gold transition-colors duration-300 group-hover:border-gold group-hover:bg-gold group-hover:text-white">
                {c.icon}
              </span>
              <span className="mt-7 text-[10px] font-semibold uppercase tracking-[0.3em] text-gold">
                {c.label}
              </span>
              <span className="mt-2 break-all text-lg font-medium text-ink">
                {c.value}
              </span>
              <span className="mt-2 flex-1 text-sm font-light leading-relaxed text-muted">
                {c.note}
              </span>
              <span className="mt-7 inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-ink">
                <span className="link-sweep">{c.cta}</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1.5">
                  →
                </span>
              </span>
            </a>
          </Reveal>
        ))}
      </div>

      <Reveal delay={300}>
        <p className="mt-12 text-center text-[11px] font-light uppercase tracking-[0.25em] text-muted">
          Sat – Thu: 10:00 AM – 10:30 PM · Fri: 4:30 PM – 10:30 PM · We reply
          within 24 hours
        </p>
      </Reveal>

      {/* Contact Form Section */}
      <ContactForm />
    </div>
  );
}
