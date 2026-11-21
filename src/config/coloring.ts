/**
 * v2.B — everyday + seasonal coloring collections (non-Bible).
 * One indexable hub per search intent at /kids/<hub>/, one detail page per
 * design at /kids/<hub>/<slug>/. Artwork: imagemill (projects/lamill.store),
 * exported to public/printables/<stem>.{webp,png}; PDFs from
 * scripts/printable_pdfs.py. Print-all sets: src/data/print-sets.json (key = hub).
 * Search evidence + target keyword per hub: docs/growth.md (2026-11-08).
 */

export type Level = "easy" | "medium" | "detailed";

export const LEVELS: Record<Level, { label: string; ages: string }> = {
  easy: { label: "Easy", ages: "ages 3–5" },
  medium: { label: "Medium", ages: "ages 5–8" },
  detailed: { label: "Detailed", ages: "ages 8+" },
};

export type Design = {
  slug: string; // detail page /kids/<hub>/<slug>/
  stem: string; // public/printables/<stem>.{webp,png,pdf}
  title: string; // short name, e.g. "Sleepy Puppy"
  level: Level;
  alt: string; // what the picture shows
};

export type ThemeCollection = {
  id: string;
  hub: string; // URL segment, e.g. "dog-coloring-pages"
  keyword: string; // primary target query
  h1: string;
  metaTitle: string;
  description: string;
  nav: string; // short name for /kids/ and related links
  intro: string; // direct answer, 2–4 sentences
  sections: { heading: string; body: string }[];
  faq: { q: string; a: string }[];
  related: string[]; // other theme collection ids
  extraLinks?: { href: string; label: string; note: string }[];
  designs: Design[];
};

export const themeCollections: ThemeCollection[] = [
  {
    id: "thanksgiving",
    hub: "thanksgiving-coloring-pages",
    keyword: "thanksgiving coloring pages",
    h1: "Thanksgiving Coloring Pages",
    metaTitle: "Thanksgiving Coloring Pages for Kids — Free Printable PDFs",
    description: "Free printable Thanksgiving coloring pages for kids: a turkey, pumpkin pie, a cornucopia, a scarecrow, a thankful tree and a harvest table. Print one or all.",
    nav: "Thanksgiving",
    intro:
      "Seven free Thanksgiving coloring pages, from a big friendly turkey for preschoolers to a full harvest table for older kids, plus a thankful tree with blank leaves to write on. Every page prints on one US Letter sheet, and one PDF holds the whole set, handy for the kids’ table. No sign-up, no email.",
    sections: [
      {
        heading: "Something for every age at the table",
        body:
          "The turkey and the pumpkin pie are single, chunky shapes for the youngest guests. The cornucopia, the scarecrow with its crow and the thankful tree give five- to eight-year-olds more to fill. The harvest table and the autumn farm, with its barn, wagon and pumpkin patch, are detailed scenes that keep older kids busy while dinner cooks.",
      },
      {
        heading: "Use the thankful tree as a family activity",
        body:
          "The thankful tree has large empty leaves. Before or after the meal, ask each person to write or draw one thing they are thankful for in a leaf, then color the rest. Younger children can draw a picture and have a grown-up write the word. Hang it up and you have a keepsake from the day.",
      },
    ],
    faq: [
      { q: "Are these Thanksgiving coloring pages free?", a: "Yes. Every page and the full-set PDF download directly, with no account and no email address." },
      { q: "How do I print enough for the kids’ table?", a: "Download the full-set PDF and print as many copies as you need, or open one picture and set the number of copies in your print dialog." },
      { q: "What is the thankful tree page for?", a: "Its leaves are left blank so children can write or draw what they are thankful for, then color the tree." },
    ],
    related: ["winter", "christmas"],
    designs: [
      { slug: "turkey", stem: "thanksgiving-turkey", title: "Happy Turkey", level: "easy", alt: "Smiling turkey with big round tail feathers" },
      { slug: "pumpkin-pie", stem: "thanksgiving-pumpkin-pie", title: "Pumpkin Pie", level: "easy", alt: "Pumpkin pie topped with whipped cream on a plate" },
      { slug: "cornucopia", stem: "thanksgiving-cornucopia", title: "Cornucopia", level: "medium", alt: "Cornucopia overflowing with pumpkins, apples, corn, squash and grapes" },
      { slug: "scarecrow", stem: "thanksgiving-scarecrow", title: "Scarecrow and Crow", level: "medium", alt: "Friendly scarecrow in a straw hat with a crow, standing among pumpkins" },
      { slug: "thankful-tree", stem: "thanksgiving-thankful-tree", title: "Thankful Tree", level: "medium", alt: "Tree with large blank leaves to write or draw in" },
      { slug: "harvest-table", stem: "thanksgiving-harvest-table", title: "Harvest Dinner Table", level: "detailed", alt: "Long dinner table with a roast turkey, pies, pumpkins and candles" },
      { slug: "fall-farm", stem: "thanksgiving-fall-farm", title: "Autumn Farm", level: "detailed", alt: "Autumn farm with a barn, hay bales, a wagon, a pumpkin patch and a turkey" },
    ],
  },
  {
    id: "christmas",
    hub: "christmas-coloring-pages",
    keyword: "cute christmas coloring pages",
    h1: "Cute Christmas Coloring Pages",
    metaTitle: "Cute Christmas Coloring Pages — Free Printable PDFs",
    description: "Free printable Christmas coloring pages for kids: a snowman, a reindeer, a gingerbread house, Santa’s sleigh and more. Easy to detailed, one PDF for all.",
    nav: "Christmas",
    intro:
      "Seven free Christmas coloring pages, from a big-shaped snowman a preschooler can handle to a busy village street for older kids. Every page prints on one US Letter sheet, and one PDF holds the whole set if you want a stack ready for the holidays. No sign-up, no email.",
    sections: [
      {
        heading: "Pick by how much detail your child enjoys",
        body:
          "The snowman, the Christmas tree with presents and the cookies for Santa have thick lines and large spaces, which suits crayons and small hands. The reindeer and the gingerbread house add a few more shapes to fill. Santa’s sleigh over the rooftops and the Christmas village are full scenes with windows, wreaths and snow, so they keep an eight- or nine-year-old busy for a while.",
      },
      {
        heading: "Ideas for using them",
        body:
          "Colored pages make simple gift tags and cards: print the snowman or the tree, color it, cut it out and fold it. The cookies-for-Santa page is a natural one for Christmas Eve. If you print the full set, the detailed pages work well for a long afternoon or a car ride with a clipboard.",
      },
    ],
    faq: [
      { q: "Are these Christmas coloring pages free?", a: "Yes. Every page and the all-in-one PDF download directly, with no account and no email address." },
      { q: "Do you have Christmas coloring pages about the nativity?", a: "Yes. The Christmas story from the Bible, from the angel visiting Mary to the wise men, is a separate set of six pages on our Christmas Bible coloring pages." },
      { q: "Can I print them all at once?", a: "Download the full-set PDF near the top of this page. It has every design in order from easy to detailed, one picture per US Letter page." },
    ],
    related: ["winter", "dog"],
    extraLinks: [
      { href: "/kids/bible-coloring-pages/christmas/", label: "Christmas Bible coloring pages", note: "the nativity story in six pages" },
    ],
    designs: [
      { slug: "snowman", stem: "christmas-snowman", title: "Snowman with a Candy Cane", level: "easy", alt: "Smiling snowman with a scarf, top hat and candy cane" },
      { slug: "tree-and-presents", stem: "christmas-tree-and-presents", title: "Christmas Tree and Presents", level: "easy", alt: "Christmas tree with a star, ornaments and wrapped presents" },
      { slug: "cookies-for-santa", stem: "christmas-cookies-for-santa", title: "Cookies for Santa", level: "easy", alt: "Plate of star and gingerbread cookies with a glass of milk" },
      { slug: "reindeer-with-bells", stem: "christmas-reindeer-with-bells", title: "Reindeer with Jingle Bells", level: "medium", alt: "Young reindeer with a jingle-bell collar standing in the snow" },
      { slug: "gingerbread-house", stem: "christmas-gingerbread-house", title: "Gingerbread House", level: "medium", alt: "Gingerbread house with candy decorations and two gingerbread people" },
      { slug: "santa-sleigh", stem: "christmas-santa-sleigh", title: "Santa’s Sleigh over the Rooftops", level: "detailed", alt: "Santa’s sleigh and reindeer flying over snowy rooftops under a full moon" },
      { slug: "christmas-village", stem: "christmas-christmas-village", title: "Christmas Village Street", level: "detailed", alt: "Snowy village street with decorated houses and children carrying presents" },
    ],
  },
  {
    id: "winter",
    hub: "winter-coloring-pages",
    keyword: "winter coloring pages",
    h1: "Winter Coloring Pages",
    metaTitle: "Winter Coloring Pages for Kids — Free Printable PDFs",
    description: "Free winter coloring pages for kids: a penguin, polar bears, sledding, ice skating, hot cocoa and a snowy cabin. Easy to detailed, print one or all.",
    nav: "Winter",
    intro:
      "Seven free winter coloring pages for the cold months, none of them tied to a holiday, so they work from the first snow until spring. They run from a penguin on an ice block for toddlers to a frozen pond full of skaters for older kids. Each prints on one US Letter page; the full set is one PDF.",
    sections: [
      {
        heading: "From simple to detailed",
        body:
          "The mittens and hat and the penguin are the simplest: one big subject, thick outlines. The polar bear and cub, the sledding kids and the mug of hot cocoa add a background to color. The ice-skating pond and the log cabin in the snowy woods are full scenes with trees, animals and small details.",
      },
      {
        heading: "Snow-day and indoor-recess ideas",
        body:
          "Winter pages are handy on days nobody can go outside. Pair the hot-cocoa page with real cocoa, or the polar bears and penguin with a library book about animals in cold places. White crayon doesn’t show on white paper, so suggest light blue or gray for snow and ice.",
      },
    ],
    faq: [
      { q: "Are these winter coloring pages free?", a: "Yes. Each page and the full-set PDF download directly, with no sign-up." },
      { q: "Are these the same as your Christmas pages?", a: "No. These are general winter scenes with nothing Christmas-specific. Christmas pictures such as Santa’s sleigh and a gingerbread house are on our Christmas coloring pages." },
      { q: "What should my child use to color snow?", a: "Leave it white, or shade it lightly with light blue or gray so it stands out from the paper." },
    ],
    related: ["christmas", "thanksgiving"],
    designs: [
      { slug: "mittens-and-hat", stem: "winter-mittens-and-hat", title: "Mittens and a Pom-Pom Hat", level: "easy", alt: "Pair of mittens and a knitted pom-pom hat with snowflakes" },
      { slug: "penguin-on-ice", stem: "winter-penguin-on-ice", title: "Penguin on the Ice", level: "easy", alt: "Happy penguin in a striped scarf standing on a block of ice" },
      { slug: "polar-bear-and-cub", stem: "winter-polar-bear-and-cub", title: "Polar Bear and Cub", level: "medium", alt: "Polar bear mother and cub with icebergs behind them" },
      { slug: "kids-sledding", stem: "winter-kids-sledding", title: "Sledding Down the Hill", level: "medium", alt: "Two children in hats riding a sled down a snowy hill" },
      { slug: "hot-cocoa", stem: "winter-hot-cocoa", title: "Hot Cocoa by the Window", level: "medium", alt: "Mug of hot cocoa with marshmallows and cookies by a frosty window" },
      { slug: "ice-skating-pond", stem: "winter-ice-skating-pond", title: "Ice Skating on the Pond", level: "detailed", alt: "Children ice skating on a frozen pond with snowy trees and a bench" },
      { slug: "cabin-in-the-snow", stem: "winter-cabin-in-the-snow", title: "Cabin in the Snowy Woods", level: "detailed", alt: "Log cabin with a smoking chimney in snowy woods with a deer and a rabbit" },
    ],
  },
  {
    id: "dog",
    hub: "dog-coloring-pages",
    keyword: "dog coloring pages",
    h1: "Dog and Puppy Coloring Pages",
    metaTitle: "Dog Coloring Pages & Puppy Coloring Pages — Free PDFs",
    description: "Free printable dog and puppy coloring pages: a sleepy puppy, a dalmatian, a bubble bath, fetch at the park and more. Easy to detailed, print one or all.",
    nav: "Dogs & Puppies",
    intro:
      "Seven free dog and puppy coloring pages, sorted from easy to detailed. Start a three-year-old on the puppy with a ball; give an older child the park scene or the three puppies by the doghouse. Every page is one US Letter sheet, and the whole set comes in a single PDF.",
    sections: [
      {
        heading: "Puppies for little ones, scenes for older kids",
        body:
          "The puppy with a ball and the sleepy puppy in its bed are big, simple shapes. The dalmatian, the golden retriever jumping in autumn leaves and the dog in the bubble bath have a little more to color around them. The park and doghouse pages are busy scenes with trees, flowers and more than one dog.",
      },
      {
        heading: "Make it their dog",
        body:
          "Kids with a dog at home like coloring the picture to match: brown patches, a black nose, a red collar. The dalmatian is a good one for practicing spots, and the leaves page is a chance to use every fall color in the box.",
      },
    ],
    faq: [
      { q: "Are these dog coloring pages free?", a: "Yes. Every page and the full-set PDF download directly, with no account or email." },
      { q: "Which pages are best for toddlers?", a: "The puppy with a ball and the sleepy puppy have the fewest, largest shapes." },
      { q: "Do you have specific breeds?", a: "The set includes a dalmatian and a golden retriever puppy, and the doghouse page has a corgi-style puppy among three different breeds. The rest are friendly mixed-breed dogs." },
    ],
    related: ["dragon", "winter"],
    designs: [
      { slug: "puppy-with-ball", stem: "dog-puppy-with-ball", title: "Puppy with a Ball", level: "easy", alt: "Happy puppy sitting next to a ball" },
      { slug: "sleepy-puppy", stem: "dog-sleepy-puppy", title: "Sleepy Puppy", level: "easy", alt: "Puppy curled up asleep in a round dog bed" },
      { slug: "dalmatian-puppy", stem: "dog-dalmatian-puppy", title: "Dalmatian Puppy", level: "medium", alt: "Spotted dalmatian puppy wagging its tail next to a bone" },
      { slug: "puppy-in-leaves", stem: "dog-puppy-in-leaves", title: "Puppy in the Leaves", level: "medium", alt: "Golden retriever puppy jumping in a pile of autumn leaves" },
      { slug: "dog-bath-time", stem: "dog-dog-bath-time", title: "Bath Time", level: "medium", alt: "Small dog in a bubble bath with a rubber duck" },
      { slug: "dog-and-child-at-park", stem: "dog-dog-and-child-at-park", title: "Fetch at the Park", level: "detailed", alt: "Child throwing a stick for a dog in a park with trees and a bench" },
      { slug: "puppies-and-doghouse", stem: "dog-puppies-and-doghouse", title: "Three Puppies by the Doghouse", level: "detailed", alt: "Three puppies of different breeds playing by a wooden doghouse" },
    ],
  },
  {
    id: "dragon",
    hub: "dragon-coloring-pages",
    keyword: "dragon coloring pages",
    h1: "Dragon Coloring Pages",
    metaTitle: "Dragon Coloring Pages for Kids — Free Printable PDFs",
    description: "Free printable dragon coloring pages for kids: a baby dragon hatching, a dragon reading, a castle dragon, treasure and more. Friendly, not scary. Print one or all.",
    nav: "Dragons",
    intro:
      "Seven free dragon coloring pages, all friendly rather than scary, from a baby dragon hatching out of its egg to a big dragon flying over mountains. They run from easy to detailed, each prints on one US Letter page, and the whole set is one PDF.",
    sections: [
      {
        heading: "Cute dragons and big adventures",
        body:
          "The hatching baby dragon and the little dragon holding flowers are the easiest: large shapes, round faces. The dragon reading under a tree, curled around a castle tower and toasting marshmallows at a campfire add a setting. The dragon asleep on its treasure and the one flying over the mountains are detailed scenes with lots of small shapes, such as coins, crowns, trees and a winding river.",
      },
      {
        heading: "Scales, wings and color ideas",
        body:
          "Dragons can be any color, which is half the fun. Older kids can fill each scale with a pattern of stripes, dots or two alternating colors, and make the wings a lighter shade than the body. The treasure page rewards metallic or yellow crayons.",
      },
    ],
    faq: [
      { q: "Are these dragon coloring pages scary?", a: "No. Every dragon here is friendly: smiling, reading, sleeping or roasting marshmallows. They suit young children." },
      { q: "Are they free to print?", a: "Yes. Each page and the full-set PDF download directly, with no sign-up." },
      { q: "Which dragon is best for a preschooler?", a: "The baby dragon hatching from its egg and the dragon holding flowers have the biggest, simplest shapes." },
    ],
    related: ["monster-truck", "dog"],
    designs: [
      { slug: "baby-dragon-hatching", stem: "dragon-baby-dragon-hatching", title: "Baby Dragon Hatching", level: "easy", alt: "Cute baby dragon hatching from a spotted egg" },
      { slug: "dragon-with-flowers", stem: "dragon-dragon-with-flowers", title: "Dragon with Flowers", level: "easy", alt: "Small friendly dragon holding a bunch of flowers" },
      { slug: "dragon-reading-a-book", stem: "dragon-dragon-reading-a-book", title: "Dragon Reading a Book", level: "medium", alt: "Friendly dragon sitting under a tree reading a book" },
      { slug: "dragon-on-castle", stem: "dragon-dragon-on-castle", title: "Dragon on the Castle Tower", level: "medium", alt: "Friendly dragon curled around a castle tower with flags" },
      { slug: "dragon-campfire", stem: "dragon-dragon-campfire", title: "Dragon at the Campfire", level: "medium", alt: "Dragon toasting a marshmallow over a campfire" },
      { slug: "dragon-treasure", stem: "dragon-dragon-treasure", title: "Dragon’s Treasure", level: "detailed", alt: "Dragon asleep on a pile of coins, crowns and jewels in a cave" },
      { slug: "dragon-over-mountains", stem: "dragon-dragon-over-mountains", title: "Dragon over the Mountains", level: "detailed", alt: "Large dragon flying over mountains, a river and a forest" },
    ],
  },
  {
    id: "monster-truck",
    hub: "monster-truck-coloring-pages",
    keyword: "monster truck coloring pages",
    h1: "Monster Truck Coloring Pages",
    metaTitle: "Monster Truck Coloring Pages — Free Printable PDFs",
    description: "Free printable monster truck coloring pages: big wheels, flame trucks, a dinosaur truck, mud races, jumps and a stadium wheelie. Easy to detailed.",
    nav: "Monster Trucks",
    intro:
      "Seven free monster truck coloring pages, from a simple side view with giant wheels to a stadium wheelie in front of a cheering crowd. All the trucks are our own designs, with no brand names or logos, so kids can paint them however they like. Each page is one US Letter sheet; the full set is one PDF.",
    sections: [
      {
        heading: "Start simple, then add the action",
        body:
          "The big-wheels truck and the flame truck are the easiest: a single truck, bold outlines, large tires. The dirt-ramp jump, the mud race and the dinosaur truck add motion and a background. The truck crushing old cars and the stadium wheelie are detailed scenes with crowds, lights and a lot of tire tread to fill in.",
      },
      {
        heading: "Design your own truck",
        body:
          "Because none of these trucks belongs to a real team, kids get to invent one: give it a name, pick its colors, add stripes or flames, and draw a logo on the blank door. The dinosaur truck is a favorite for kids who like both.",
      },
    ],
    faq: [
      { q: "Are these monster truck coloring pages free?", a: "Yes. Every page and the full-set PDF download directly, with no account or email." },
      { q: "Are these real monster trucks?", a: "No. They are original drawings, not copies of trucks from shows or events, so there are no names or logos on them." },
      { q: "Which page is easiest?", a: "The big-wheels truck: one truck seen from the side, with very large, simple shapes." },
    ],
    related: ["dragon", "dog"],
    designs: [
      { slug: "big-wheels-truck", stem: "monster-truck-big-wheels-truck", title: "Big Wheels Truck", level: "easy", alt: "Simple monster truck seen from the side with very big wheels" },
      { slug: "flame-truck", stem: "monster-truck-flame-truck", title: "Flame Truck", level: "easy", alt: "Monster truck from the front with roof lights and flame shapes" },
      { slug: "truck-jump", stem: "monster-truck-truck-jump", title: "Dirt Ramp Jump", level: "medium", alt: "Monster truck in mid-air after jumping off a dirt ramp" },
      { slug: "mud-race", stem: "monster-truck-mud-race", title: "Mud Race", level: "medium", alt: "Two monster trucks racing through a muddy track" },
      { slug: "dinosaur-truck", stem: "monster-truck-dinosaur-truck", title: "Dinosaur Monster Truck", level: "medium", alt: "Monster truck shaped like a dinosaur with spikes and a tail" },
      { slug: "truck-over-cars", stem: "monster-truck-truck-over-cars", title: "Crushing Old Cars", level: "detailed", alt: "Monster truck driving over a row of old cars in an arena" },
      { slug: "stadium-wheelie", stem: "monster-truck-stadium-wheelie", title: "Stadium Wheelie", level: "detailed", alt: "Monster truck doing a wheelie in a stadium full of fans" },
    ],
  },
  {
    id: "princess",
    hub: "princess-coloring-pages",
    keyword: "princess coloring pages",
    h1: "Princess Coloring Pages",
    metaTitle: "Princess Coloring Pages for Kids — Free Printable PDFs",
    description: "Free princess coloring pages with original princesses: a castle balcony, a unicorn ride, a friendly dragon and a garden tea party. Easy to detailed.",
    nav: "Princesses",
    intro:
      "Seven free princess coloring pages with our own princesses, sorted from easy to detailed. The smiling little princess and the jeweled crown are big, simple shapes for preschoolers; the castle, the unicorn ride and the princess reading to a friendly dragon suit five- to eight-year-olds; the garden tea party and the royal garden are full scenes for older kids. Every page prints on one US Letter sheet, and the whole set is one PDF.",
    sections: [
      {
        heading: "A princess for every age",
        body:
          "Small children do best with one big figure and wide spaces, which is why the first two pages are a single princess and a single crown. The middle pages add a setting: towers and a drawbridge, a meadow with a unicorn, a rock where the princess reads to a dragon. The last two are busy scenes, a tea table set with cakes and teacups for a teddy bear, a bunny and a kitten, and a garden path past a fountain and rose bushes to the castle.",
      },
      {
        heading: "Not a movie princess",
        body:
          "These princesses are drawn for this site and don’t copy any film or toy character, so your child decides her hair, her dress and her colors. That makes them a good match for a dress-up afternoon: color the princess to look like your child’s own costume, then color the crown to match.",
      },
    ],
    faq: [
      { q: "Are these princess coloring pages free?", a: "Yes. Every page and the full-set PDF download directly, with no account or email." },
      { q: "Are these Disney princesses?", a: "No. They are original princesses drawn for LaMill Store, so they can be printed and shared freely." },
      { q: "Which page is best for a three-year-old?", a: "The little princess holding a flower, or the crown on its cushion: each is one large shape with thick lines." },
    ],
    related: ["unicorn", "ballerina"],
    designs: [
      { slug: "little-princess", stem: "princess-little-princess", title: "Little Princess", level: "easy", alt: "Smiling little princess in a crown, holding a flower" },
      { slug: "princess-crown", stem: "princess-princess-crown", title: "Princess Crown", level: "easy", alt: "Big jeweled crown on a cushion with tassels" },
      { slug: "princess-castle", stem: "princess-princess-castle", title: "Princess Castle", level: "medium", alt: "Princess waving from a castle balcony with towers, flags and a drawbridge" },
      { slug: "unicorn-princess", stem: "princess-unicorn-princess", title: "Unicorn Princess", level: "medium", alt: "Princess in a flower crown riding a unicorn through a meadow" },
      { slug: "princess-and-dragon", stem: "princess-princess-and-dragon", title: "Princess and the Friendly Dragon", level: "medium", alt: "Princess reading a book to a small friendly dragon" },
      { slug: "princess-tea-party", stem: "princess-princess-tea-party", title: "Princess Tea Party", level: "detailed", alt: "Princess at a garden tea party with a teddy bear, a bunny and a kitten" },
      { slug: "royal-garden", stem: "princess-royal-garden", title: "Princess in the Royal Garden", level: "detailed", alt: "Princess in a royal garden with a fountain, rose bushes and a castle" },
    ],
  },
  {
    id: "music",
    hub: "musical-instrument-coloring-pages",
    keyword: "musical instruments coloring pages",
    h1: "Music and Musical Instrument Coloring Pages",
    metaTitle: "Musical Instrument Coloring Pages — Free Printable PDFs",
    description: "Free music coloring pages for kids: a guitar, a drum, a violin, a piano, dancing music notes, a kids’ band and a room full of instruments.",
    nav: "Music & Instruments",
    intro:
      "Seven free music coloring pages, from a single guitar to a room full of instruments. Preschoolers start with the big acoustic guitar or the drum; school-age kids get the violin on its music stand, a child at the piano and a line of dancing music notes; older kids can color a four-piece kids’ band on stage or name every instrument in the music room. Each page prints on one US Letter sheet, or download the whole set as one PDF.",
    sections: [
      {
        heading: "Learn the instruments while you color",
        body:
          "The instrument room is a quiet quiz: there is a piano, a guitar, a violin, a trumpet, a flute, a xylophone, a tambourine and a drum set. Ask your child to point to the one you name, then which ones you blow, strum, hit or play with a bow. The band page shows four of them being played, so children can see how each one is held.",
      },
      {
        heading: "For music lessons and classrooms",
        body:
          "Pages like these work for the first minutes of a music lesson or as a quiet activity after a concert. A child who has just started violin or piano lessons usually wants to color their own instrument first, and the notes page is a gentle way to talk about notes and the treble clef without any reading.",
      },
    ],
    faq: [
      { q: "Are these music coloring pages free?", a: "Yes. Every page and the full-set PDF download directly, with no account or email." },
      { q: "Which instruments are included?", a: "Guitar, drum, violin, piano and music notes on their own pages; the band page adds a trumpet, and the instrument room adds a flute, a xylophone, a tambourine and a drum set." },
      { q: "Is there an electric guitar?", a: "Not yet; the guitar page is an acoustic guitar, and the band page shows a guitar being played on stage." },
    ],
    related: ["ballerina", "princess"],
    designs: [
      { slug: "guitar", stem: "music-guitar", title: "Guitar", level: "easy", alt: "Big acoustic guitar standing upright" },
      { slug: "drum", stem: "music-drum", title: "Drum", level: "easy", alt: "Big round drum with two drumsticks" },
      { slug: "violin", stem: "music-violin", title: "Violin", level: "medium", alt: "Violin and bow on a music stand, with music notes floating around" },
      { slug: "piano", stem: "music-piano", title: "Piano", level: "medium", alt: "Child playing an upright piano with music notes floating above" },
      { slug: "music-notes", stem: "music-music-notes", title: "Music Notes", level: "medium", alt: "Big music notes and a treble clef dancing along a wavy music staff" },
      { slug: "kids-band", stem: "music-kids-band", title: "Kids’ Band", level: "detailed", alt: "Four kids playing guitar, drums, trumpet and violin on a stage" },
      { slug: "instrument-collection", stem: "music-instrument-collection", title: "Music Room", level: "detailed", alt: "Room of instruments: a piano, guitar, violin, trumpet, flute, xylophone, tambourine and drum set" },
    ],
  },
  {
    id: "ballerina",
    hub: "ballerina-coloring-pages",
    keyword: "ballerina coloring pages",
    h1: "Ballerina and Ballet Coloring Pages",
    metaTitle: "Ballerina Coloring Pages — Free Ballet Printables for Kids",
    description: "Free ballerina and ballet coloring pages: a twirling little ballerina, pointe shoes, a boy dancer leaping, a bunny ballerina, a recital and a ballet class.",
    nav: "Ballet",
    intro:
      "Seven free ballet coloring pages, from a little ballerina twirling in her tutu to a whole ballet class at the barre. The ballerina and the pointe shoes are big, simple shapes for preschoolers; the boy dancer mid-leap, the ballerina with curly puffs at the barre and the bunny ballerina suit five- to eight-year-olds; the recital stage and the ballet class are full scenes for older dancers. Every page is one US Letter sheet, and the set comes as one PDF.",
    sections: [
      {
        heading: "Dancers who look like your dancer",
        body:
          "Ballet classes are full of different children, so these pages are too. There is a boy dancer leaping across the floor, a ballerina with her curly hair in two puffs, and a class of five children who don’t all look alike. Coloring a dancer who looks like them, or like a friend from class, is often what makes a child pick a page first.",
      },
      {
        heading: "Before and after dance class",
        body:
          "Pages like these fill the wait before a lesson or the evening after a recital. The pointe shoes page is a good one for talking about the shoes older dancers wear, and the recital page, with its curtains and bouquets, is a nice keepsake to color after a first performance.",
      },
    ],
    faq: [
      { q: "Are these ballerina coloring pages free?", a: "Yes. Every page and the full-set PDF download directly, with no account or email." },
      { q: "Is there a boy ballet dancer?", a: "Yes. One page shows a boy dancer leaping, and the ballet class page includes a boy at the barre." },
      { q: "Which page suits a preschooler?", a: "The little ballerina twirling, or the pair of pointe shoes with ribbons: both have a few large shapes and thick lines." },
    ],
    related: ["princess", "music"],
    designs: [
      { slug: "little-ballerina", stem: "ballet-little-ballerina", title: "Little Ballerina", level: "easy", alt: "Little ballerina twirling on her toes in a puffy tutu" },
      { slug: "ballet-shoes", stem: "ballet-ballet-shoes", title: "Ballet Shoes", level: "easy", alt: "Pair of pointe shoes with long ribbons tied in a bow" },
      { slug: "boy-ballet-dancer", stem: "ballet-boy-ballet-dancer", title: "Boy Ballet Dancer", level: "medium", alt: "Boy ballet dancer leaping with his arms stretched out" },
      { slug: "ballerina-at-the-barre", stem: "ballet-ballerina-at-the-barre", title: "Ballerina at the Barre", level: "medium", alt: "Ballerina with curly hair in two puffs practicing at the barre" },
      { slug: "bunny-ballerina", stem: "ballet-bunny-ballerina", title: "Bunny Ballerina", level: "medium", alt: "Bunny ballerina in a tutu posing on a little stage with flowers" },
      { slug: "ballet-recital", stem: "ballet-ballet-recital", title: "Ballet Recital", level: "detailed", alt: "Two young dancers performing on a theater stage with curtains and bouquets" },
      { slug: "ballet-class", stem: "ballet-ballet-class", title: "Ballet Class", level: "detailed", alt: "Ballet class with a teacher and five children posing at the barre, a mirror and a piano" },
    ],
  },
  {
    id: "flower",
    hub: "flower-coloring-pages",
    keyword: "flower coloring pages",
    h1: "Flower Coloring Pages for Kids",
    metaTitle: "Flower Coloring Pages for Kids — Sunflower, Rose & More",
    description: "Free flower coloring pages for kids: a sunflower, a daisy, tulips in a pot, a rose, a butterfly on flowers, a garden and a bouquet. Easy to detailed.",
    nav: "Flowers",
    intro:
      "Seven free flower coloring pages for kids, each a flower you can name: a sunflower and a daisy with big, easy petals; tulips in a pot, a single rose and a butterfly landing on flowers for school-age kids; and a whole garden and a bouquet in a patterned vase for older children. Every page prints on one US Letter sheet, or download all seven in one PDF.",
    sections: [
      {
        heading: "Easy flowers first",
        body:
          "Flowers are one of the best first coloring pages because every petal is its own closed space. The sunflower and the daisy have big petals around a round middle, so a toddler can color petal by petal. The rose is the trickiest of the single flowers: its petals overlap, which is good practice for children who are starting to stay inside smaller shapes.",
      },
      {
        heading: "Real flowers to compare",
        body:
          "Children enjoy coloring a flower they can find outside. Sunflowers are yellow with a dark middle, daisies are white with a yellow center, and tulips and roses grow in many colors, so there is no wrong answer. The garden page has all four together, plus a watering can, a bee and a butterfly to color.",
      },
    ],
    faq: [
      { q: "Are these flower coloring pages free?", a: "Yes. Every page and the full-set PDF download directly, with no account or email." },
      { q: "Which flowers are included?", a: "A sunflower, a daisy, tulips, a rose, mixed flowers with a butterfly, a garden with all of them, and a bouquet with roses, tulips, daisies and lilies." },
      { q: "Are these for kids or adults?", a: "They are drawn for children, sorted from easy to detailed. The bouquet and the garden are detailed enough for older kids and grown-ups who want a calmer page." },
    ],
    related: ["ballerina", "princess"],
    designs: [
      { slug: "sunflower", stem: "flower-sunflower", title: "Sunflower", level: "easy", alt: "One big sunflower with large petals and two leaves" },
      { slug: "daisy", stem: "flower-daisy", title: "Daisy", level: "easy", alt: "One big daisy with wide petals, a short stem and two leaves" },
      { slug: "tulips", stem: "flower-tulips", title: "Tulips", level: "medium", alt: "Three tulips in a clay flower pot" },
      { slug: "rose", stem: "flower-rose", title: "Rose", level: "medium", alt: "Single blooming rose with layered petals and leaves on a long stem" },
      { slug: "butterfly-and-flowers", stem: "flower-butterfly-and-flowers", title: "Butterfly and Flowers", level: "medium", alt: "Butterfly with patterned wings landing on a cluster of flowers" },
      { slug: "flower-garden", stem: "flower-flower-garden", title: "Flower Garden", level: "detailed", alt: "Flower garden with sunflowers, tulips, daisies and roses, a watering can, a bee and a butterfly" },
      { slug: "flower-bouquet", stem: "flower-flower-bouquet", title: "Flower Bouquet", level: "detailed", alt: "Bouquet of roses, tulips, daisies and lilies in a patterned vase" },
    ],
  },
  {
    id: "unicorn",
    hub: "unicorn-coloring-pages",
    keyword: "unicorn coloring pages",
    h1: "Unicorn Coloring Pages",
    metaTitle: "Unicorn Coloring Pages for Kids — Free Printable PDFs",
    description: "Free unicorn coloring pages for kids: a unicorn head, a baby unicorn, a rainbow unicorn, a unicorn cake, a pegasus, a magic forest and a unicorn family.",
    nav: "Unicorns",
    intro:
      "Seven free unicorn coloring pages, sorted from easy to detailed. The smiling unicorn head and the baby unicorn are big, simple shapes for preschoolers; the unicorn prancing over a rainbow, the unicorn birthday cake and the flying pegasus suit five- to eight-year-olds; the magical forest and the unicorn family under the moon are full scenes for older kids. Every page prints on one US Letter sheet, and the whole set comes as one PDF.",
    sections: [
      {
        heading: "Rainbows, cakes and a pegasus",
        body:
          "The rainbow unicorn is the page most children reach for first, because the rainbow has its own stripes to fill in any order they like. The unicorn cake is made for birthday parties: print one per guest and let everyone decorate their own cake. The pegasus is a winged horse without a horn, a good one for talking about the difference between a unicorn and a pegasus.",
      },
      {
        heading: "Mane, horn and stars",
        body:
          "Unicorn manes are long, flowing shapes split into strands, so they are good practice for coloring inside curved lines. Younger children can color the whole mane one color; older kids often give every strand its own color, like a rainbow. The stars and hearts around the pictures are small extra spaces for finishing touches.",
      },
    ],
    faq: [
      { q: "Are these unicorn coloring pages free?", a: "Yes. Every page and the full-set PDF download directly, with no account or email." },
      { q: "Which page is easiest for a toddler?", a: "The unicorn head and the baby unicorn: each is one big shape with thick lines and almost no background." },
      { q: "What is the difference between a unicorn and a pegasus?", a: "A unicorn is a horse with a single horn on its forehead; a pegasus is a horse with wings. Our pegasus page shows the wings and no horn." },
    ],
    related: ["princess", "dragon"],
    designs: [
      { slug: "unicorn-head", stem: "unicorn-unicorn-head", title: "Unicorn Head", level: "easy", alt: "Smiling unicorn head with a spiral horn and a flowing mane" },
      { slug: "baby-unicorn", stem: "unicorn-baby-unicorn", title: "Baby Unicorn", level: "easy", alt: "Baby unicorn with big eyes sitting on the grass" },
      { slug: "rainbow-unicorn", stem: "unicorn-rainbow-unicorn", title: "Rainbow Unicorn", level: "medium", alt: "Unicorn prancing over a rainbow between two clouds" },
      { slug: "unicorn-cake", stem: "unicorn-unicorn-cake", title: "Unicorn Cake", level: "medium", alt: "Unicorn birthday cake with a horn, ears and frosting flowers on a cake stand" },
      { slug: "pegasus", stem: "unicorn-pegasus", title: "Pegasus", level: "medium", alt: "Winged horse flying among clouds and stars" },
      { slug: "unicorn-forest", stem: "unicorn-unicorn-forest", title: "Unicorn in the Magic Forest", level: "detailed", alt: "Unicorn in a magical forest by a waterfall, with mushrooms, flowers and butterflies" },
      { slug: "unicorn-family", stem: "unicorn-unicorn-family", title: "Unicorn Family", level: "detailed", alt: "Mother unicorn and two foals in a flower meadow under the moon and stars, a castle on a far hill" },
    ],
  },
];

export const hubPath = (c: ThemeCollection) => `/kids/${c.hub}/`;
export const designPath = (c: ThemeCollection, d: Design) => `/kids/${c.hub}/${d.slug}/`;
export const designFiles = (d: Design) => ({
  preview: `/printables/${d.stem}.webp`,
  png: `/printables/${d.stem}.png`,
  pdf: `/printables/${d.stem}.pdf`,
});
// Image-search wording (AI_AGENTS.md § Image search wording): alt
// text uses the words image searchers type — "coloring page", "for kids",
// "simple" (easy level only, so it stays true), "outline" — then what the
// picture shows.
const LOOK: Record<Level, string> = { easy: "simple ", medium: "", detailed: "detailed " };
export const designAlt = (d: Design) =>
  `${d.title} coloring page for kids, ${LOOK[d.level]}black-and-white outline: ${d.alt}`;
export const setPdf = (c: ThemeCollection) => `/printables/${c.hub}.pdf`;
/** Seasonal collection featured on the homepage — rotate: Thanksgiving until
 *  Nov 26, then Christmas, then Winter after Dec 25. */
export const featuredThemeId = "thanksgiving";
export const byId = (id: string) => themeCollections.find((c) => c.id === id);
// imagemill exports 1024×1536 portrait for every design.
export const DESIGN_W = 1024;
export const DESIGN_H = 1536;
