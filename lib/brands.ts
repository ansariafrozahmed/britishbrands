import { products, type Product } from "./products";

export type Brand = {
  id: string;
  name: string;
  description: string;
  logo: string;
};

export const brands: Brand[] = [];

export function getBrand(id: string): Brand | undefined {
  return brands.find((b) => b.id === id);
}

export function getBrandProducts(brandId: string): Product[] {
  // Dummy logic to assign a subset of products to each brand for demonstration
  if (brandId === "brand-a") return products.slice(0, 3);
  if (brandId === "brand-b") return products.slice(3, 6);
  if (brandId === "brand-c") return products.slice(6, 7);
  return products;
}
