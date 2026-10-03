"use client";

import { useState } from "react";

export function B2bForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    // Simulate network request
    setTimeout(() => {
      setStatus("success");
    }, 1500);
  };

  if (status === "success") {
    return (
      <div className="bg-white p-10 lg:p-16 border border-line rounded-md text-center space-y-6">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gold/10 text-gold">
          <svg viewBox="0 0 24 24" className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-display text-2xl uppercase tracking-wide text-ink font-semibold">Enquiry Submitted</h3>
        <p className="text-muted font-light max-w-md mx-auto leading-relaxed">
          Thank you for your interest in partnering with British Brands. Our team has received your information and will review your submission shortly.
        </p>
        <button 
          onClick={() => setStatus("idle")}
          className="mt-6 inline-block bg-ink text-white px-8 py-4 text-[10px] font-medium uppercase tracking-[0.2em] hover:bg-gold transition-colors"
        >
          Submit Another Enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 lg:p-12 border border-line rounded-md space-y-10 shadow-sm">
      
      {/* Contact Information */}
      <div>
        <h3 className="text-[12px] font-semibold uppercase tracking-[0.2em] text-gold mb-6 border-b border-line pb-2">
          Contact Information
        </h3>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="fullName" className="text-[11px] font-semibold uppercase tracking-wider text-ink">Full Name <span className="text-red-500">*</span></label>
            <input id="fullName" required className="w-full border border-line bg-bg px-4 py-3 text-[14px] focus:border-gold focus:outline-none transition-colors" />
          </div>
          <div className="space-y-2">
            <label htmlFor="companyName" className="text-[11px] font-semibold uppercase tracking-wider text-ink">Company Name <span className="text-red-500">*</span></label>
            <input id="companyName" required className="w-full border border-line bg-bg px-4 py-3 text-[14px] focus:border-gold focus:outline-none transition-colors" />
          </div>
          <div className="space-y-2">
            <label htmlFor="jobTitle" className="text-[11px] font-semibold uppercase tracking-wider text-ink">Job Title</label>
            <input id="jobTitle" className="w-full border border-line bg-bg px-4 py-3 text-[14px] focus:border-gold focus:outline-none transition-colors" />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-[11px] font-semibold uppercase tracking-wider text-ink">Email Address <span className="text-red-500">*</span></label>
            <input id="email" type="email" required className="w-full border border-line bg-bg px-4 py-3 text-[14px] focus:border-gold focus:outline-none transition-colors" />
          </div>
          <div className="space-y-2">
            <label htmlFor="phone" className="text-[11px] font-semibold uppercase tracking-wider text-ink">Phone / WhatsApp <span className="text-red-500">*</span></label>
            <input id="phone" type="tel" required className="w-full border border-line bg-bg px-4 py-3 text-[14px] focus:border-gold focus:outline-none transition-colors" />
          </div>
          <div className="space-y-2">
            <label htmlFor="country" className="text-[11px] font-semibold uppercase tracking-wider text-ink">Country</label>
            <input id="country" className="w-full border border-line bg-bg px-4 py-3 text-[14px] focus:border-gold focus:outline-none transition-colors" />
          </div>
        </div>
      </div>

      {/* Brand Details */}
      <div>
        <h3 className="text-[12px] font-semibold uppercase tracking-[0.2em] text-gold mb-6 border-b border-line pb-2">
          Brand Details
        </h3>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="brandName" className="text-[11px] font-semibold uppercase tracking-wider text-ink">Brand Name <span className="text-red-500">*</span></label>
            <input id="brandName" required className="w-full border border-line bg-bg px-4 py-3 text-[14px] focus:border-gold focus:outline-none transition-colors" />
          </div>
          <div className="space-y-2">
            <label htmlFor="website" className="text-[11px] font-semibold uppercase tracking-wider text-ink">Website</label>
            <input id="website" type="url" placeholder="https://" className="w-full border border-line bg-bg px-4 py-3 text-[14px] focus:border-gold focus:outline-none transition-colors" />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <label htmlFor="instagram" className="text-[11px] font-semibold uppercase tracking-wider text-ink">Instagram / Social Media</label>
            <input id="instagram" placeholder="@brandname" className="w-full border border-line bg-bg px-4 py-3 text-[14px] focus:border-gold focus:outline-none transition-colors" />
          </div>
        </div>
      </div>

      {/* Partnership Information */}
      <div>
        <h3 className="text-[12px] font-semibold uppercase tracking-[0.2em] text-gold mb-6 border-b border-line pb-2">
          Partnership Profile
        </h3>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="productCategory" className="text-[11px] font-semibold uppercase tracking-wider text-ink">Product Category <span className="text-red-500">*</span></label>
            <select id="productCategory" required className="w-full border border-line bg-bg px-4 py-3 text-[14px] focus:border-gold focus:outline-none transition-colors appearance-none">
              <option value="" disabled selected>Select category...</option>
              <option value="Luxury Fragrance">Luxury Fragrance</option>
              <option value="Niche Fragrance">Niche Fragrance</option>
              <option value="Arabic Fragrance">Arabic Fragrance</option>
              <option value="Oud">Oud</option>
              <option value="Attar">Attar</option>
              <option value="Beauty">Beauty</option>
              <option value="Cosmetics">Cosmetics</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="space-y-2">
            <label htmlFor="partnershipType" className="text-[11px] font-semibold uppercase tracking-wider text-ink">Partnership Type <span className="text-red-500">*</span></label>
            <select id="partnershipType" required className="w-full border border-line bg-bg px-4 py-3 text-[14px] focus:border-gold focus:outline-none transition-colors appearance-none">
              <option value="" disabled selected>Select interest...</option>
              <option value="Retail Partnership">Retail Partnership</option>
              <option value="Distribution">Distribution</option>
              <option value="Wholesale">Wholesale</option>
              <option value="Market Entry">Market Entry</option>
              <option value="Brand Representation">Brand Representation</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="space-y-2">
            <label htmlFor="currentMarkets" className="text-[11px] font-semibold uppercase tracking-wider text-ink">Current Markets</label>
            <input id="currentMarkets" placeholder="E.g. UAE, UK, France" className="w-full border border-line bg-bg px-4 py-3 text-[14px] focus:border-gold focus:outline-none transition-colors" />
          </div>
          <div className="space-y-2">
            <label htmlFor="libyaStatus" className="text-[11px] font-semibold uppercase tracking-wider text-ink">Selling/Distributing in Libya?</label>
            <select id="libyaStatus" className="w-full border border-line bg-bg px-4 py-3 text-[14px] focus:border-gold focus:outline-none transition-colors appearance-none">
              <option value="" disabled selected>Select status...</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
              <option value="Exploring the market">Exploring the market</option>
            </select>
          </div>
          <div className="space-y-2 sm:col-span-2">
            <label htmlFor="message" className="text-[11px] font-semibold uppercase tracking-wider text-ink">Message <span className="text-red-500">*</span></label>
            <textarea 
              id="message" 
              required 
              rows={5}
              placeholder="Tell us about your brand and what you are looking for in Libya..."
              className="w-full border border-line bg-bg px-4 py-3 text-[14px] focus:border-gold focus:outline-none transition-colors resize-y"
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <label htmlFor="attachment" className="text-[11px] font-semibold uppercase tracking-wider text-ink">Company Presentation / Brand Deck / Catalogue</label>
            <input 
              id="attachment" 
              type="file" 
              accept=".pdf,.ppt,.pptx,.doc,.docx"
              className="w-full border border-line bg-bg px-4 py-3 text-[14px] focus:border-gold focus:outline-none transition-colors file:mr-4 file:py-2 file:px-4 file:border-0 file:text-[11px] file:font-semibold file:uppercase file:tracking-[0.1em] file:bg-ink file:text-white hover:file:bg-gold file:transition-colors file:cursor-pointer" 
            />
            <p className="text-[12px] text-muted font-light mt-1">Accepted formats: PDF, PPT, PPTX, DOC. Max size 10MB.</p>
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-line text-center">
        <button 
          type="submit" 
          disabled={status === "submitting"}
          className="w-full sm:w-auto bg-ink px-12 py-5 text-[11px] font-medium uppercase tracking-[0.25em] text-white transition-all hover:bg-gold disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {status === "submitting" ? "Submitting..." : "Submit Partnership Enquiry"}
        </button>
      </div>

    </form>
  );
}
