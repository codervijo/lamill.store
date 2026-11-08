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
  file?: string; // full-resolution image download; omit to show "coming soon"
  pdf?: string; // print-ready Letter PDF (scripts/printable_pdfs.py)
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
        id: "creation", slug: "creation", title: "Creation Coloring Page", passage: "Genesis 1",
        blurb: "God makes the world: a smiling sun and moon, stars, trees, flowers, fish, birds, an elephant, a giraffe and a rabbit.",
        preview: "/printables/creation.webp", file: "/printables/creation.png", pdf: "/printables/creation.pdf", width: 1024, height: 1536,
      },
      {
        id: "noah", slug: "noahs-ark", title: "Noah’s Ark Coloring Page", passage: "Genesis 6–9",
        blurb: "Noah’s ark floating on the water, with a rainbow overhead.",
        preview: "/printables/noahs-ark.svg", file: "/printables/noahs-ark.svg", pdf: "/printables/noahs-ark.pdf", width: 850, height: 1100,
      },
      {
        id: "moses", slug: "moses-parting-the-red-sea", title: "Moses Parting the Red Sea Coloring Page", passage: "Exodus 14",
        blurb: "Moses raises his staff as the sea parts, and families walk through on dry ground with their sheep.",
        preview: "/printables/moses-parting-the-red-sea.webp", file: "/printables/moses-parting-the-red-sea.png", pdf: "/printables/moses-parting-the-red-sea.pdf", width: 1024, height: 1536,
      },
      {
        id: "david", slug: "david-and-goliath", title: "David and Goliath Coloring Page", passage: "1 Samuel 17",
        blurb: "Young David with his sling, facing the giant Goliath.",
        preview: "/printables/david-and-goliath.png", file: "/printables/david-and-goliath.png", pdf: "/printables/david-and-goliath.pdf", width: 1152, height: 1536,
      },
      {
        id: "daniel", slug: "daniel-and-the-lions", title: "Daniel and the Lions Coloring Page", passage: "Daniel 6",
        blurb: "Daniel sits safe in the lions’ den while the lions sleep and an angel stands beside him.",
        preview: "/printables/daniel-and-the-lions.webp", file: "/printables/daniel-and-the-lions.png", pdf: "/printables/daniel-and-the-lions.pdf", width: 1024, height: 1536,
      },
      {
        id: "jonah", slug: "jonah-and-the-big-fish", title: "Jonah and the Big Fish Coloring Page", passage: "Jonah 1–2",
        blurb: "Jonah inside the big fish, deep under the sea.",
        preview: "/printables/jonah-and-the-big-fish.png", file: "/printables/jonah-and-the-big-fish.png", pdf: "/printables/jonah-and-the-big-fish.pdf", width: 1152, height: 1536,
      },
      {
        id: "nativity", slug: "the-nativity", title: "Nativity Coloring Page", passage: "Luke 2",
        blurb: "Baby Jesus in the manger with Mary and Joseph, a donkey, a lamb and the bright star above the stable.",
        preview: "/printables/the-nativity.webp", file: "/printables/the-nativity.png", pdf: "/printables/the-nativity.pdf", width: 1024, height: 1536,
      },
      {
        id: "storm", slug: "jesus-calms-the-storm", title: "Jesus Calms the Storm Coloring Page", passage: "Mark 4",
        blurb: "Jesus stands in the fishing boat and calms the wind and waves while his friends hold on.",
        preview: "/printables/jesus-calms-the-storm.webp", file: "/printables/jesus-calms-the-storm.png", pdf: "/printables/jesus-calms-the-storm.pdf", width: 1024, height: 1536,
      },
      {
        id: "samaritan", slug: "the-good-samaritan", title: "Good Samaritan Coloring Page", passage: "Luke 10",
        blurb: "A kind traveler kneels by the road to bandage a hurt man, with his donkey waiting nearby.",
        preview: "/printables/the-good-samaritan.webp", file: "/printables/the-good-samaritan.png", pdf: "/printables/the-good-samaritan.pdf", width: 1024, height: 1536,
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
