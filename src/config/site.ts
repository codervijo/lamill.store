/**
 * LaMill Store — single source of truth for storefronts, collections,
 * Etsy shops and physical goods. Edit this file to add or change content.
 */
export type Storefront = {
  id: string;
  title: string;
  path: "/kids" | "/shops" | "/goods";
  description: string;
  cta: string;
  image?: string; // omit for coming-soon storefronts
  status: "live" | "coming-soon";
};

export const storefronts: Storefront[] = [
  {
    id: "kids",
    title: "Kids’ Activities",
    path: "/kids",
    description: "Free printable Bible coloring pages for kids. Print at home, no sign-up needed.",
    cta: "Explore activities",
    image: "/printables/noahs-ark.svg",
    status: "live",
  },
  {
    id: "shops",
    title: "Etsy Shop",
    path: "/shops",
    description: "Our Etsy shop is coming soon.",
    cta: "Coming soon",
    status: "coming-soon",
  },
  {
    id: "goods",
    title: "Physical Goods",
    path: "/goods",
    description: "Our physical goods store is coming soon.",
    cta: "Coming soon",
    status: "coming-soon",
  },
];

export type Printable = {
  id: string;
  title: string;
  preview: string; // image path shown as preview
  file?: string; // download path; omit to show "coming soon"
};

export type Collection = {
  id: string;
  title: string;
  blurb: string;
  emoji: string;
  printables: Printable[];
};

export const collections: Collection[] = [
  {
    id: "bible",
    title: "Bible Adventures",
    blurb: "Favorite Bible stories to color, starting with Noah’s Ark.",
    emoji: "🌈",
    printables: [
      { id: "noah", title: "Noah’s Ark Coloring Page", preview: "/printables/noahs-ark.svg", file: "/printables/noahs-ark.svg" },
    ],
  },
];

/** The free printable featured on the homepage. */
export const featuredPrintable = { collectionId: "bible", printableId: "noah" };

export type EtsyShop = {
  id: string;
  name: string;
  intro: string;
  logo?: string;
  url?: string; // leave empty to hide the "Shop on Etsy" button
  previews: { title: string; image: string }[];
};

// Empty until the Etsy shop launches — /shops/ shows "coming soon".
export const etsyShops: EtsyShop[] = [];

export type Product = {
  id: string;
  name: string;
  description: string;
  image: string;
  price?: number; // USD
  status: "available" | "sold-out" | "coming-soon";
};

// Empty until the physical goods store launches — /goods/ shows "coming soon".
export const products: Product[] = [];

export const navLinks = [
  { to: "/", label: "Home" },
  ...storefronts.map((s) => ({ to: s.path, label: s.title })),
] as const;
