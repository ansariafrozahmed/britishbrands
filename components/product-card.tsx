import Image from "next/image";
import Link from "next/link";
import { WishlistButton } from "@/components/wishlist";
import { discountPercent, formatPrice, type Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  const off = discountPercent(product);
  // families read "Citrus Aromatic / Fresh Spicy"; the card shows the lead family only
  const family = product.family.split(" / ")[0];

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block"
      aria-label={`${product.name} — ${product.tagline}`}
    >
      <div className="relative aspect-[4/5]  overflow-hidden">
        <Image
          src={product.image}
          alt={`${product.name} Eau de Parfum bottle`}
          fill
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 25vw"
          className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.06]"
        />
        <WishlistButton
          product={product}
          className="absolute right-2 top-2"
        />
      </div>

      <div className="pt-4">
        <p className="truncate text-[9px] font-medium uppercase tracking-[0.15em] lg:tracking-[0.20em] text-gold">
          {family}
        </p>
        <h3 className="mt-1 md:mt-2 font-display text-[13px] lg:text-[15px] font-medium tracking-wide uppercase transition-colors duration-300 group-hover:text-gold">
          {product.name}
        </h3>
        {/* <div className="mt-1.5 md:mt-2.5 flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
          <span className="text-[15px] font-semibold tracking-wide">
            {formatPrice(product.price)}
          </span>
          <span className="text-xs font-light text-muted line-through">
            <span className="sr-only">MRP </span>
            {formatPrice(product.mrp)}
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-gold">
            {off}% Off
          </span>
        </div> */}
      </div>
    </Link>
  );
}
