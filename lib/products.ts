export type Collection = {
  handle: string;
  title: string;
  description: string;
  image: string;
};

export const collections: Collection[] = [];

export type Gender = "him" | "her" | "unisex";

export const categoryLabel: Record<Gender, string> = {
  him: "For Men",
  her: "For Women",
  unisex: "Unisex (Men & Women)",
};

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  family: string;
  gender: Gender;
  description: string;
  price: number;
  /** list price (MRP); the discount is shown against it */
  mrp: number;
  sizes: string[];
  longevity: string;
  sillage: string;
  notes: { top: string[]; middle: string[]; base: string[] };
  ingredients: string;
  howToUse: { step: string; text: string }[];
  specs: {
    formulation: string;
    targetGender: string;
    volume: string;
    idealWear: string;
    packaging: string;
    storage: string;
  };
  collections: string[];
  image: string;
  brand: string;
  inStock: boolean;
};

export const products: Product[] = [];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getCollection(handle: string): Collection | undefined {
  return collections.find((c) => c.handle === handle);
}

export function getCollectionProducts(handle: string): Product[] {
  return products.filter((p) => p.collections.includes(handle));
}

export function getRelated(product: Product, count = 4): Product[] {
  return [];
}

export function formatPrice(value: number): string {
  return `${value.toLocaleString("en-US")} LYD`;
}

export function discountPercent(product: Product): number {
  if (product.mrp <= 0) return 0;
  return Math.round(((product.mrp - product.price) / product.mrp) * 100);
}
