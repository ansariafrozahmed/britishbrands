"use client";

import { usePathname } from "next/navigation";
import { formatPrice, getProduct } from "@/lib/products";
import { whatsappHref } from "@/lib/site";

export function WhatsAppFloat() {
  const pathname = usePathname();

  // on a product page, name the fragrance so the chat starts with context
  const slug = pathname.startsWith("/products/")
    ? pathname.split("/")[2]
    : null;
  const product = slug ? getProduct(slug) : undefined;
  const message = product
    ? `Hi British Brands, I'm interested in ${product.name} (${product.sizes[0]}). Could you share availability and offers?`
    : "Hi British Brands, I have a question.";

  return (
    <a
      href={whatsappHref(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with British Brands on WhatsApp"
      className="group fixed bottom-3 right-3 z-40 flex items-center overflow-hidden rounded-lg bg-[#25D366] text-white shadow-[0_10px_28px_-6px_rgba(22,19,15,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1ebe5a] lg:bottom-6 lg:right-6"
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center">
        <svg
          viewBox="0 0 24 24"
          className="h-6 w-6"
          fill="currentColor"
          aria-hidden
        >
          <path d="M12 2.2A9.8 9.8 0 003.6 17l-1.4 4.8 4.9-1.3A9.8 9.8 0 1012 2.2zm0 17.9a8.1 8.1 0 01-4.1-1.1l-.3-.2-2.9.8.8-2.8-.2-.3A8.1 8.1 0 1112 20.1zm4.4-6c-.2-.1-1.4-.7-1.7-.8-.2-.1-.4-.1-.5.1l-.8.9c-.1.2-.3.2-.5.1a6.7 6.7 0 01-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5a.9.9 0 00-.7.3 2.8 2.8 0 00-.9 2.1 4.9 4.9 0 001 2.6 11.2 11.2 0 004.3 3.8c1.6.7 2.2.7 3 .6a2.6 2.6 0 001.7-1.2 2.1 2.1 0 00.1-1.2c0-.1-.2-.2-.4-.3z" />
        </svg>
      </span>
      {/* label slides out on desktop hover */}
      <span className="hidden max-w-0 whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.2em] opacity-0 transition-all duration-300 group-hover:max-w-40 group-hover:pr-6 group-hover:opacity-100 lg:inline-block">
        Chat with us
      </span>
    </a>
  );
}
