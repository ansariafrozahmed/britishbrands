"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const slides = [
  {
    id: 1,
    desktop: "https://pub-ab787ccfc74d4e3fb148587fdedd4650.r2.dev/DSC00632.JPG",
    mobile: "https://pub-ab787ccfc74d4e3fb148587fdedd4650.r2.dev/DSC00632.JPG",
    alt: "The British Brands collection - Slide 1",
  },
  {
    id: 2,
    desktop: "https://pub-ab787ccfc74d4e3fb148587fdedd4650.r2.dev/DSC00621.JPG",
    mobile: "https://pub-ab787ccfc74d4e3fb148587fdedd4650.r2.dev/DSC00621.JPG",
    alt: "The British Brands collection - Slide 1",
  },
];

export function HeroCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi],
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section className="relative overflow-hidden bg-cream w-full group">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className="min-w-0 flex-[0_0_100%] h-[85vh] lg:h-screen relative"
            >
              {/* Desktop */}
              <Image
                src={slide.desktop}
                alt={slide.alt}
                width={1920}
                height={1080}
                sizes="100vw"
                quality={100}
                className="hidden w-full h-full object-cover object-center md:block"
                priority={index === 0}
              />
              {/* Mobile */}
              <Image
                src={slide.mobile}
                alt={slide.alt}
                width={1080}
                height={1920}
                sizes="100vw"
                quality={100}
                className="block w-full h-full object-cover object-center md:hidden"
                priority={index === 0}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Overlay content */}
      <div className="absolute inset-0 z-10 pb-6 lg:pb-8 flex flex-col items-center justify-end bg-linear-to-t from-[#1B1815]/85 via-transparent to-[#1B1815]/50 text-center px-6">
        <h1 className="text-[28px] md:text-3xl lg:text-[2rem] font-semibold text-white tracking-wide uppercase mb-4 lg:mb-5 max-w-4xl [text-shadow:0_4px_12px_rgba(0,0,0,0.8)]">
          Discover Your Signature Scent
        </h1>
        <p className="text-[13px] md:text-base text-white/90 font-normal max-w-xl mb-6 lg:mb-10 [text-shadow:0_2px_8px_rgba(0,0,0,0.8)] leading-relaxed">
          Explore a curated selection of fragrances from British Brands,
          available through our retail store in Libya.
        </p>
        <div className="grid grid-cols-2 items-center gap-4 w-full sm:w-auto">
          <Link
            href="/g"
            className="flex h-12 w-full sm:w-auto items-center justify-center bg-white px-2 lg:px-8 text-[10px] lg:text-[11px] font-semibold uppercase tracking-[0.1em] text-ink transition-colors hover:bg-gold hover:text-white"
          >
            Explore Fragrace
          </Link>
          <Link
            href="/store"
            className="flex h-12 w-full sm:w-auto items-center justify-center border border-white px-2 lg:px-8 text-[10px] lg:text-[11px] font-semibold uppercase tracking-[0.1em] text-white transition-colors hover:bg-white hover:text-ink"
          >
            Visit Our Store
          </Link>
        </div>
      </div>

      {/* Navigation arrows */}

      {/* {slides.length > 1 && (
        <>
          <button
            onClick={scrollPrev}
            className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full opacity-0 md:group-hover:opacity-100 transition-opacity"
            aria-label="Previous slide"
          >
            <svg
              className="w-5 h-5 text-ink"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={scrollNext}
            className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full opacity-0 md:group-hover:opacity-100 transition-opacity"
            aria-label="Next slide"
          >
            <svg
              className="w-5 h-5 text-ink"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2.5">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  selectedIndex === index
                    ? "bg-ink"
                    : "bg-ink/30 hover:bg-ink/60"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )} */}
    </section>
  );
}
