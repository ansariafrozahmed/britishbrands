"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SearchOverlay } from "@/components/search-overlay";
import { useWishlist } from "@/components/wishlist";
import { collections, formatPrice, products } from "@/lib/products";
import { telHref, whatsappHref } from "@/lib/site";

const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/brands", label: "Brands" },
  { href: "/collections", label: "Fragrance", mega: true },
  { href: "/store", label: "Store" },
  { href: "/partner-with-us", label: "B2B & Brand Partnerships" },
  { href: "/contact", label: "Contact" },
] as const;

// `short` is shown on phones, where the full line would wrap
const announcements = [
  // {
  //   full: "Free shipping on all prepaid orders",
  //   short: "Free shipping on prepaid orders",
  // },
  {
    full: "Long-lasting Eau de Parfum",
    short: "Long-lasting Eau de Parfum",
  },
];

const featured = products.slice(0, 4);

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [message, setMessage] = useState(0);
  const [megaCategories, setMegaCategories] = useState<
    { name: string; slug: string }[]
  >([]);
  const [megaProducts, setMegaProducts] = useState<any[]>([]);
  const { slugs } = useWishlist();

  useEffect(() => {
    async function fetchMegaMenu() {
      try {
        const apiUrl =
          process.env.NEXT_PUBLIC_API_URL ||
          "https://britishbrandbck.demotempwebsite.co.in/wp-json";
        const res = await fetch(`${apiUrl}/custom/v1/megaMenu`);
        const data = await res.json();
        if (data.success) {
          setMegaCategories(data.categories?.items || []);
          setMegaProducts(data.products?.items || []);
        }
      } catch (err) {
        console.error("MegaMenu API error:", err);
      }
    }
    fetchMegaMenu();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const id = setInterval(
      () => setMessage((i) => (i + 1) % announcements.length),
      4000,
    );
    return () => clearInterval(id);
  }, []);

  // "/" opens search from anywhere; Escape closes the shop panel
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMega(false);
        setOpen(false);
        return;
      }
      if (e.key !== "/" || e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement | null;
      if (
        t &&
        (t.isContentEditable ||
          ["INPUT", "TEXTAREA", "SELECT"].includes(t.tagName))
      ) {
        return;
      }
      e.preventDefault();
      setSearchOpen(true);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // transparent only while resting on top of the home hero
  const glass = isHome && !scrolled && !open && !mega;
  const iconColor = glass
    ? "text-white/90 hover:text-white"
    : "text-ink hover:text-gold";

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          glass ? "bg-transparent" : "bg-bg"
        }`}
        onMouseLeave={() => setMega(false)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
            setMega(false);
          }
        }}
      >
        {/* announcement — folds away on scroll */}
        <div
          className={`overflow-hidden bg-charcoal text-white transition-[height] duration-500 ${
            scrolled ? "h-0" : "h-9"
          }`}
          aria-live="polite"
        >
          <div className="flex h-9 items-center justify-center gap-3 px-4 sm:gap-4">
            <span
              aria-hidden
              className="text-[6px] text-gold-light sm:text-[7px]"
            >
              ◆
            </span>
            <p
              key={message}
              className="animate-ticker truncate whitespace-nowrap text-[9px] font-light uppercase tracking-[0.2em] text-white/85 sm:text-[10px] sm:tracking-[0.35em]"
            >
              <span className="sm:hidden">{announcements[message].short}</span>
              <span className="hidden sm:inline">
                {announcements[message].full}
              </span>
            </p>
            <span
              aria-hidden
              className="text-[6px] text-gold-light sm:text-[7px]"
            >
              ◆
            </span>
          </div>
        </div>

        {/* row 1 — search · logo · wishlist */}
        <div
          className={`mx-auto grid max-w-[1500px] grid-cols-[1fr_auto_1fr] items-center px-5 transition-[height] duration-500 lg:px-14 ${
            scrolled ? "h-16" : "h-20"
          }`}
        >
          <button
            type="button"
            aria-label="Search fragrances"
            onClick={() => setSearchOpen(true)}
            className={`sweep-parent flex items-center gap-2 justify-self-start transition-colors duration-300 ${iconColor}`}
          >
            <span className="flex h-10 w-10 items-center justify-center lg:w-5">
              <svg
                viewBox="0 0 24 24"
                className="h-[18px] w-[18px]"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-3.8-3.8" />
              </svg>
            </span>
            <span className="hidden items-center gap-3 lg:flex">
              <span className="link-sweep text-[10px] font-medium uppercase tracking-[0.3em]">
                Search
              </span>
              <kbd
                className={`border px-1.5 py-0.5 font-sans text-[9px] leading-none ${
                  glass
                    ? "border-white/30 text-white/70"
                    : "border-ink/20 text-ink/50"
                }`}
              >
                /
              </kbd>
            </span>
          </button>

          <Link
            href="/"
            aria-label="British Brands — Home"
            className="justify-self-center"
          >
            <Image
              src="/logo_brown.png"
              alt="BRITISH BRANDS"
              width={500}
              height={350}
              preload
              className={`w-auto transition-all duration-500 ${
                scrolled ? "h-10" : "h-12 lg:h-14"
              } ${glass ? "brightness-0 invert" : ""}`}
            />
          </Link>

          <div className="flex items-center gap-1 justify-self-end">
            <Link
              href="/wishlist"
              aria-label={`Wishlist, ${slugs.length} saved`}
              className={`sweep-parent flex items-center gap-2 transition-colors duration-300 ${iconColor}`}
            >
              <span className="relative flex h-10 w-10 items-center justify-center lg:w-5">
                <svg
                  viewBox="0 0 24 24"
                  className="h-[18px] w-[18px]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M12 20.5C6.8 16.6 3.5 13.4 3.5 9.9A4.4 4.4 0 0112 7.2a4.4 4.4 0 018.5 2.7c0 3.5-3.3 6.7-8.5 10.6z" />
                </svg>
                {slugs.length > 0 && (
                  <span className="absolute right-0.5 top-0.5 flex h-4 w-4 items-center justify-center bg-gold text-[9px] font-semibold text-white lg:hidden">
                    {slugs.length}
                  </span>
                )}
              </span>
              <span className="hidden items-center gap-2 lg:flex">
                <span className="link-sweep text-[10px] font-medium uppercase tracking-[0.3em]">
                  Wishlist
                </span>
                {slugs.length > 0 && (
                  <span className="flex h-4 min-w-4 items-center justify-center bg-gold px-1 text-[9px] font-semibold text-white">
                    {slugs.length}
                  </span>
                )}
              </span>
            </Link>
            <button
              type="button"
              aria-label="Toggle menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
            >
              <span
                className={`h-px w-6 transition-all duration-300 ${
                  glass && !open ? "bg-white" : "bg-ink"
                } ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
              />
              <span
                className={`h-px w-6 transition-all duration-300 ${
                  glass && !open ? "bg-white" : "bg-ink"
                } ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
              />
            </button>
          </div>
        </div>

        {/* row 2 — centered menu */}
        <nav
          className={`hidden h-11 items-center justify-center gap-10 border-t md:flex ${
            glass ? "border-ink/10" : "border-line"
          }`}
        >
          {nav.map((item) => {
            const active = pathname === item.href && !item.href.includes("?");
            const linkClass = `link-sweep flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.2em] transition-colors duration-300 ${
              glass
                ? "text-white/90 hover:text-white"
                : "text-ink hover:text-gold"
            }`;

            if ("mega" in item) {
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  aria-expanded={mega}
                  onMouseEnter={() => setMega(true)}
                  onFocus={() => setMega(true)}
                  className={linkClass}
                >
                  {item.label}
                  <svg
                    viewBox="0 0 10 6"
                    aria-hidden
                    className={`h-1.5 w-2.5 transition-transform duration-300 ${
                      mega ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                  >
                    <path d="M1 1l4 4 4-4" />
                  </svg>
                </Link>
              );
            }

            return (
              <Link
                key={item.label}
                href={item.href}
                aria-current={active ? "page" : undefined}
                onMouseEnter={() => setMega(false)}
                className={linkClass}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* shop panel — desktop */}
        <div
          onClick={() => setMega(false)}
          className={`absolute inset-x-0 top-full hidden border-t border-line bg-bg shadow-[0_28px_48px_-28px_rgba(22,19,15,0.25)] transition-all duration-300 lg:block ${
            mega
              ? "visible translate-y-0 opacity-100"
              : "pointer-events-none invisible -translate-y-2 opacity-0"
          }`}
        >
          <div className="mx-auto grid max-w-[1500px] grid-cols-[200px_1fr] gap-12 px-10 py-10">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gold">
                Collections
              </p>
              <ul className="mt-5 space-y-3">
                {(megaCategories.length > 0
                  ? megaCategories
                  : collections.slice(0, 5)
                ).map((c: any) => (
                  <li key={c.slug || c.handle}>
                    <Link
                      href={`/collections/${c.slug || c.handle}`}
                      className="text-sm font-light text-ink transition-colors hover:text-gold"
                      dangerouslySetInnerHTML={
                        c.name ? { __html: c.name } : undefined
                      }
                    >
                      {!c.name ? c.title : null}
                    </Link>
                  </li>
                ))}
                <li className="pt-2">
                  <Link
                    href="/collections"
                    className="link-sweep text-[10px] font-medium uppercase tracking-[0.3em] text-ink"
                  >
                    All Collections
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <div className="flex items-baseline justify-between">
                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gold">
                  Our Fragrances
                </p>
                <Link
                  href="/collections"
                  className="link-sweep text-[10px] font-medium uppercase tracking-[0.3em] text-ink"
                >
                  View All
                </Link>
              </div>
              <div className="mt-5 grid grid-cols-4 gap-5">
                {(megaProducts.length > 0 ? megaProducts : featured).map(
                  (p: any) => (
                    <Link
                      key={p.slug}
                      href={`/products/${p.slug}`}
                      className="group block"
                    >
                      <div className="relative aspect-[4/5] overflow-hidden bg-cream">
                        <Image
                          src={Array.isArray(p.image) ? p.image[0] : p.image}
                          alt={p.name}
                          fill
                          sizes="180px"
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                        />
                      </div>
                      <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors group-hover:text-gold">
                        {p.name}
                      </p>
                      <p className="mt-1 flex items-baseline gap-2 text-xs">
                        <span className="font-medium text-ink">
                          {formatPrice(Number(p.price))}
                        </span>
                        <span className="font-light text-muted line-through">
                          <span className="sr-only">MRP </span>
                          {formatPrice(Number(p.mrp))}
                        </span>
                      </p>
                    </Link>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>

        {/* mobile drawer */}
        <div
          inert={!open}
          className={`fixed inset-0 z-[55] md:hidden ${open ? "visible" : "invisible delay-500"}`}
        >
          <button
            type="button"
            aria-label="Close menu"
            tabIndex={-1}
            onClick={() => setOpen(false)}
            className={`absolute inset-0 bg-black/40 transition-opacity duration-500 ${
              open ? "opacity-100" : "opacity-0"
            }`}
          />
          <aside
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className={`absolute inset-y-0 left-0 flex w-[100%] flex-col bg-bg shadow-[24px_0_48px_-24px_rgba(22,19,15,0.35)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              open ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="flex h-20 shrink-0 items-center justify-between border-b border-line px-5">
              <Link
                href="/"
                onClick={() => setOpen(false)}
                aria-label="British Brands — Home"
              >
                <Image
                  src="/logo_brown.png"
                  alt="BRITISH BRANDS"
                  width={500}
                  height={350}
                  className="h-12 w-auto"
                />
              </Link>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="flex h-10 w-10 items-center justify-center border border-line transition-colors active:bg-ink active:text-white"
              >
                <svg
                  viewBox="0 0 20 20"
                  className="h-4 w-4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                  aria-hidden
                >
                  <path d="M4 4l12 12M16 4L4 16" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto overscroll-contain">
              {/* collections showcase */}
              <div
                style={{ transitionDelay: open ? "120ms" : "0ms" }}
                className={`pt-6 transition-all duration-500 ${
                  open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                }`}
              >
                <div className="flex items-baseline justify-between px-5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gold">
                    Shop by Collection
                  </p>
                  <span className="text-[10px] font-light uppercase tracking-[0.2em] text-muted">
                    Swipe →
                  </span>
                </div>
                <div className="no-scrollbar mt-4 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 pb-1">
                  {(megaCategories.length > 0
                    ? megaCategories
                    : collections
                  ).map((c: any) => {
                    const href = `/collections/${c.slug || c.handle}`;
                    const localImage = collections.find(
                      (lc) => lc.handle === (c.slug || c.handle),
                    )?.image;
                    const imageUrl =
                      c.image ||
                      localImage ||
                      "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png";
                    return (
                      <Link
                        key={c.slug || c.handle}
                        href={href}
                        onClick={() => setOpen(false)}
                        aria-current={pathname === href ? "page" : undefined}
                        className={`group block w-28 shrink-0 snap-start ${pathname === href ? "text-gold" : "text-ink"}`}
                      >
                        <span className="relative block aspect-[3/4] overflow-hidden">
                          <Image
                            src={imageUrl}
                            alt=""
                            fill
                            sizes="110px"
                            className="object-cover transition-transform duration-500 group-active:scale-110"
                          />
                        </span>
                        <span
                          className="mt-2 block text-[10px] font-semibold uppercase tracking-[0.05em]"
                          dangerouslySetInnerHTML={
                            c.name ? { __html: c.name } : undefined
                          }
                        >
                          {!c.name ? c.title : null}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* fragrance carousel */}
              <div
                style={{ transitionDelay: open ? "200ms" : "0ms" }}
                className={`pt-8 transition-all duration-500 ${
                  open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                }`}
              >
                <div className="flex items-baseline justify-between px-5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gold">
                    Our Fragrances
                  </p>
                  <span className="text-[10px] font-light uppercase tracking-[0.2em] text-muted">
                    Swipe →
                  </span>
                </div>
                <div className="no-scrollbar mt-4 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 pb-1">
                  {(megaProducts.length > 0
                    ? megaProducts
                    : products.slice(0, 5)
                  ).map((p: any) => (
                    <Link
                      key={p.slug}
                      href={`/products/${p.slug}`}
                      onClick={() => setOpen(false)}
                      className="group block w-32 shrink-0 snap-start"
                    >
                      <span className="relative block aspect-[4/5] overflow-hidden bg-cream">
                        <Image
                          src={Array.isArray(p.image) ? p.image[0] : p.image}
                          alt=""
                          fill
                          sizes="128px"
                          className="object-cover transition-transform duration-500 group-active:scale-110"
                        />
                      </span>
                      <span className="mt-2 block truncate text-[10px] font-semibold uppercase tracking-[0.12em]">
                        {p.name}
                      </span>
                      <span className="mt-0.5 flex items-baseline gap-1.5 text-[11px]">
                        <span className="font-medium">
                          {formatPrice(Number(p.price))}
                        </span>
                        <span className="font-light text-muted line-through">
                          {formatPrice(Number(p.mrp))}
                        </span>
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* links */}
              <ul className="mt-8 border-t border-line px-5">
                {[
                  ...nav.filter(
                    (item) => !item.href.startsWith("/collections/"),
                  ),
                  {
                    href: "/wishlist",
                    label: slugs.length
                      ? `Wishlist (${slugs.length})`
                      : "Wishlist",
                  },
                ].map((item, i) => {
                  const active = pathname === item.href;
                  return (
                    <li
                      key={item.href}
                      style={{
                        transitionDelay: open ? `${280 + i * 60}ms` : "0ms",
                      }}
                      className={`border-b border-line transition-all duration-500 ${
                        open
                          ? "translate-x-0 opacity-100"
                          : "-translate-x-4 opacity-0"
                      }`}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        aria-current={active ? "page" : undefined}
                        className={`group flex items-center justify-between py-4 text-[13px] font-semibold uppercase tracking-[0.2em] transition-colors active:text-gold ${
                          active ? "text-gold" : "text-ink"
                        }`}
                      >
                        {item.label}
                        <span className="text-gold transition-transform duration-300 group-active:translate-x-1.5">
                          →
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* quick contact */}
            <div className="grid shrink-0 grid-cols-2 gap-2.5 border-t border-line p-5">
              <a
                href={whatsappHref("Hi British Brands, I have a question.")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 items-center justify-center bg-[#25D366] text-[10px] font-semibold uppercase tracking-[0.2em] text-white transition-opacity active:opacity-80"
              >
                WhatsApp
              </a>
              <a
                href={telHref}
                className="flex h-12 items-center justify-center border border-ink text-[10px] font-semibold uppercase tracking-[0.2em] text-ink transition-colors active:bg-ink active:text-white"
              >
                Call Us
              </a>
            </div>
          </aside>
        </div>
      </header>

      {/* pages without a full-bleed hero start below the fixed header */}
      {!isHome && <div className="h-29 md:h-40 lg:h-42" />}

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
