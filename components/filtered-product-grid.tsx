"use client";

import { useState, useMemo } from "react";
import { Product, collections as allCollections } from "@/lib/products";
import { brands as allBrands } from "@/lib/brands";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/reveal";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

type FilterProps = {
  availability?: { label: string; value: string }[];
  brands?: { id: number; name: string; slug: string }[];
  gender?: { label: string; value: string }[];
  categories?: { id: number; name: string; slug: string }[];
  fragrance_family?: { label: string; value: string }[];
};

type FilteredProductGridProps = {
  products: Product[];
  filters?: FilterProps | null;
};

export function FilteredProductGrid({ products, filters }: FilteredProductGridProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Read state from URL
  const selectedBrands = useMemo(() => searchParams.get("brand")?.split(",").filter(Boolean) || [], [searchParams]);
  const selectedGenders = useMemo(() => searchParams.get("gender")?.split(",").filter(Boolean) || [], [searchParams]);
  const selectedCategories = useMemo(() => searchParams.get("category")?.split(",").filter(Boolean) || [], [searchParams]);
  const selectedFamilies = useMemo(() => searchParams.get("family")?.split(",").filter(Boolean) || [], [searchParams]);
  const inStockOnly = searchParams.get("availability") === "in-stock";

  // State for accordion (only one open at a time)
  const [activeAccordion, setActiveAccordion] = useState<string>("availability");

  const toggleAccordion = (id: string) => {
    setActiveAccordion((prev) => (prev === id ? "" : id));
  };

  const updateUrl = (key: string, values: string[]) => {
    const params = new URLSearchParams(searchParams.toString());
    if (values.length > 0) {
      params.set(key, values.join(","));
    } else {
      params.delete(key);
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const toggleFilter = (
    current: string[],
    key: string,
    value: string,
  ) => {
    let next;
    if (current.includes(value)) {
      next = current.filter((v) => v !== value);
    } else {
      next = [...current, value];
    }
    updateUrl(key, next);
  };

  const setInStockOnly = (checked: boolean) => {
    const params = new URLSearchParams(searchParams.toString());
    if (checked) {
      params.set("availability", "in-stock");
    } else {
      params.delete("availability");
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  // If server-side filters are not provided, fallback to client-side extraction (legacy mode)
  const families = useMemo(() => {
    if (filters?.fragrance_family) return filters.fragrance_family.map(f => f.value);
    const fams = new Set<string>();
    products.forEach((p) => { if (p.family) fams.add(p.family); });
    return Array.from(fams).sort();
  }, [products, filters]);

  const relevantBrands = useMemo(() => {
    if (filters?.brands) return filters.brands.map(b => ({ id: b.slug, name: b.name }));
    const activeBrandIds = new Set(products.map((p) => p.brand));
    return allBrands.filter((b) => activeBrandIds.has(b.id)).map(b => ({ id: b.id, name: b.name }));
  }, [products, filters]);

  const relevantCollections = useMemo(() => {
    if (filters?.categories) return filters.categories.map(c => ({ handle: c.slug, title: c.name }));
    const activeCollectionHandles = new Set(products.flatMap((p) => p.collections));
    return allCollections.filter((c) => activeCollectionHandles.has(c.handle)).map(c => ({ handle: c.handle, title: c.title }));
  }, [products, filters]);

  const genderOptions = useMemo(() => {
    if (filters?.gender) return filters.gender.map(g => ({ id: g.value, label: g.label }));
    return [
      { id: "him", label: "For Men" },
      { id: "her", label: "For Women" },
      { id: "unisex", label: "Unisex" },
    ];
  }, [filters]);

  // If filters prop is provided, we assume the server has already filtered the products.
  // Otherwise, fallback to client-side filtering.
  const filteredProducts = useMemo(() => {
    if (filters) return products;
    
    return products.filter((p) => {
      if (selectedBrands.length > 0 && !selectedBrands.includes(p.brand)) return false;
      if (selectedGenders.length > 0 && !selectedGenders.includes(p.gender)) return false;
      if (selectedCategories.length > 0) {
        const matchesCategory = selectedCategories.some((cat) => p.collections.includes(cat));
        if (!matchesCategory) return false;
      }
      if (selectedFamilies.length > 0 && !selectedFamilies.includes(p.family)) return false;
      if (inStockOnly && !p.inStock) return false;
      return true;
    });
  }, [ products, filters, selectedBrands, selectedGenders, selectedCategories, selectedFamilies, inStockOnly ]);



  const hasActiveFilters =
    selectedBrands.length > 0 ||
    selectedGenders.length > 0 ||
    selectedCategories.length > 0 ||
    selectedFamilies.length > 0 ||
    inStockOnly;

  return (
    <div className="flex flex-col lg:flex-row gap-10 lg:gap-14">
      {/* Sidebar Filters */}
      <aside className="w-full lg:w-60 flex-shrink-0">
        {/* Filter Heading */}
        <div className="flex items-center gap-2 mb-6 pb-4 border-b border-line">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-ink"
          >
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
          </svg>
          <h2 className="font-display text-[15px] font-semibold uppercase tracking-[0.1em] text-ink">
            Filters
          </h2>
        </div>

        <div className="space-y-2">
          {/* Availability Accordion */}
          <div className="border-b border-line/50 pb-2">
            <button
              onClick={() => toggleAccordion("availability")}
              className="flex w-full items-center justify-between py-2 text-left"
            >
              <h3 className="font-display text-[13px] font-semibold uppercase tracking-[0.1em] text-ink">
                Availability
              </h3>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className={`transition-transform duration-300 ${activeAccordion === "availability" ? "rotate-180" : ""}`}
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${activeAccordion === "availability" ? "max-h-40 opacity-100 mt-3 mb-2" : "max-h-0 opacity-0"}`}
            >
              <label className="flex items-center gap-3 cursor-pointer group">
                <div
                  className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${inStockOnly ? "bg-ink border-ink text-white" : "border-line group-hover:border-ink"}`}
                >
                  {inStockOnly && (
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  )}
                </div>
                <input
                  type="checkbox"
                  className="hidden"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                />
                <span className="text-[13px] text-muted group-hover:text-ink transition-colors">
                  In Stock Only
                </span>
              </label>
            </div>
          </div>

          {/* Brands Accordion */}
          {relevantBrands.length > 1 && (
            <div className="border-b border-line/50 pb-2">
              <button
                onClick={() => toggleAccordion("brand")}
                className="flex w-full items-center justify-between py-2 text-left"
              >
                <h3 className="font-display text-[13px] font-semibold uppercase tracking-[0.1em] text-ink">
                  Brand
                </h3>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className={`transition-transform duration-300 ${activeAccordion === "brand" ? "rotate-180" : ""}`}
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${activeAccordion === "brand" ? "max-h-60 opacity-100 mt-3 mb-2 overflow-y-auto custom-scrollbar" : "max-h-0 opacity-0"}`}
              >
                <div className="space-y-3 pr-2">
                  {relevantBrands.map((b) => (
                    <label
                      key={b.id}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <div
                        className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${selectedBrands.includes(b.id) ? "bg-ink border-ink text-white" : "border-line group-hover:border-ink"}`}
                      >
                        {selectedBrands.includes(b.id) && (
                          <svg
                            width="10"
                            height="10"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                          >
                            <path d="M20 6L9 17l-5-5" />
                          </svg>
                        )}
                      </div>
                      <input
                        type="checkbox"
                        className="hidden"
                        checked={selectedBrands.includes(b.id)}
                        onChange={() =>
                          toggleFilter(selectedBrands, "brand", b.id)
                        }
                      />
                      <span className="text-[13px] text-muted group-hover:text-ink transition-colors">
                        {b.name}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Gender Accordion */}
          <div className="border-b border-line/50 pb-2">
            <button
              onClick={() => toggleAccordion("gender")}
              className="flex w-full items-center justify-between py-2 text-left"
            >
              <h3 className="font-display text-[13px] font-semibold uppercase tracking-[0.1em] text-ink">
                Gender
              </h3>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className={`transition-transform duration-300 ${activeAccordion === "gender" ? "rotate-180" : ""}`}
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${activeAccordion === "gender" ? "max-h-40 opacity-100 mt-3 mb-2" : "max-h-0 opacity-0"}`}
            >
              <div className="space-y-3">
                {genderOptions.map((g) => (
                  <label
                    key={g.id}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <div
                      className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${selectedGenders.includes(g.id) ? "bg-ink border-ink text-white" : "border-line group-hover:border-ink"}`}
                    >
                      {selectedGenders.includes(g.id) && (
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                        >
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                      )}
                    </div>
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={selectedGenders.includes(g.id)}
                      onChange={() =>
                        toggleFilter(selectedGenders, "gender", g.id)
                      }
                    />
                    <span className="text-[13px] text-muted group-hover:text-ink transition-colors">
                      {g.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Category Accordion */}
          {relevantCollections.length > 1 && (
            <div className="border-b border-line/50 pb-2">
              <button
                onClick={() => toggleAccordion("category")}
                className="flex w-full items-center justify-between py-2 text-left"
              >
                <h3 className="font-display text-[13px] font-semibold uppercase tracking-[0.1em] text-ink">
                  Category
                </h3>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className={`transition-transform duration-300 ${activeAccordion === "category" ? "rotate-180" : ""}`}
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${activeAccordion === "category" ? "max-h-60 opacity-100 mt-3 mb-2 overflow-y-auto custom-scrollbar" : "max-h-0 opacity-0"}`}
              >
                <div className="space-y-3 pr-2">
                  {relevantCollections.map((c) => (
                    <label
                      key={c.handle}
                      className="flex items-start gap-3 cursor-pointer group"
                    >
                      <div
                        className={`w-4 h-4 mt-0.5 rounded border flex items-center justify-center flex-shrink-0 transition-colors ${selectedCategories.includes(c.handle) ? "bg-ink border-ink text-white" : "border-line group-hover:border-ink"}`}
                      >
                        {selectedCategories.includes(c.handle) && (
                          <svg
                            width="10"
                            height="10"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                          >
                            <path d="M20 6L9 17l-5-5" />
                          </svg>
                        )}
                      </div>
                      <input
                        type="checkbox"
                        className="hidden"
                        checked={selectedCategories.includes(c.handle)}
                        onChange={() =>
                          toggleFilter(
                            selectedCategories,
                            "category",
                            c.handle,
                          )
                        }
                      />
                      <span className="text-[13px] text-muted group-hover:text-ink transition-colors leading-[1.6]">
                        {c.title}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Fragrance Family Accordion */}
          {families.length > 1 && (
            <div className="border-b border-line/50 pb-2">
              <button
                onClick={() => toggleAccordion("family")}
                className="flex w-full items-center justify-between py-2 text-left"
              >
                <h3 className="font-display text-[13px] font-semibold uppercase tracking-[0.1em] text-ink">
                  Fragrance Family
                </h3>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className={`transition-transform duration-300 ${activeAccordion === "family" ? "rotate-180" : ""}`}
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${activeAccordion === "family" ? "max-h-60 opacity-100 mt-3 mb-2 overflow-y-auto custom-scrollbar" : "max-h-0 opacity-0"}`}
              >
                <div className="space-y-3 pr-2">
                  {families.map((f) => (
                    <label
                      key={f}
                      className="flex items-start gap-3 cursor-pointer group"
                    >
                      <div
                        className={`w-4 h-4 mt-0.5 rounded border flex items-center justify-center flex-shrink-0 transition-colors ${selectedFamilies.includes(f) ? "bg-ink border-ink text-white" : "border-line group-hover:border-ink"}`}
                      >
                        {selectedFamilies.includes(f) && (
                          <svg
                            width="10"
                            height="10"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                          >
                            <path d="M20 6L9 17l-5-5" />
                          </svg>
                        )}
                      </div>
                      <input
                        type="checkbox"
                        className="hidden"
                        checked={selectedFamilies.includes(f)}
                        onChange={() =>
                          toggleFilter(selectedFamilies, "family", f)
                        }
                      />
                      <span className="text-[13px] text-muted group-hover:text-ink transition-colors leading-[1.6]">
                        {f}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Product Grid */}
      <div className="flex-1">
        <div className="mb-6 pb-6 border-b border-line flex items-center justify-between">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted">
            Showing {filteredProducts.length}{" "}
            {filteredProducts.length === 1 ? "Product" : "Products"}
          </p>

          {hasActiveFilters && (
            <button
              onClick={() => {
                router.push(pathname, { scroll: false });
              }}
              className="flex items-center gap-1.5 rounded bg-ink px-4 py-2 text-[10px] font-medium uppercase tracking-[0.15em] text-white shadow-sm transition-all hover:bg-gold hover:shadow-md active:scale-95"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
              Clear Filters
            </button>
          )}
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4 gap-x-6 lg:gap-y-12">
            {filteredProducts.map((product, i) => (
              <Reveal key={product.slug} delay={(i % 4) * 50}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center border border-dashed border-line rounded-md">
            <h3 className="font-display text-lg text-ink">No products found</h3>
            <p className="text-[13px] text-muted mt-2">
              Try adjusting your filters to find what you're looking for.
            </p>
            <button
              onClick={() => {
                router.push(pathname, { scroll: false });
              }}
              className="mt-6 px-6 py-2.5 bg-ink text-white text-[11px] uppercase tracking-widest font-medium rounded hover:bg-gold transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
