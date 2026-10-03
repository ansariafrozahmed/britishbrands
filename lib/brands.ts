import { products, type Product } from "./products";

export type Brand = {
  id: string;
  name: string;
  description: string;
  logo: string;
};

export const brands: Brand[] = [
  {
    id: "amouage",
    name: "Amouage",
    description:
      "Elegant and timeless French fragrances blending tradition with modernity.",
    logo: "https://aventuramall.com/wp-content/uploads/2025/08/Amouage-logo-aventura-mall-1.jpg",
  },
  {
    id: "xerjoff",
    name: "Xerjoff",
    description:
      "Rich, opulent Middle Eastern blends focusing on the finest aged oud.",
    logo: "https://www.xerjoff.com/cdn/shop/files/Logo.svg?v=1738685244&width=160",
  },
  {
    id: "parfums-de-marly",
    name: "Parfums de Marly",
    description:
      "Fresh, vibrant, and entirely natural scents inspired by global gardens.",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrLZq9DMQKYNvFoSl-bIzrxBtLmOlTzJrqgqJ6pj207xaeUVS2DkMLMat_&s=10",
  },
  {
    id: "initio",
    name: "Initio",
    description:
      "Fresh, vibrant, and entirely natural scents inspired by global gardens.",
    logo: "https://mdpindia.com/cdn/shop/files/MDP-round-logo-FA-RGB_100x.png?v=1614285508",
  },
];

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
