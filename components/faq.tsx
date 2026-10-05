"use client";

import { useState } from "react";
import { Reveal } from "@/components/reveal";

const faqs = [
  {
    question: "Are your fragrances authentic?",
    answer:
      "Yes, absolutely. We guarantee that all our fragrances are 100% authentic. We source our products directly from the original fragrance houses or their official, authorized distributors.",
  },
  {
    question: "Do you offer shipping across Libya?",
    answer:
      "Yes, we provide reliable delivery services to major cities across Libya. Delivery times and shipping costs may vary depending on your specific location. Please contact us via WhatsApp for precise delivery details.",
  },
  {
    question: "Can I test the fragrances before purchasing?",
    answer:
      "We encourage you to visit our physical store on Venesia Street in Benghazi. Our fragrance specialists will gladly assist you in exploring our collections and testing scents to find your perfect match.",
  },
  {
    question: "What is your return and exchange policy?",
    answer:
      "We accept returns and exchanges on unopened and unused products in their original, sealed packaging within 14 days of purchase. Due to strict hygiene standards, opened or used fragrances cannot be returned or exchanged.",
  },
  {
    question: "Do you offer wholesale or B2B partnerships?",
    answer:
      "Yes, we actively collaborate with international fragrance brands and local retailers. If you are looking to enter the Libyan market or purchase in bulk, please visit our B2B & Brand Partnerships page to submit an enquiry.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-bg py-16 lg:py-24">
      <div className="mx-auto max-w-3xl px-5 lg:px-10">
        <div className="flex flex-col justify-center h-full">
          <Reveal className="mb-10 text-center">
            <p className="eyebrow-rule text-[11px] font-medium uppercase tracking-[0.45em] text-gold before:bg-gold after:bg-gold">
              Support
            </p>
            <h2 className="mt-4 font-display text-[1.6rem] uppercase font-normal tracking-[0.01em] text-[#3F2E19] leading-[1.4] md:text-[1.8rem]">
              Frequently Asked Questions
            </h2>
          </Reveal>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <Reveal key={idx} delay={idx * 100}>
                <div
                  className={`border border-line rounded-sm bg-white overflow-hidden transition-all duration-300 ${
                    openIndex === idx
                      ? "shadow-sm border-gold/40"
                      : "hover:border-ink/20"
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between px-6 py-4 text-left focus:outline-none"
                    aria-expanded={openIndex === idx}
                  >
                    <span className="font-display text-[15px] font-normal text-ink pr-8">
                      {faq.question}
                    </span>
                    <span className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full border border-line text-ink transition-transform duration-300">
                      <svg
                        viewBox="0 0 24 24"
                        className={`w-4 h-4 transition-transform duration-300 ${openIndex === idx ? "rotate-180" : ""}`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </span>
                  </button>
                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      openIndex === idx
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="!py-4 pt-0 text-[14.5px] font-light leading-[1.9] text-muted border-t border-line/50 mx-6 mt-2">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
