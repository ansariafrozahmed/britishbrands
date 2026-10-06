import { formatPrice, type Product } from "@/lib/products";
import { contact, telHref, whatsappHref } from "@/lib/site";

export function QuickEnquiry({ product }: { product: any }) {
  const sizeStr = product.sizes?.[0]?.size || "";
  const price = parseFloat(product.price) || 0;
  const sizeText = sizeStr ? ` (${sizeStr})` : "";
  const message = `Hi British Brands, I'm interested in ${product.name}${sizeText}. Could you share availability and offers?`;

  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-2">
        <a
          href={whatsappHref(message)}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex h-14 items-center justify-center gap-3 bg-[#1f7a4d] px-6 text-[11px] font-semibold uppercase tracking-[0.22em] text-white transition-colors duration-300 hover:bg-[#186540]"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
            <path d="M12 2.2A9.8 9.8 0 003.6 17l-1.4 4.8 4.9-1.3A9.8 9.8 0 1012 2.2zm0 17.9a8.1 8.1 0 01-4.1-1.1l-.3-.2-2.9.8.8-2.8-.2-.3A8.1 8.1 0 1112 20.1zm4.4-6c-.2-.1-1.4-.7-1.7-.8-.2-.1-.4-.1-.5.1l-.8.9c-.1.2-.3.2-.5.1a6.7 6.7 0 01-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5a.9.9 0 00-.7.3 2.8 2.8 0 00-.9 2.1 4.9 4.9 0 001 2.6 11.2 11.2 0 004.3 3.8c1.6.7 2.2.7 3 .6a2.6 2.6 0 001.7-1.2 2.1 2.1 0 00.1-1.2c0-.1-.2-.2-.4-.3z" />
          </svg>
          WhatsApp Enquiry
        </a>
        <a
          href={telHref}
          className="group flex h-14 items-center justify-center gap-3 border border-ink px-6 text-[11px] font-semibold uppercase tracking-[0.22em] text-ink transition-colors duration-300 hover:bg-ink hover:text-white"
        >
          <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
            <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" />
          </svg>
          Call to Enquire
        </a>
      </div>
      <p className="mt-3 text-center text-[11px] font-light text-muted sm:text-left">
        {contact.phoneDisplay} · Sat – Thu, 10 AM – 10:30 PM | Fri 4:30 PM – 10:30 PM · Replies within 24 hours
      </p>
    </div>
  );
}
