"use client";

import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { collections } from "@/lib/products";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState } from "react";

export function useCategories() {
  const [cats, setCats] = useState<any[]>([]);

  useEffect(() => {
    async function fetchCats() {
      try {
        const apiUrl =
          process.env.NEXT_PUBLIC_API_URL ||
          "https://britishbrandbck.demotempwebsite.co.in/wp-json";
        const res = await fetch(`${apiUrl}/custom/v1/getAllCategories`);
        const data = await res.json();
        if (data.success && data.categories) {
          setCats(data.categories);
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchCats();
  }, []);

  return cats.length > 0 ? cats : collections;
}

export function CategorySlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: "start",
      dragFree: true,
      containScroll: "trimSnaps",
    },
    [Autoplay({ delay: 4000, stopOnInteraction: false, playOnInit: false })],
  );

  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const items = useCategories();

  const scrollPrev = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
    emblaApi.plugins().autoplay?.reset();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
    emblaApi.plugins().autoplay?.reset();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, [emblaApi]);

  const onScroll = useCallback(() => {
    if (!emblaApi) return;
    const progress = Math.max(0, Math.min(1, emblaApi.scrollProgress()));
    setScrollProgress(progress * 100);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect();
    onScroll();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("scroll", onScroll);
    emblaApi.on("reInit", onScroll);

    // Only autoplay when in view
    const rootNode = emblaApi.rootNode();
    if (!rootNode) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const autoplay = emblaApi.plugins().autoplay;
        if (!autoplay) return;

        if (entries[0].isIntersecting) {
          autoplay.play();
        } else {
          autoplay.stop();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(rootNode);
    return () => observer.disconnect();
  }, [emblaApi, onSelect, onScroll]);

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y -ml-4 lg:-ml-6">
          {items.map((c: any) => {
            const localImage = collections.find(
              (lc) => lc.handle === (c.slug || c.handle),
            )?.image;
            const imageUrl =
              c.image ||
              localImage ||
              "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png";
            return (
              <div
                key={c.slug || c.handle}
                className="min-w-0 flex-none  pl-4 w-[60%] sm:w-[40%] lg:w-[25%]"
              >
                <Link
                  href={`/collections/${c.slug || c.handle}`}
                  className="group relative block aspect-[3/4] overflow-hidden"
                >
                  <Image
                    src={imageUrl}
                    alt={`Shop ${c.name || c.title} fragrances`}
                    fill
                    sizes="(max-width: 640px) 90vw, 50vw"
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.06]"
                  />
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        {/* Progress Bar */}
        <div className="h-[2px] w-full max-w-sm bg-line/50 overflow-hidden relative">
          <div
            className="absolute top-0 left-0 bottom-0 bg-ink"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        {/* Arrows */}
        <div className="flex items-center gap-3">
          <button
            onClick={scrollPrev}
            disabled={prevBtnDisabled}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line transition-colors hover:border-gold-light hover:text-gold disabled:opacity-30 disabled:hover:border-line disabled:hover:text-ink"
            aria-label="Previous slide"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            onClick={scrollNext}
            disabled={nextBtnDisabled}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line transition-colors hover:border-gold-light hover:text-gold disabled:opacity-30 disabled:hover:border-line disabled:hover:text-ink"
            aria-label="Next slide"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export function CategoryGrid() {
  return (
    <section className="mx-auto max-w-[1500px] px-5 py-12 lg:px-14 lg:py-20">
      <Reveal className="text-center">
        <p className="eyebrow-rule text-[11px] font-medium uppercase tracking-[0.45em] text-gold">
          Collections
        </p>
        <h2 className="mt-3 font-display text-[1.6rem] uppercase font-normal tracking-[0.01em] text-[#3F2E19] leading-[1.4] md:text-[1.8rem]">
          Shop by Category
        </h2>
      </Reveal>

      <div className="mt-8 lg:mt-10">
        <CategorySlider />
      </div>
    </section>
  );
}

export function CollectionTiles() {
  const items = useCategories();

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-8">
      {items.map((c: any, i: number) => {
        const imageUrl =
          c.image ||
          "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png";

        return (
          <Reveal key={c.slug || c.handle} delay={i * 100}>
            <Link
              href={`/collections/${c.slug || c.handle}`}
              className="group relative block aspect-[3/4] overflow-hidden"
            >
              <Image
                src={imageUrl}
                alt={c.name || c.title}
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              {/* <div className="absolute inset-0 bg-ink/20 transition-colors group-hover:bg-ink/40" />
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <span
                  className="font-display text-[15px] md:text-lg font-medium tracking-widest text-white uppercase text-center"
                  dangerouslySetInnerHTML={
                    c.name ? { __html: c.name } : undefined
                  }
                >
                  {!c.name ? c.title : null}
                </span>
              </div> */}
            </Link>
          </Reveal>
        );
      })}
    </div>
  );
}
