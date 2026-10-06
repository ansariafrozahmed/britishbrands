import { type Product } from "./products";

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
  return [];
}
