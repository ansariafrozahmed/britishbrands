"use client";

import { useState } from "react";
import Image from "next/image";
import { Reveal } from "@/components/reveal";

export function StoreGallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const images = [
    {
      src: "/DSC00731.webp",
      alt: "Store Interior View",
      colSpan: "col-span-2",
      rowSpan: "row-span-2",
      delay: 100,
    },
    {
      src: "/DSC00652.webp",
      alt: "Fragrance Display",
      colSpan: "",
      rowSpan: "",
      delay: 200,
    },
    {
      src: "/DSC00714.webp",
      alt: "Perfume Collection",
      colSpan: "",
      rowSpan: "",
      delay: 300,
    },
    {
      src: "/DSC00632.webp",
      alt: "Store Front",
      colSpan: "col-span-2",
      rowSpan: "",
      delay: 400,
      objectPosition: "center bottom",
    },
  ];

  return (
    <>
      <section className="mx-auto max-w-[1500px] px-5 py-12 lg:px-14 lg:py-20">
        <Reveal className="text-center mb-12">
          <p className="eyebrow-rule text-[11px] font-medium uppercase tracking-[0.45em] text-gold">
            Our Location
          </p>
          <h2 className="mt-4 font-display text-[1.6rem] uppercase font-normal tracking-[0.01em] text-[#3F2E19] leading-[1.4] md:text-[1.8rem]">
            Inside Our Store
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[15px] font-normal leading-[1.9] text-muted">
            Step into our world of luxury fragrances. A physical space designed
            for discovery, exploration, and finding your signature scent.
          </p>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px] lg:auto-rows-[250px]">
          {images.map((img, idx) => (
            <Reveal
              key={idx}
              delay={img.delay}
              className={`${img.colSpan} ${img.rowSpan} relative overflow-hidden group cursor-pointer`}
            >
              <div
                onClick={() => setSelectedImage(img.src)}
                className="w-full h-full"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  style={
                    img.objectPosition
                      ? { objectPosition: img.objectPosition }
                      : {}
                  }
                />
                <div className="absolute inset-0 bg-ink/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <div className="bg-white/90 p-3 rounded-full translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <svg
                      viewBox="0 0 24 24"
                      className="w-5 h-5 text-ink"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Lightbox Overlay */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 md:p-10 transition-opacity"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-6 right-6 text-white/70 hover:text-white z-50 p-2"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage(null);
            }}
            aria-label="Close Lightbox"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div
            className="relative w-full max-w-6xl h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full max-h-[85vh]">
              <Image
                src={selectedImage}
                alt="Enlarged Store View"
                fill
                className="object-contain"
                quality={100}
                priority
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
