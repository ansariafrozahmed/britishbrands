"use client";

import { useEffect, useState } from "react";

import { Product } from "@/lib/products";

const KEY = "britishbrands-wishlist-full";
const EVENT = "britishbrands-wishlist-change";

function read(): Product[] {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) ?? "[]");
    return Array.isArray(raw) ? raw : [];
  } catch {
    return [];
  }
}

function write(products: Product[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(products));
  } catch {
    // storage unavailable — wishlist lives for this render only
  }
  window.dispatchEvent(new Event(EVENT));
}

export function useWishlist() {
  const [items, setItems] = useState<Product[]>([]);

  useEffect(() => {
    const sync = () => setItems(read());
    sync();
    window.addEventListener(EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const toggle = (product: Product) => {
    const current = read();
    const exists = current.some((p) => p.slug === product.slug);
    write(
      exists
        ? current.filter((p) => p.slug !== product.slug)
        : [...current, product],
    );
  };

  return { 
    items, 
    toggle, 
    has: (slug: string) => items.some((p) => p.slug === slug) 
  };
}

export function WishlistButton({
  product,
  className = "",
}: {
  product: Product;
  className?: string;
}) {
  const { has, toggle } = useWishlist();
  const saved = has(product.slug);

  return (
    <button
      type="button"
      aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
      aria-pressed={saved}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(product);
      }}
      className={`flex h-9 w-9 bg-white rounded-xs items-center justify-center transition-colors duration-300 ${className}`}
    >
      <svg
        viewBox="0 0 24 24"
        className={`h-4 w-4 transition-colors duration-300 ${
          saved ? "text-gold" : "text-ink"
        }`}
        fill={saved ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.6"
      >
        <path d="M12 20.5C6.8 16.6 3.5 13.4 3.5 9.9A4.4 4.4 0 0112 7.2a4.4 4.4 0 018.5 2.7c0 3.5-3.3 6.7-8.5 10.6z" />
      </svg>
    </button>
  );
}
