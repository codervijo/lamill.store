import { BookOpen, Star, type LucideIcon } from "lucide-react";

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
    description: "Free printable coloring pages for kids: Bible stories, Thanksgiving, Christmas, winter, dogs, dragons and monster trucks. Print at home, no sign-up needed.",
    cta: "Explore activities",
    image: "/printables/dog-puppy-with-ball.webp",
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
    blurb: "Favorite Bible stories to color, from Creation and Noah’s Ark to the life of Jesus and the empty tomb.",
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
        id: "temple", slug: "jesus-as-a-boy-in-the-temple", title: "The Boy Jesus in the Temple Coloring Page", passage: "Luke 2",
        blurb: "Twelve-year-old Jesus sits in the temple, listening to the teachers and asking them questions.",
        preview: "/printables/jesus-as-a-boy-in-the-temple.webp", file: "/printables/jesus-as-a-boy-in-the-temple.png", pdf: "/printables/jesus-as-a-boy-in-the-temple.pdf", width: 1024, height: 1536,
      },
      {
        id: "baptism", slug: "jesus-is-baptized", title: "Jesus Is Baptized Coloring Page", passage: "Matthew 3",
        blurb: "John baptizes Jesus in the Jordan River as a dove comes down from heaven.",
        preview: "/printables/jesus-is-baptized.webp", file: "/printables/jesus-is-baptized.png", pdf: "/printables/jesus-is-baptized.pdf", width: 1024, height: 1536,
      },
      {
        id: "storm", slug: "jesus-calms-the-storm", title: "Jesus Calms the Storm Coloring Page", passage: "Mark 4",
        blurb: "Jesus stands in the fishing boat and calms the wind and waves while his friends hold on.",
        preview: "/printables/jesus-calms-the-storm.webp", file: "/printables/jesus-calms-the-storm.png", pdf: "/printables/jesus-calms-the-storm.pdf", width: 1024, height: 1536,
      },
      {
        id: "loaves", slug: "jesus-feeds-the-five-thousand", title: "Jesus Feeds the 5,000 Coloring Page", passage: "John 6",
        blurb: "Jesus holds up a basket of bread and fish beside the boy who shared his lunch, as the crowd sits on the grass.",
        preview: "/printables/jesus-feeds-the-five-thousand.webp", file: "/printables/jesus-feeds-the-five-thousand.png", pdf: "/printables/jesus-feeds-the-five-thousand.pdf", width: 1024, height: 1536,
      },
      {
        id: "water", slug: "jesus-walks-on-water", title: "Jesus Walks on Water Coloring Page", passage: "Matthew 14",
        blurb: "Jesus walks on the waves at night and reaches out to Peter as he steps from the boat.",
        preview: "/printables/jesus-walks-on-water.webp", file: "/printables/jesus-walks-on-water.png", pdf: "/printables/jesus-walks-on-water.pdf", width: 1024, height: 1536,
      },
      {
        id: "samaritan", slug: "the-good-samaritan", title: "Good Samaritan Coloring Page", passage: "Luke 10",
        blurb: "A kind traveler kneels by the road to bandage a hurt man, with his donkey waiting nearby.",
        preview: "/printables/the-good-samaritan.webp", file: "/printables/the-good-samaritan.png", pdf: "/printables/the-good-samaritan.pdf", width: 1024, height: 1536,
      },
      {
        id: "lostsheep", slug: "the-lost-sheep", title: "The Lost Sheep Coloring Page", passage: "Luke 15",
        blurb: "A happy shepherd carries the lost lamb home on his shoulders while the rest of the flock grazes.",
        preview: "/printables/the-lost-sheep.webp", file: "/printables/the-lost-sheep.png", pdf: "/printables/the-lost-sheep.pdf", width: 1024, height: 1536,
      },
      {
        id: "children", slug: "jesus-blesses-the-children", title: "Jesus Blesses the Children Coloring Page", passage: "Mark 10",
        blurb: "Jesus welcomes the children, with one little boy sitting on his lap.",
        preview: "/printables/jesus-blesses-the-children.webp", file: "/printables/jesus-blesses-the-children.png", pdf: "/printables/jesus-blesses-the-children.pdf", width: 1024, height: 1536,
      },
      {
        id: "blindman", slug: "jesus-heals-the-blind-man", title: "Jesus Heals the Blind Man Coloring Page", passage: "Mark 10",
        blurb: "Jesus gently touches the eyes of a blind man sitting by the road with his walking stick.",
        preview: "/printables/jesus-heals-the-blind-man.webp", file: "/printables/jesus-heals-the-blind-man.png", pdf: "/printables/jesus-heals-the-blind-man.pdf", width: 1024, height: 1536,
      },
      {
        id: "zacchaeus", slug: "zacchaeus-in-the-tree", title: "Zacchaeus in the Tree Coloring Page", passage: "Luke 19",
        blurb: "Zacchaeus sits up in a sycamore tree as Jesus looks up and calls him down.",
        preview: "/printables/zacchaeus-in-the-tree.webp", file: "/printables/zacchaeus-in-the-tree.png", pdf: "/printables/zacchaeus-in-the-tree.pdf", width: 1024, height: 1536,
      },
      {
        id: "palms", slug: "jesus-rides-into-jerusalem", title: "Jesus Rides into Jerusalem Coloring Page", passage: "Matthew 21",
        blurb: "Jesus rides a donkey through the city gate while people wave palm branches and spread cloaks on the road.",
        preview: "/printables/jesus-rides-into-jerusalem.webp", file: "/printables/jesus-rides-into-jerusalem.png", pdf: "/printables/jesus-rides-into-jerusalem.pdf", width: 1024, height: 1536,
      },
      {
        id: "tomb", slug: "the-empty-tomb", title: "The Empty Tomb Coloring Page", passage: "Matthew 28",
        blurb: "The stone is rolled away and an angel sits by the empty tomb as the women arrive at sunrise.",
        preview: "/printables/the-empty-tomb.webp", file: "/printables/the-empty-tomb.png", pdf: "/printables/the-empty-tomb.pdf", width: 1024, height: 1536,
      },
    ],
  },
  {
    id: "christmas",
    title: "The Christmas Story",
    blurb: "Christmas Bible coloring pages, from the angel’s visit to Mary to the wise men’s gifts.",
    icon: Star,
    printables: [
      {
        id: "gabriel", slug: "the-angel-visits-mary", title: "The Angel Visits Mary Coloring Page", passage: "Luke 1",
        blurb: "The angel Gabriel brings Mary good news as she kneels to listen.",
        preview: "/printables/the-angel-visits-mary.webp", file: "/printables/the-angel-visits-mary.png", pdf: "/printables/the-angel-visits-mary.pdf", width: 1024, height: 1536,
      },
      {
        id: "bethlehem", slug: "the-journey-to-bethlehem", title: "Journey to Bethlehem Coloring Page", passage: "Luke 2",
        blurb: "Mary rides a donkey and Joseph walks beside her on the road to Bethlehem under the stars.",
        preview: "/printables/the-journey-to-bethlehem.webp", file: "/printables/the-journey-to-bethlehem.png", pdf: "/printables/the-journey-to-bethlehem.pdf", width: 1024, height: 1536,
      },
      {
        id: "nativity", slug: "the-nativity", title: "Nativity Coloring Page", passage: "Luke 2",
        blurb: "Baby Jesus in the manger with Mary and Joseph, a donkey, a lamb and the bright star above the stable.",
        preview: "/printables/the-nativity.webp", file: "/printables/the-nativity.png", pdf: "/printables/the-nativity.pdf", width: 1024, height: 1536,
      },
      {
        id: "shepherds", slug: "the-shepherds-and-the-angels", title: "Shepherds and the Angels Coloring Page", passage: "Luke 2",
        blurb: "Shepherds watching their sheep at night look up to see angels in the starry sky.",
        preview: "/printables/the-shepherds-and-the-angels.webp", file: "/printables/the-shepherds-and-the-angels.png", pdf: "/printables/the-shepherds-and-the-angels.pdf", width: 1024, height: 1536,
      },
      {
        id: "star", slug: "the-wise-men-follow-the-star", title: "Wise Men Follow the Star Coloring Page", passage: "Matthew 2",
        blurb: "Three wise men ride their camels toward Bethlehem, following the bright star.",
        preview: "/printables/the-wise-men-follow-the-star.webp", file: "/printables/the-wise-men-follow-the-star.png", pdf: "/printables/the-wise-men-follow-the-star.pdf", width: 1024, height: 1536,
      },
      {
        id: "gifts", slug: "the-wise-men-bring-gifts", title: "Wise Men Bring Gifts Coloring Page", passage: "Matthew 2",
        blurb: "The wise men kneel and offer their gifts to young Jesus on Mary’s lap.",
        preview: "/printables/the-wise-men-bring-gifts.webp", file: "/printables/the-wise-men-bring-gifts.png", pdf: "/printables/the-wise-men-bring-gifts.pdf", width: 1024, height: 1536,
      },
    ],
  },
];

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
