import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { etsyShops } from "@/config/site";

export const Route = createFileRoute("/shops")({
  head: () => ({
    meta: [
      { title: "Etsy Shops | LaMill Store" },
      { name: "description", content: "Meet the LaMill family of Etsy shops — printables, stationery and gifts." },
      { property: "og:title", content: "LaMill Etsy Shops" },
      { property: "og:description", content: "Browse every LaMill brand on Etsy." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Shops,
});

function Shops() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-6xl px-4 pt-12">
        <h1 className="font-display text-4xl font-semibold text-primary">Etsy Shops</h1>
        <p className="mt-2 max-w-xl text-muted-foreground">Each LaMill brand has its own Etsy storefront. Take a look inside.</p>
      </section>
      <div className="mx-auto mt-8 grid max-w-6xl gap-8 px-4">
        {etsyShops.map((s) => (
          <article key={s.id} className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="font-display text-2xl font-semibold text-primary">{s.name}</h2>
                <p className="mt-1 text-muted-foreground">{s.intro}</p>
              </div>
              {s.url && (
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-primary px-5 py-3 font-medium text-primary-foreground hover:bg-primary/90">
                  Shop on Etsy <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </div>
            <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {s.previews.map((p) => (
                <figure key={p.title}>
                  <img src={p.image} alt={p.title} loading="lazy" className="aspect-square w-full rounded-xl object-cover" />
                  <figcaption className="mt-2 text-sm text-muted-foreground">{p.title}</figcaption>
                </figure>
              ))}
            </div>
          </article>
        ))}
      </div>
    </SiteLayout>
  );
}
