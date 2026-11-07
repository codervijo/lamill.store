import { createFileRoute, Link } from "@tanstack/react-router";
import { Download, ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { collections, featuredPrintable, storefronts } from "@/config/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LaMill Store — Kids’ activities, Etsy shops & goods" },
      { name: "description", content: "The home of LaMill: free kids’ printables, our Etsy shops and printed activity books." },
      { property: "og:title", content: "LaMill Store" },
      { property: "og:description", content: "Free kids’ printables, LaMill Etsy shops and physical goods in one place." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  const col = collections.find((c) => c.id === featuredPrintable.collectionId);
  const p = col?.printables.find((x) => x.id === featuredPrintable.printableId);
  return (
    <SiteLayout>
      <section className="mx-auto max-w-6xl px-4 pt-12 pb-8 text-center sm:pt-16">
        <p className="text-sm font-semibold uppercase tracking-widest text-brand">Welcome to LaMill</p>
        <h1 className="mx-auto mt-3 max-w-2xl font-display text-4xl font-semibold text-primary sm:text-5xl">
          One home for everything we make.
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          Pick a storefront below to explore free printables, our Etsy brands, or goods we ship ourselves.
        </p>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-4 md:grid-cols-3">
        {storefronts.map((s, i) => (
          <article key={s.id} className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card">
            <img src={s.image} alt="" width={1024} height={768} loading={i === 0 ? "eager" : "lazy"} className="aspect-[4/3] w-full object-cover" />
            <div className="flex flex-1 flex-col p-6">
              <h2 className="font-display text-2xl font-semibold text-primary">{s.title}</h2>
              <p className="mt-2 flex-1 text-muted-foreground">{s.description}</p>
              <Link to={s.path} className="mt-5 inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 font-medium text-primary-foreground hover:bg-primary/90">
                {s.cta} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </article>
        ))}
      </section>

      {p?.file && (
        <section className="mx-auto mt-16 max-w-6xl px-4">
          <div className="grid items-center gap-6 rounded-2xl bg-secondary p-6 sm:grid-cols-[200px_1fr] sm:p-8">
            <img src={p.preview} alt={`${p.title} preview`} className="mx-auto w-40 rounded-lg border border-border bg-card sm:w-full" />
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-brand">Free printable</p>
              <h2 className="mt-2 font-display text-3xl font-semibold text-primary">{p.title}</h2>
              <p className="mt-2 text-muted-foreground">Print at home and color. No sign-up needed.</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a href={p.file} download className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 font-medium text-primary-foreground hover:bg-primary/90">
                  <Download className="h-4 w-4" /> Download free
                </a>
                <Link to="/kids" className="inline-flex items-center rounded-lg border border-primary px-5 py-3 font-medium text-primary hover:bg-card">
                  More printables
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
    </SiteLayout>
  );
}
