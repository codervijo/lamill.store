import { Baby, BookOpen, Library, Quote, Star, Users, type LucideIcon } from "lucide-react";

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
    description: "Free printable coloring pages for kids: Bible stories, holidays, princesses, ballerinas, flowers, music, dogs, dragons and monster trucks. No sign-up.",
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

// Image alt for Bible pages — same wording rule as designAlt in coloring.ts.
export const printableAlt = (p: Printable) => `${p.title} for kids, black-and-white outline drawing: ${p.blurb}`;

export const coloringPagePath = (p: Printable) => `/kids/bible-coloring-pages/${p.slug}/`;

export type Collection = {
  id: string;
  title: string;
  hub?: string; // v1.E sub-hub page for this collection, e.g. /kids/bible-coloring-pages/verses/
  set?: string; // print-all PDF stem (src/data/print-sets.json key), e.g. bible-verse-coloring-pages
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
  {
    id: "verses",
    set: "bible-verse-coloring-pages",
    title: "Bible Verses",
    hub: "/kids/bible-coloring-pages/verses/",
    blurb: "Six well-loved verses in big outline letters to color, each with a picture.",
    icon: Quote,
    printables: [
      {
        id: "john316", slug: "john-3-16", title: "John 3:16 Coloring Page", passage: "John 3:16",
        blurb: "“For God so loved the world” in outline letters, under a picture of children holding hands around the globe.",
        preview: "/printables/verse-john-3-16.webp", file: "/printables/verse-john-3-16.png", pdf: "/printables/verse-john-3-16.pdf", width: 1024, height: 1536,
      },
      {
        id: "psalm23", slug: "psalm-23", title: "Psalm 23 Coloring Page", passage: "Psalm 23:1",
        blurb: "“The LORD is my shepherd” in outline letters, under a shepherd with his sheep beside still water.",
        preview: "/printables/verse-psalm-23-1.webp", file: "/printables/verse-psalm-23-1.png", pdf: "/printables/verse-psalm-23-1.pdf", width: 1024, height: 1536,
      },
      {
        id: "fruit", slug: "fruit-of-the-spirit", title: "Fruit of the Spirit Coloring Page", passage: "Galatians 5:22–23",
        blurb: "The nine fruit of the Spirit in outline letters, under a basket full of nine different fruits.",
        preview: "/printables/verse-galatians-5-22.webp", file: "/printables/verse-galatians-5-22.png", pdf: "/printables/verse-galatians-5-22.pdf", width: 1024, height: 1536,
      },
      {
        id: "armor", slug: "armor-of-god", title: "Armor of God Coloring Page", passage: "Ephesians 6:11",
        blurb: "“Put on the whole armor of God” in outline letters, under a child wearing a helmet, breastplate, belt, shield and sword.",
        preview: "/printables/verse-ephesians-6-11.webp", file: "/printables/verse-ephesians-6-11.png", pdf: "/printables/verse-ephesians-6-11.pdf", width: 1024, height: 1536,
      },
      {
        id: "joshua19", slug: "joshua-1-9", title: "Joshua 1:9 Coloring Page", passage: "Joshua 1:9",
        blurb: "“Be strong and courageous” in outline letters, under a child standing on a hilltop at sunrise.",
        preview: "/printables/verse-joshua-1-9.webp", file: "/printables/verse-joshua-1-9.png", pdf: "/printables/verse-joshua-1-9.pdf", width: 1024, height: 1536,
      },
      {
        id: "children", slug: "let-the-children-come", title: "Let the Little Children Come Coloring Page", passage: "Matthew 19:14",
        blurb: "Jesus’ words about little children in outline letters, under Jesus with children gathered around him.",
        preview: "/printables/verse-matthew-19-14.webp", file: "/printables/verse-matthew-19-14.png", pdf: "/printables/verse-matthew-19-14.pdf", width: 1024, height: 1536,
      },
    ],
  },
  {
    id: "preschool",
    set: "preschool-bible-coloring-pages",
    title: "Preschool Bible",
    hub: "/kids/bible-coloring-pages/preschool/",
    blurb: "Extra-simple Bible pages with thick lines and big shapes for ages 2 to 5.",
    icon: Baby,
    printables: [
      {
        id: "pre-noah", slug: "preschool-noahs-ark-animals", title: "Noah’s Ark Animals Coloring Page", passage: "Genesis 7",
        blurb: "Two smiling elephants walking to Noah’s ark.",
        preview: "/printables/preschool-noahs-animals.webp", file: "/printables/preschool-noahs-animals.png", pdf: "/printables/preschool-noahs-animals.pdf", width: 1024, height: 1536,
      },
      {
        id: "pre-moses", slug: "preschool-baby-moses", title: "Baby Moses Coloring Page", passage: "Exodus 2",
        blurb: "Baby Moses asleep in a basket among the reeds.",
        preview: "/printables/preschool-baby-moses.webp", file: "/printables/preschool-baby-moses.png", pdf: "/printables/preschool-baby-moses.pdf", width: 1024, height: 1536,
      },
      {
        id: "pre-jonah", slug: "preschool-jonah-and-the-whale", title: "Easy Jonah and the Whale Coloring Page", passage: "Jonah 2",
        blurb: "Jonah sitting on the water beside a big friendly fish.",
        preview: "/printables/preschool-jonah.webp", file: "/printables/preschool-jonah.png", pdf: "/printables/preschool-jonah.pdf", width: 1024, height: 1536,
      },
      {
        id: "pre-lamb", slug: "preschool-jesus-and-the-lamb", title: "Jesus and the Lamb Coloring Page", passage: "Luke 15",
        blurb: "Jesus smiling and holding a fluffy little lamb.",
        preview: "/printables/preschool-jesus-and-lamb.webp", file: "/printables/preschool-jesus-and-lamb.png", pdf: "/printables/preschool-jesus-and-lamb.pdf", width: 1024, height: 1536,
      },
      {
        id: "pre-love", slug: "preschool-jesus-loves-me", title: "Jesus Loves Me Coloring Page", passage: "Mark 10:16",
        blurb: "Jesus hugging a child, with a big heart behind them.",
        preview: "/printables/preschool-jesus-loves-me.webp", file: "/printables/preschool-jesus-loves-me.png", pdf: "/printables/preschool-jesus-loves-me.pdf", width: 1024, height: 1536,
      },
      {
        id: "pre-sky", slug: "preschool-god-made-the-sun-moon-and-stars", title: "God Made the Sun, Moon and Stars Coloring Page", passage: "Genesis 1:16",
        blurb: "A big smiling sun, a crescent moon and three stars.",
        preview: "/printables/preschool-sun-moon-stars.webp", file: "/printables/preschool-sun-moon-stars.png", pdf: "/printables/preschool-sun-moon-stars.pdf", width: 1024, height: 1536,
      },
    ],
  },
  {
    id: "characters",
    set: "bible-character-coloring-pages",
    title: "Bible Characters",
    hub: "/kids/bible-coloring-pages/characters/",
    blurb: "Men and women of the Bible, from Abraham under the stars to Paul and Silas singing in jail.",
    icon: Users,
    printables: [
      {
        id: "kingdavid", slug: "king-david", title: "King David Coloring Page", passage: "1 Samuel 16",
        blurb: "Young King David in his crown, playing the harp beside his sheep.",
        preview: "/printables/king-david-with-harp.webp", file: "/printables/king-david-with-harp.png", pdf: "/printables/king-david-with-harp.pdf", width: 1024, height: 1536,
      },
      {
        id: "ruth", slug: "ruth-and-naomi", title: "Ruth and Naomi Coloring Page", passage: "Ruth 1–2",
        blurb: "Ruth and her mother-in-law Naomi walk together, Ruth carrying an armful of barley.",
        preview: "/printables/ruth-and-naomi.webp", file: "/printables/ruth-and-naomi.png", pdf: "/printables/ruth-and-naomi.pdf", width: 1024, height: 1536,
      },
      {
        id: "paulsilas", slug: "paul-and-silas", title: "Paul and Silas Coloring Page", passage: "Acts 16",
        blurb: "Paul and Silas sing in jail at midnight as their chains fall open and the door swings wide.",
        preview: "/printables/paul-and-silas-in-prison.webp", file: "/printables/paul-and-silas-in-prison.png", pdf: "/printables/paul-and-silas-in-prison.pdf", width: 1024, height: 1536,
      },
      {
        id: "joseph", slug: "joseph-and-his-coat", title: "Joseph’s Coat of Many Colors Coloring Page", passage: "Genesis 37",
        blurb: "Young Joseph shows off his long patterned robe while his father Jacob smiles beside him.",
        preview: "/printables/joseph-coat-of-many-colors.webp", file: "/printables/joseph-coat-of-many-colors.png", pdf: "/printables/joseph-coat-of-many-colors.pdf", width: 1024, height: 1536,
      },
      {
        id: "esther", slug: "queen-esther", title: "Queen Esther Coloring Page", passage: "Esther 5",
        blurb: "Queen Esther stands bravely before the king as he holds out his golden scepter.",
        preview: "/printables/queen-esther.webp", file: "/printables/queen-esther.png", pdf: "/printables/queen-esther.pdf", width: 1024, height: 1536,
      },
      {
        id: "abraham", slug: "abraham-and-the-stars", title: "Abraham Coloring Page", passage: "Genesis 15",
        blurb: "Abraham looks up at a night sky full of stars, his tent behind him.",
        preview: "/printables/abraham-counting-stars.webp", file: "/printables/abraham-counting-stars.png", pdf: "/printables/abraham-counting-stars.pdf", width: 1024, height: 1536,
      },
    ],
  },
  {
    id: "books",
    set: "books-of-the-bible-coloring-pages",
    title: "Books of the Bible",
    hub: "/kids/bible-coloring-pages/books-of-the-bible/",
    blurb: "All 66 books of the Bible, one page per group, each book a tile to color.",
    icon: Library,
    printables: [
      {
        id: "books-law", slug: "books-of-the-bible-law", title: "Books of the Law Coloring Page", passage: "Genesis–Deuteronomy",
        blurb: "The five books of the Law, Genesis to Deuteronomy, as tiles to color under two stone tablets and a scroll.",
        preview: "/printables/books-law.webp", file: "/printables/books-law.png", pdf: "/printables/books-law.pdf", width: 1024, height: 1536,
      },
      {
        id: "books-history", slug: "books-of-the-bible-history", title: "History Books of the Bible Coloring Page", passage: "Joshua–Esther",
        blurb: "The twelve history books, Joshua to Esther, as tiles to color under a walled city and a crown.",
        preview: "/printables/books-history.webp", file: "/printables/books-history.png", pdf: "/printables/books-history.pdf", width: 1024, height: 1536,
      },
      {
        id: "books-poetry", slug: "books-of-the-bible-poetry", title: "Poetry Books of the Bible Coloring Page", passage: "Job–Song of Solomon",
        blurb: "The five books of poetry and wisdom, Job to Song of Solomon, as tiles to color under a harp and a scroll.",
        preview: "/printables/books-poetry.webp", file: "/printables/books-poetry.png", pdf: "/printables/books-poetry.pdf", width: 1024, height: 1536,
      },
      {
        id: "books-prophets", slug: "books-of-the-bible-prophets", title: "Books of the Prophets Coloring Page", passage: "Isaiah–Malachi",
        blurb: "The seventeen books of the prophets, Isaiah to Malachi, as tiles to color under a prophet with his scroll.",
        preview: "/printables/books-prophets.webp", file: "/printables/books-prophets.png", pdf: "/printables/books-prophets.pdf", width: 1024, height: 1536,
      },
      {
        id: "books-gospels", slug: "books-of-the-bible-gospels-and-acts", title: "Gospels and Acts Coloring Page", passage: "Matthew–Acts",
        blurb: "The four Gospels and Acts as tiles to color under four scrolls, an oil lamp and a boat.",
        preview: "/printables/books-gospels-acts.webp", file: "/printables/books-gospels-acts.png", pdf: "/printables/books-gospels-acts.pdf", width: 1024, height: 1536,
      },
      {
        id: "books-letters", slug: "books-of-the-bible-letters-and-revelation", title: "Letters and Revelation Coloring Page", passage: "Romans–Revelation",
        blurb: "The twenty-one letters and Revelation as tiles to color under a dove, a quill and sealed letters.",
        preview: "/printables/books-letters-revelation.webp", file: "/printables/books-letters-revelation.png", pdf: "/printables/books-letters-revelation.pdf", width: 1024, height: 1536,
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
