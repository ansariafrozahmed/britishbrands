export type Collection = {
  handle: string;
  title: string;
  description: string;
  image: string;
};

export const collections: Collection[] = [
  {
    handle: "men",
    title: "Men's Fragrances",
    description: "Woody, spicy and fresh compositions, made to be worn by him.",
    image:
      "https://i.pinimg.com/736x/83/c6/ff/83c6ffc27c3b4de9c94b2ba0a91d111b.jpg",
  },
  {
    handle: "women",
    title: "Women's Fragrances",
    description: "Florals and warm gourmands, made to be worn by her.",
    image:
      "https://i.pinimg.com/736x/43/49/bf/4349bf181ce54973994ab47a49e13b8e.jpg",
  },
  {
    handle: "unisex",
    title: "Unisex Fragrances",
    description: "Fresh, versatile signatures for everyone.",
    image:
      "https://i.pinimg.com/736x/df/3b/e0/df3be09d9e9a1cb85e76d33124d73765.jpg",
  },
  {
    handle: "arabic-middle-eastern",
    title: "Arabic & Middle Eastern Fragrances",
    description: "Rich, opulent, and exotic scents rooted in tradition.",
    image:
      "https://i.pinimg.com/736x/7b/3f/83/7b3f83a3628ec18f1886be3fbdcc6309.jpg",
  },
  {
    handle: "oud-attar",
    title: "Oud & Attar",
    description: "Deep, resinous, and intoxicating elixirs.",
    image:
      "https://i.pinimg.com/1200x/c5/82/e2/c582e268f4340bbef321abf3f37973c7.jpg",
  },
  {
    handle: "gift-sets",
    title: "Gift Sets",
    description: "Thoughtfully curated gift sets for every occasion.",
    image:
      "https://i.pinimg.com/736x/bd/87/1c/bd871cc9d42a852f29410e03661b1a35.jpg",
  },
  {
    handle: "new-arrivals",
    title: "New Arrivals",
    description: "Fresh, versatile signatures for everyone.",
    image:
      "https://i.pinimg.com/236x/38/e7/e5/38e7e50573176145faa64566d32703ee.jpg",
  },
];

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

const INGREDIENTS =
  "Alcohol Denat., Fragrance (Parfum), Aqua (Water), Fragrance Oil.";

export const products: Product[] = [
  {
    slug: "magnificent",
    name: "Magnificent",
    tagline: "Bold. Warm. Unforgettable.",
    family: "Oriental Floral Fougère / Fresh Warm Floral",
    gender: "her",
    description:
      "Magnificent by British Brands is a grand and captivating Oriental Fougère fragrance. It opens with an invigorating burst of aromatic lavender, juicy mandarin orange, tart black currant, and crisp petitgrain. The heart reveals an elegant floral bouquet of orange blossom and jasmine layered with lush lavender, leading into a luxurious, warm base of Madagascan vanilla, velvety musk, grounding cedar, and rich ambergris.",
    price: 499,
    mrp: 999,
    sizes: ["50 ml"],
    longevity: "8–12 hours",
    sillage: "Moderate to Strong (Elegant, memorable floral-vanilla trail)",
    notes: {
      top: ["Lavender", "Mandarin Orange", "Black Currant", "Petitgrain"],
      middle: ["Lavender", "Orange Blossom", "Jasmine"],
      base: ["Madagascan Vanilla", "Musk", "Cedar", "Ambergris"],
    },
    ingredients: INGREDIENTS,
    howToUse: [
      {
        step: "Prep",
        text: "Apply directly to clean, dry, and moisturized skin—ideally after showering—to boost longevity.",
      },
      {
        step: "Target Pulse Points",
        text: "Spray 1–2 bursts onto pulse points such as your wrists, neck, behind ears, and inner elbows.",
      },
      {
        step: "Do Not Rub",
        text: "Allow the fragrance to dry down naturally; rubbing wrists together crushes the delicate top floral notes.",
      },
      {
        step: "Clothing Application",
        text: "Spray lightly on scarves, jackets, or hair from a distance of 6–8 inches for an intensified scent trail.",
      },
    ],
    specs: {
      formulation: "Eau de Parfum (EDP Spray)",
      targetGender: "Unisex / Women",
      volume: "50 ml / 1.7 fl. oz.",
      idealWear:
        "Spring/Fall seasons, office wear, evening outings, or formal events",
      packaging: "Glass Spray Bottle with Black Cap",
      storage:
        "Store in a cool, dry place away from direct sunlight and heat exposure.",
    },
    collections: ["men", "women", "unisex"],
    image:
      "https://i.pinimg.com/736x/f8/67/60/f86760d660410926a0ad04a27c0a3a37.jpg",
    brand: "amouage",
    inStock: true,
  },
  {
    slug: "wanderlust",
    name: "Wanderlust",
    tagline: "Pack light. Smell incredible.",
    family: "Citrus Aromatic / Fresh Spicy",
    gender: "unisex",
    description:
      "Wanderlust by British Brands is a vibrant Citrus Aromatic fragrance crafted for both men and women. Opening with a bright splash of Mediterranean citrus, it transitions into a warm, invigorating heart of exotic spices and fresh orange blossom before settling into a sophisticated, smoky-woody tea base.",
    price: 499,
    mrp: 999,
    sizes: ["50 ml"],
    longevity: "8–12 hours",
    sillage: "Moderate to Strong (Invigorating fresh trail)",
    notes: {
      top: ["Citron", "Calabrian Bergamot", "Sicilian Orange"],
      middle: ["Tunisian Neroli", "Nigerian Ginger", "Ceylon Cinnamon"],
      base: ["Chinese Black Tea", "Ambroxan", "Guaiac Wood", "Olibanum"],
    },
    ingredients: INGREDIENTS,
    howToUse: [
      {
        step: "Prep",
        text: "Spray onto clean, moisturized skin (apply right after a shower for optimal absorption).",
      },
      {
        step: "Target Pulse Points",
        text: "Apply 1–2 spritzes to pulse points such as wrists, sides of the neck, and inner elbows.",
      },
      {
        step: "Do Not Rub",
        text: "Let the fragrance dry down naturally on the skin to preserve the delicate citrus top notes.",
      },
      {
        step: "Application Distance",
        text: "Hold the spray bottle 6–8 inches away from your skin or clothing when applying.",
      },
    ],
    specs: {
      formulation: "Eau de Parfum (EDP Spray)",
      targetGender: "Unisex",
      volume: "50 ml / 1.7 fl. oz.",
      idealWear: "Summer/Spring seasons, daily casual wear, office, or travel",
      packaging: "Glass Spray Bottle with Black Cap",
      storage: "Store in a cool, dry place away from direct heat and sunlight.",
    },
    collections: ["men", "women", "unisex"],
    image:
      "https://i.pinimg.com/736x/03/e3/bc/03e3bca87049881dbfb65e5d5630c219.jpg",
    brand: "xerjoff",
    inStock: true,
  },
  {
    slug: "morning-drift",
    name: "Morning Drift",
    tagline: "Your 7 AM in a bottle",
    family: "Woody Citrus Spicy / Leather Vetiver",
    gender: "him",
    description:
      "Morning Drift offers a luminous opening full of sparkling citruses and energy. Bergamot and grapefruit provide a strong and dynamic beginning in the opening notes. A heart of the composition offers spicy shades of nutmeg combined with leather, while a base features elegant woody accords of cedar and vetiver.",
    price: 499,
    mrp: 999,
    sizes: ["50 ml"],
    longevity: "8–12 hours",
    sillage: "Strong to Moderate (Dynamic citrus-woody trail)",
    notes: {
      top: ["Grapefruit", "Bergamot"],
      middle: ["Nutmeg", "Leather"],
      base: ["Vetiver", "Virginia Cedar", "Ambergris"],
    },
    ingredients: INGREDIENTS,
    howToUse: [
      {
        step: "Prep",
        text: "Apply directly to clean, dry, and moisturized skin right after a shower for max retention.",
      },
      {
        step: "Target Pulse Points",
        text: "Spray 1–2 bursts onto warm pulse points like your wrists, neck, behind ears, and chest.",
      },
      {
        step: "Do Not Rub",
        text: "Allow the liquid to dry down naturally on the skin; rubbing breaks down the crisp citrus top notes.",
      },
      {
        step: "Clothing Application",
        text: "Spray lightly on shirts or suit jackets from a distance of 6–8 inches for an extended scent trail throughout the day.",
      },
    ],
    specs: {
      formulation: "Eau de Parfum (EDP Spray)",
      targetGender: "Male",
      volume: "50 ml / 1.7 fl. oz.",
      idealWear:
        "Spring/Summer seasons, morning/daytime wear, office, business meetings, or daily active wear",
      packaging: "Glass Spray Bottle with Black Cap",
      storage:
        "Store in a cool, dry place away from direct sunlight and heat exposure.",
    },
    collections: ["men", "women", "unisex"],
    image:
      "https://i.pinimg.com/736x/38/05/19/380519bece2c432d809bde31263232fc.jpg",
    brand: "parfums-de-marly",
    inStock: true,
  },
  {
    slug: "blush-bloom",
    name: "Blush Bloom",
    tagline: "Soft petals, sharp memory",
    family: "Floral Fruity Gourmand / Warm Solar Floral",
    gender: "her",
    description:
      "A joyful floral signature, the scent is built around the Gardenia flower, admired since the dawn of time for its splendour and said to be used in elixirs and magical potions. Taking inspiration from this legend and the idea of its mystical power, the gorgeous White Gardenia note is blended with solar Jasmine Grandiflorum Absolute. The modern floral signature is introduced by a cheerful Pear Blossom accord which encourages wearers to burst with joy, while a touch of Brown Sugar accord adds a delicate sweetness to its sillage.",
    price: 499,
    mrp: 999,
    sizes: ["50 ml"],
    longevity: "8–12 hours",
    sillage: "Moderate to Strong (Sweet, uplifting floral trail)",
    notes: {
      top: ["Pear Blossom", "Red Berries", "Italian Mandarin"],
      middle: ["Gardenia", "Jasmine", "Frangipani"],
      base: ["Brown Sugar", "Patchouli"],
    },
    ingredients: INGREDIENTS,
    howToUse: [
      {
        step: "Prep",
        text: "Apply directly to clean, dry, and moisturized skin right after a shower for max retention.",
      },
      {
        step: "Target Pulse Points",
        text: "Spray 1–2 bursts onto warm pulse points like your wrists, neck, behind ears, and inner elbows.",
      },
      {
        step: "Do Not Rub",
        text: "Allow the liquid to dry down naturally on the skin; rubbing breaks down the delicate floral top notes.",
      },
      {
        step: "Clothing Application",
        text: "Spray lightly on clothes or hair from a distance of 6–8 inches for an enhanced scent trail.",
      },
    ],
    specs: {
      formulation: "Eau de Parfum (EDP Spray)",
      targetGender: "Female",
      volume: "50 ml / 1.7 fl. oz.",
      idealWear:
        "Spring/Summer seasons, daily daytime wear, brunches, or romantic outings",
      packaging: "Glass Spray Bottle with Black Cap",
      storage:
        "Store in a cool, dry place away from direct sunlight and heat exposure.",
    },
    collections: ["men", "women", "unisex"],
    image:
      "https://i.pinimg.com/736x/d3/c5/3c/d3c53cd8f76cb435a7d9ad4848bce715.jpg",
    brand: "initio",
    inStock: false,
  },
  // {
  //   slug: "magnificent",
  //   name: "Magnificent",
  //   tagline: "Bold. Warm. Unforgettable.",
  //   family: "Oriental Floral Fougère / Fresh Warm Floral",
  //   gender: "her",
  //   description:
  //     "Magnificent by British Brands is a grand and captivating Oriental Fougère fragrance. It opens with an invigorating burst of aromatic lavender, juicy mandarin orange, tart black currant, and crisp petitgrain. The heart reveals an elegant floral bouquet of orange blossom and jasmine layered with lush lavender, leading into a luxurious, warm base of Madagascan vanilla, velvety musk, grounding cedar, and rich ambergris.",
  //   price: 499,
  //   mrp: 999,
  //   sizes: ["50 ml"],
  //   longevity: "8–12 hours",
  //   sillage: "Moderate to Strong (Elegant, memorable floral-vanilla trail)",
  //   notes: {
  //     top: ["Lavender", "Mandarin Orange", "Black Currant", "Petitgrain"],
  //     middle: ["Lavender", "Orange Blossom", "Jasmine"],
  //     base: ["Madagascan Vanilla", "Musk", "Cedar", "Ambergris"],
  //   },
  //   ingredients: INGREDIENTS,
  //   howToUse: [
  //     {
  //       step: "Prep",
  //       text: "Apply directly to clean, dry, and moisturized skin—ideally after showering—to boost longevity.",
  //     },
  //     {
  //       step: "Target Pulse Points",
  //       text: "Spray 1–2 bursts onto pulse points such as your wrists, neck, behind ears, and inner elbows.",
  //     },
  //     {
  //       step: "Do Not Rub",
  //       text: "Allow the fragrance to dry down naturally; rubbing wrists together crushes the delicate top floral notes.",
  //     },
  //     {
  //       step: "Clothing Application",
  //       text: "Spray lightly on scarves, jackets, or hair from a distance of 6–8 inches for an intensified scent trail.",
  //     },
  //   ],
  //   specs: {
  //     formulation: "Eau de Parfum (EDP Spray)",
  //     targetGender: "Unisex / Women",
  //     volume: "50 ml / 1.7 fl. oz.",
  //     idealWear:
  //       "Spring/Fall seasons, office wear, evening outings, or formal events",
  //     packaging: "Glass Spray Bottle with Black Cap",
  //     storage:
  //       "Store in a cool, dry place away from direct sunlight and heat exposure.",
  //   },
  //   collections: ["men", "women", "unisex"],
  //   image:
  //     "https://i.pinimg.com/736x/f8/67/60/f86760d660410926a0ad04a27c0a3a37.jpg",
  //   brand: "amouage",
  //   inStock: true,
  // },
];

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
  const scored = products
    .filter((p) => p.slug !== product.slug)
    .map((p) => ({
      p,
      score:
        p.collections.filter((c) => product.collections.includes(c)).length +
        (p.gender === product.gender ? 1 : 0),
    }))
    .sort((a, b) => b.score - a.score);
  return scored.slice(0, count).map((s) => s.p);
}

export function formatPrice(value: number): string {
  return `${value.toLocaleString("en-US")} LYD`;
}

export function discountPercent(product: Product): number {
  return Math.round(((product.mrp - product.price) / product.mrp) * 100);
}
