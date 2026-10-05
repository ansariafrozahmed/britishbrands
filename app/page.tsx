import { CategoryGrid } from "@/components/category-grid";
import { CollectionProductGrid, ProductGrid } from "@/components/product-grid";
import { HeroCarousel } from "@/components/hero-carousel";
import { AboutUs } from "@/components/about-us";
import { CtaSection } from "@/components/cta-section";
import { BrandsSection } from "@/components/brands-section";
import { StoreGallery } from "@/components/store-gallery";
import { FaqSection } from "@/components/faq";
import { B2bSection } from "@/components/b2b-section";
import { InstagramFeed } from "@/components/instagram-feed";



export default function HomePage() {
  return (
    <>
      {/* ————— HERO ————— */}
      <HeroCarousel />

      {/* ————— ABOUT US ————— */}
      <AboutUs />

      {/* ————— SHOP BY CATEGORY ————— */}
      <CategoryGrid />

      {/* ————— FEATURED BRANDS ————— */}
      <BrandsSection />

      {/* ————— ALL PRODUCTS ————— */}
      <ProductGrid />

      {/* ————— ONE SECTION PER COLLECTION ————— */}
      {/* <CollectionProductGrid handle="men" /> */}
      {/* <CollectionProductGrid handle="women" />
      <CollectionProductGrid handle="unisex" /> */}

      {/* ————— STORE GALLERY ————— */}
      <StoreGallery />

      {/* ————— B2B PARTNERSHIPS ————— */}
      <B2bSection />

      {/* ————— INSTAGRAM FEED ————— */}
      <InstagramFeed />

      {/* ————— FAQ ————— */}
      <FaqSection />

      {/* ————— CTA ————— */}
      <CtaSection />
    </>
  );
}
