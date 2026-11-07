/**
 * LaMill Store — single source of truth for storefronts, collections,
 * Etsy shops and physical goods. Edit this file to add or change content.
 */
const kidsImg = "/images/kids.jpg";
const shopsImg = "/images/shops.jpg";
const goodsImg = "/images/goods.jpg";

export type Storefront = {
  id: string;
  title: string;
  path: "/kids" | "/shops" | "/goods";
  description: string;
  cta: string;
  image: string;
};

export const storefronts: Storefront[] = [
  {
    id: "kids",
    title: "Kids’ Activities",
    path: "/kids",
    description: "Free printable coloring pages, mazes and quiet-time fun for little ones.",
    cta: "Explore activities",
    image: kidsImg,
  },
  {
    id: "shops",
    title: "Etsy Shops",
    path: "/shops",
    description: "Visit our family of LaMill brands on Etsy — printables, stationery and gifts.",
    cta: "Browse our shops",
    image: shopsImg,
  },
  {
    id: "goods",
    title: "Physical Goods",
    path: "/goods",
    description: "Printed activity books and party kits, made by us and shipped to you.",
    cta: "See the catalog",
    image: goodsImg,
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
    blurb: "Noah’s ark, David’s sling and other favorite stories to color.",
    emoji: "🌈",
    printables: [
      { id: "noah", title: "Noah’s Ark Coloring Page", preview: "/printables/noahs-ark.svg", file: "/printables/noahs-ark.svg" },
      { id: "david", title: "David & Goliath", preview: "/printables/noahs-ark.svg" },
    ],
  },
  {
    id: "dino-space",
    title: "Dinosaurs & Space",
    blurb: "Roaring dinos and rockets headed for the stars.",
    emoji: "🦕",
    printables: [
      { id: "dino", title: "Friendly Dino Coloring Page", preview: "/printables/dino.svg", file: "/printables/dino.svg" },
      { id: "rocket", title: "Rocket to the Moon", preview: "/printables/rocket.svg", file: "/printables/rocket.svg" },
    ],
  },
  {
    id: "trucks-trains",
    title: "Trucks & Trains",
    blurb: "Big wheels, long tracks and busy builders.",
    emoji: "🚂",
    printables: [
      { id: "train", title: "Choo-Choo Train", preview: "/printables/train.svg", file: "/printables/train.svg" },
    ],
  },
  {
    id: "travel",
    title: "Travel & Quiet Time",
    blurb: "Mazes and calm activities for car rides and rest time.",
    emoji: "🧭",
    printables: [
      { id: "maze", title: "Road Trip Maze", preview: "/printables/maze.svg", file: "/printables/maze.svg" },
    ],
  },
];

/** The free printable featured on the homepage. */
export const featuredPrintable = { collectionId: "dino-space", printableId: "dino" };

export type EtsyShop = {
  id: string;
  name: string;
  intro: string;
  logo?: string;
  url?: string; // leave empty to hide the "Shop on Etsy" button
  previews: { title: string; image: string }[];
};

export const etsyShops: EtsyShop[] = [
  {
    id: "lamill-printables",
    name: "LaMill Printables",
    intro: "Digital planners, kids’ activity packs and printable decor.",
    url: "", // e.g. "https://www.etsy.com/shop/YourShopName"
    previews: [
      { title: "Weekly planner", image: shopsImg },
      { title: "Kids activity pack", image: kidsImg },
    ],
  },
  {
    id: "lamill-gifts",
    name: "LaMill Gifts",
    intro: "Thoughtful handmade tags, cards and keepsakes.",
    url: "",
    previews: [{ title: "Gift tags", image: shopsImg }],
  },
];

export type Product = {
  id: string;
  name: string;
  description: string;
  image: string;
  price?: number; // USD
  status: "available" | "sold-out" | "coming-soon";
};

export const products: Product[] = [
  {
    id: "activity-book",
    name: "Space Explorer Activity Book",
    description: "A spiral-bound book of 40 coloring pages, mazes and puzzles.",
    image: goodsImg,
    price: 14,
    status: "coming-soon",
  },
  {
    id: "party-kit",
    name: "Outer Space Party Kit",
    description: "Masks, stickers, crayons and activity sheets for 8 kids.",
    image: goodsImg,
    price: 29,
    status: "coming-soon",
  },
];

export const navLinks = [
  { to: "/", label: "Home" },
  ...storefronts.map((s) => ({ to: s.path, label: s.title })),
] as const;
