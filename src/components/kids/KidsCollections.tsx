import { Download } from "lucide-react";
import { collections, coloringPagePath, type Printable } from "../../config/site";

/** Printable collections (island). */
export function KidsCollections() {
  return (
    <>
      {collections.map((c) => (
        <section key={c.id} id={c.id} className="mx-auto mt-12 max-w-6xl scroll-mt-24 px-4">
          <h2 className="flex items-center gap-2 font-kids text-3xl font-bold text-primary"><c.icon className="h-7 w-7 shrink-0" aria-hidden="true" /> {c.title}</h2>
          <p className="mt-1 text-muted-foreground">{c.blurb}</p>
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {c.printables.map((p) => (
              <PrintableCard key={p.id} p={p} />
            ))}
          </div>
        </section>
      ))}
    </>
  );
}

function PrintableCard({ p }: { p: Printable }) {
  return (
    <article className="overflow-hidden rounded-3xl border-2 border-border bg-card">
      <a href={coloringPagePath(p)} className="block bg-muted p-4">
        <img src={p.preview} alt={`${p.title} preview`} loading="lazy" width={p.width} height={p.height} className={`mx-auto h-56 w-auto rounded-lg bg-card ${p.file ? "" : "opacity-40"}`} />
      </a>
      <div className="flex items-center justify-between gap-3 p-4">
        <h3 className="font-kids text-lg font-bold"><a href={coloringPagePath(p)} className="hover:underline">{p.title}</a></h3>
        {p.file ? (
          <a href={p.file} download className="inline-flex shrink-0 items-center gap-1 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
            <Download className="h-4 w-4" /> Free
          </a>
        ) : (
          <span className="shrink-0 rounded-full bg-secondary px-3 py-1 text-sm font-semibold text-primary">Coming soon</span>
        )}
      </div>
    </article>
  );
}
