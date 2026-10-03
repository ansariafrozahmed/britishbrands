import type { Metadata } from "next";
import { AboutHero } from "@/components/about-hero";
import { StoreGallery } from "@/components/store-gallery";
import { OurApproach } from "@/components/our-approach";
import { CtaSection } from "@/components/cta-section";

export const metadata: Metadata = {
  title: "About Us | British Brands",
  description:
    "British Brands is a fragrance retailer based in Libya, bringing together a curated selection of fragrance brands and products.",
};

export default function AboutPage() {
  return (
    <div>
      <AboutHero />
      <StoreGallery />
      <OurApproach />
      <CtaSection />
    </div>
  );
}
