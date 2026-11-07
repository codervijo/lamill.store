import { BookOpen, type LucideIcon } from "lucide-react";

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
  slug: string; // detail page: /kids/bible-coloring-pages/<slug>/
  title: string;
  passage: string; // Bible reference the picture illustrates
  blurb: string;
  preview: string; // image path shown as preview
  file?: string; // download path; omit to show "coming soon"
  width: number;
  height: number;
};

export const coloringPagePath = (p: Printable) => `/kids/bible-coloring-pages/${p.slug}/`;

export type Collection = {
  id: string;
  title: string;
  blurb: string;
  icon: LucideIcon;
  printables: Printable[];
};

export const collections: Collection[] = [
  {
    id: "bible",
    title: "Bible Adventures",
    blurb: "Favorite Bible stories to color: Noah’s Ark, David and Goliath, Jonah and the Big Fish.",
    icon: BookOpen,
    printables: [
      {
        id: "noah", slug: "noahs-ark", title: "Noah’s Ark Coloring Page", passage: "Genesis 6–9",
        blurb: "Noah’s ark floating on the water, with a rainbow overhead.",
        preview: "/printables/noahs-ark.svg", file: "/printables/noahs-ark.svg", width: 850, height: 1100,
      },
      {
        id: "david", slug: "david-and-goliath", title: "David and Goliath Coloring Page", passage: "1 Samuel 17",
        blurb: "Young David with his sling, facing the giant Goliath.",
        preview: "/printables/david-and-goliath.png", file: "/printables/david-and-goliath.png", width: 1152, height: 1536,
      },
      {
        id: "jonah", slug: "jonah-and-the-big-fish", title: "Jonah and the Big Fish Coloring Page", passage: "Jonah 1–2",
        blurb: "Jonah inside the big fish, deep under the sea.",
        preview: "/printables/jonah-and-the-big-fish.png", file: "/printables/jonah-and-the-big-fish.png", width: 1152, height: 1536,
      },
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
