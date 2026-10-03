"use client";

import { useState } from "react";
import { Reveal } from "@/components/reveal";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    // Simulate network request
    setTimeout(() => {
      setStatus("success");
    }, 1500);
  };

  return (
    <div className="mt-24 grid gap-16 lg:grid-cols-2 lg:gap-24 items-center">
      <Reveal>
        <div className="space-y-6">
          <h2 className="font-display text-3xl font-semibold uppercase tracking-wide text-ink">
            Send us a message
          </h2>
          <p className="text-[15px] font-light leading-[1.9] text-muted max-w-md">
            Whether you are looking for personalized scent recommendations or want to learn more about stocking our collections, fill out the form and our team will get back to you shortly.
          </p>
        </div>
      </Reveal>

      <Reveal delay={150}>
        <div className="bg-bg p-8 lg:p-10 border border-line rounded-md">
          {status === "success" ? (
            <div className="text-center py-12 space-y-4">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold/10 text-gold">
                <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-display text-xl uppercase tracking-wide text-ink font-medium">Thank You</h3>
              <p className="text-muted font-light">Your message has been sent successfully. We will be in touch with you shortly.</p>
              <button 
                onClick={() => setStatus("idle")}
                className="mt-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold hover:text-ink transition-colors"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="text-[11px] font-semibold uppercase tracking-wider text-ink">First Name <span className="text-red-500">*</span></label>
                  <input 
                    id="firstName" 
                    required 
                    className="w-full border border-line bg-white px-4 py-3 text-sm focus:border-gold focus:outline-none transition-colors"
                    placeholder="Jane"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastName" className="text-[11px] font-semibold uppercase tracking-wider text-ink">Last Name</label>
                  <input 
                    id="lastName" 
                    className="w-full border border-line bg-white px-4 py-3 text-sm focus:border-gold focus:outline-none transition-colors"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-[11px] font-semibold uppercase tracking-wider text-ink">Email Address <span className="text-red-500">*</span></label>
                  <input 
                    id="email" 
                    type="email" 
                    required 
                    className="w-full border border-line bg-white px-4 py-3 text-sm focus:border-gold focus:outline-none transition-colors"
                    placeholder="jane@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-[11px] font-semibold uppercase tracking-wider text-ink">Phone Number</label>
                  <input 
                    id="phone" 
                    type="tel" 
                    className="w-full border border-line bg-white px-4 py-3 text-sm focus:border-gold focus:outline-none transition-colors"
                    placeholder="+218 XX XXX XXXX"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-[11px] font-semibold uppercase tracking-wider text-ink">Message <span className="text-red-500">*</span></label>
                <textarea 
                  id="message" 
                  required 
                  rows={4}
                  className="w-full border border-line bg-white px-4 py-3 text-sm focus:border-gold focus:outline-none transition-colors resize-y"
                  placeholder="How can we help you?"
                />
              </div>

              <button 
                type="submit" 
                disabled={status === "submitting"}
                className="w-full bg-ink px-8 py-4 text-[11px] font-medium uppercase tracking-[0.28em] text-white transition-colors duration-300 hover:bg-gold disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {status === "submitting" ? "Sending..." : "Send Message"}
              </button>
            </form>
          )}
        </div>
      </Reveal>
    </div>
  );
}
