"use client";

import { useState, type ReactNode } from "react";
import { ProductGallery } from "@/components/product-gallery";
import { QuickEnquiry } from "@/components/quick-enquiry";

function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-[11px] font-semibold uppercase tracking-[0.3em]">
      {children}
    </h2>
  );
}

function Accordion({
  title,
  defaultOpen = false,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: ReactNode;
}) {
  return (
    <details open={defaultOpen} className="group border-b border-line">
      <summary className="flex cursor-pointer list-none items-center justify-between py-5 [&::-webkit-details-marker]:hidden">
        <span className="text-[11px] font-semibold uppercase tracking-[0.3em]">
          {title}
        </span>
        <span
          aria-hidden
          className="relative h-3 w-3 transition-transform duration-300 group-open:rotate-45"
        >
          <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-ink" />
          <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-ink" />
        </span>
      </summary>
      <div className="pb-6">{children}</div>
    </details>
  );
}

export function ProductInteractive({ product }: { product: any }) {
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);

  const sizes = product.sizes || [];
  const selectedSize = sizes[selectedSizeIndex] || {};
  
  // Decide which images to show in gallery
  let displayImages = [];
  if (selectedSize.images && selectedSize.images.length > 0) {
    displayImages = selectedSize.images;
  } else if (product.images && product.images.length > 0) {
    displayImages = product.images;
  } else if (product.image) {
    displayImages = [product.image];
  }

  const pyramid = [
    { tier: "Top Notes", notes: product.notes?.top || [] },
    { tier: "Middle Notes", notes: product.notes?.middle || [] },
    { tier: "Base Notes", notes: product.notes?.base || [] },
  ];

  const specs = [
    ["Formulation", product.specs?.formulation || ""],
    ["Target Gender", product.specs?.targetGender || ""],
    ["Bottle Volume", product.specs?.volume || ""],
    ["Ideal Wear", product.specs?.idealWear || ""],
    ["Packaging", product.specs?.packaging || ""],
    ["Storage", product.specs?.storage || ""],
  ];

  return (
    <div className="mt-8 grid gap-12 lg:grid-cols-2 lg:gap-16">
      {/* ————— image ————— */}
      <div className="lg:self-start">
        <ProductGallery
          key={selectedSize.size || "default"}
          images={displayImages}
          alt={`${product.name} Eau de Parfum`}
        />
        <div className="mt-6 grid grid-cols-3 border border-line text-center">
          {[
            ["Longevity", product.longevity || ""],
            ["Category", product.gender || ""],
            ["Size", selectedSize.size || ""],
          ].map(([label, value], i) => (
            <div
              key={label}
              className={`px-2 py-4 ${i > 0 ? "border-l border-line" : ""}`}
            >
              <p className="text-[9px] uppercase tracking-[0.25em] text-muted">
                {label}
              </p>
              <p className="mt-1.5 text-[13px] font-medium">{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ————— details ————— */}
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-gold">
          {product.gender} · {selectedSize.size || ""}
        </p>
        <h1 className="mt-4 font-display text-3xl font-semibold uppercase tracking-[0.14em] md:text-4xl">
          {product.name}
        </h1>
        <p className="mt-3 text-[15px] font-light text-muted">
          {product.family}
        </p>

        {/* Variant Selector */}
        {sizes.length > 1 && (
          <div className="mt-8 border-y border-line py-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-muted mb-4">
              Select Size
            </p>
            <div className="flex flex-wrap gap-3">
              {sizes.map((s: any, i: number) => {
                const isSelected = selectedSizeIndex === i;
                return (
                  <button
                    key={s.size}
                    onClick={() => setSelectedSizeIndex(i)}
                    className={`px-6 py-3 text-[11px] font-medium uppercase tracking-[0.2em] transition-all duration-300 border ${
                      isSelected
                        ? "border-ink bg-ink text-white"
                        : "border-line bg-transparent text-ink hover:border-ink"
                    }`}
                  >
                    {s.size}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div className={sizes.length > 1 ? "mt-6" : "mt-8"}>
          {/* We create a customized product object for QuickEnquiry to use the correct size */}
          <QuickEnquiry product={{ ...product, sizes: [selectedSize] }} />
        </div>

        <div className="mt-12">
          <SectionTitle>About the Fragrance</SectionTitle>
          <div
            className="mt-4 text-[15px] font-light leading-[1.9] text-ink [&>p]:mb-4"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />
        </div>

        {/* pyramid */}
        {product.notes && (
          <div className="mt-12">
            <SectionTitle>Fragrance Pyramid</SectionTitle>
            <dl className="mt-5 border-t border-line">
              {pyramid.map(({ tier, notes }) => {
                if (!notes || notes.length === 0) return null;
                return (
                  <div
                    key={tier}
                    className="grid gap-2 border-b border-line py-4 sm:grid-cols-[140px_1fr] sm:gap-6"
                  >
                    <dt className="text-[10px] font-semibold uppercase tracking-[0.28em] text-gold">
                      {tier}
                    </dt>
                    <dd className="text-sm font-light leading-relaxed">
                      {notes.join(", ")}
                    </dd>
                  </div>
                );
              })}
            </dl>
          </div>
        )}

        {/* performance */}
        {(product.longevity || product.sillage) && (
          <div className="mt-12">
            <SectionTitle>Performance</SectionTitle>
            <div className="mt-5 grid border border-line sm:grid-cols-2">
              <div className="p-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-gold">
                  Longevity
                </p>
                <p className="mt-2 text-lg font-medium">
                  {product.longevity}
                </p>
              </div>
              <div className="border-t border-line p-5 sm:border-l sm:border-t-0">
                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-gold">
                  Projection / Sillage
                </p>
                <p className="mt-2 text-sm font-light leading-relaxed">
                  {product.sillage}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* details */}
        <div className="mt-12 border-t border-line">
          {product.howToUse && product.howToUse.length > 0 && (
            <Accordion title="How to Use" defaultOpen>
              <ol className="space-y-4">
                {product.howToUse.map((s: any, i: number) => (
                  <li key={s.step || i} className="flex gap-4">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center border border-gold/50 text-[10px] font-semibold text-gold">
                      {i + 1}
                    </span>
                    <p className="text-sm font-light leading-relaxed">
                      <span className="font-medium text-ink">{s.step}: </span>
                      {s.text}
                    </p>
                  </li>
                ))}
              </ol>
            </Accordion>
          )}

          <Accordion title="Product Specifications">
            <dl>
              {specs.map(([label, value]) => {
                if (!value) return null;
                return (
                  <div
                    key={label}
                    className="grid gap-1 border-b border-line/70 py-3 last:border-b-0 sm:grid-cols-[140px_1fr] sm:gap-6"
                  >
                    <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">
                      {label}
                    </dt>
                    <dd className="text-sm font-light leading-relaxed">
                      {value}
                    </dd>
                  </div>
                );
              })}
            </dl>
          </Accordion>

          {product.ingredients && (
            <Accordion title="Ingredients">
              <p className="text-sm font-light leading-relaxed">
                {product.ingredients}
              </p>
            </Accordion>
          )}
        </div>
      </div>
    </div>
  );
}
