import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { products, type Product } from "@/config/site";

export const Route = createFileRoute("/goods")({
  head: () => ({
    meta: [
      { title: "Physical Goods | LaMill Store" },
      { name: "description", content: "Printed activity books and party kits made by LaMill." },
      { property: "og:title", content: "LaMill Physical Goods" },
      { property: "og:description", content: "Activity books and party kits, shipped directly from LaMill." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Goods,
});

const label: Record<Product["status"], string> = {
  available: "In stock",
  "sold-out": "Sold out",
  "coming-soon": "Coming soon",
};

function Goods() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-6xl px-4 pt-12">
        <h1 className="font-display text-4xl font-semibold text-primary">Physical Goods</h1>
        <p className="mt-2 max-w-xl text-muted-foreground">Things we make and ship ourselves. Online checkout is on the way.</p>
      </section>
      <div className="mx-auto mt-8 grid max-w-6xl gap-6 px-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <article key={p.id} className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
            <div className="relative">
              <img src={p.image} alt={p.name} loading="lazy" width={1024} height={768} className="aspect-[4/3] w-full object-cover" />
              <span className="absolute left-3 top-3 rounded-full bg-card px-3 py-1 text-xs font-semibold text-primary">{label[p.status]}</span>
            </div>
            <div className="p-5">
              <div className="flex items-baseline justify-between gap-3">
                <h2 className="font-display text-xl font-semibold text-primary">{p.name}</h2>
                {p.price != null && <span className="font-semibold">${p.price.toFixed(2)}</span>}
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>
              <button disabled className="mt-4 w-full rounded-lg bg-muted px-4 py-3 font-medium text-muted-foreground">
                {p.status === "available" ? "Checkout coming soon" : label[p.status]}
              </button>
            </div>
          </article>
        ))}
      </div>
    </SiteLayout>
  );
}
