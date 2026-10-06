import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.SITE_URL || "https://britishbrandsly.com";
  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL ||
    "https://backend.britishbrandsly.com/wp-json";

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/brands`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/collections`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/partner-with-us`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/store`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/wishlist`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];

  let collectionRoutes: MetadataRoute.Sitemap = [];
  try {
    const res = await fetch(`${apiUrl}/custom/v1/getAllCategories`, {
      next: { revalidate: 60 },
    });
    const data = await res.json();
    if (data.success && data.categories) {
      collectionRoutes = data.categories.map((c: any) => ({
        url: `${baseUrl}/collections/${c.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      }));
    }
  } catch (error) {
    console.error("Sitemap: Error fetching categories", error);
  }

  let productRoutes: MetadataRoute.Sitemap = [];
  try {
    const res = await fetch(`${apiUrl}/custom/v1/getProducts`, {
      next: { revalidate: 60 },
    });
    const data = await res.json();
    if (data.success && data.products) {
      productRoutes = data.products.map((p: any) => ({
        url: `${baseUrl}/products/${p.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.7,
      }));
    }
  } catch (error) {
    console.error("Sitemap: Error fetching products", error);
  }

  let brandRoutes: MetadataRoute.Sitemap = [];
  try {
    const res = await fetch(`${apiUrl}/custom/v1/getAllBrands`, {
      next: { revalidate: 60 },
    });
    const data = await res.json();
    if (data.success && data.brands) {
      brandRoutes = data.brands.map((b: any) => ({
        url: `${baseUrl}/brands/${b.slug || b.id}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.7,
      }));
    }
  } catch (error) {
    console.error("Sitemap: Error fetching brands", error);
  }

  return [...staticRoutes, ...collectionRoutes, ...brandRoutes, ...productRoutes];
}
