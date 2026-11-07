import { useState } from "react";
import { Download } from "lucide-react";
import { collections, type Printable } from "../../config/site";

/** Printable collections + optional email prompt after a download (island). */
export function KidsCollections() {
  const [downloaded, setDownloaded] = useState<string | null>(null);
  return (
    <>
      {collections.map((c) => (
        <section key={c.id} id={c.id} className="mx-auto mt-12 max-w-6xl scroll-mt-24 px-4">
          <h2 className="font-kids text-3xl font-bold text-primary">{c.emoji} {c.title}</h2>
          <p className="mt-1 text-muted-foreground">{c.blurb}</p>
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {c.printables.map((p) => (
              <PrintableCard key={p.id} p={p} onDownload={() => setDownloaded(p.title)} />
            ))}
          </div>
        </section>
      ))}

      {downloaded && <EmailPrompt title={downloaded} onClose={() => setDownloaded(null)} />}
    </>
  );
}

function PrintableCard({ p, onDownload }: { p: Printable; onDownload: () => void }) {
  return (
    <article className="overflow-hidden rounded-3xl border-2 border-border bg-card">
      <div className="bg-muted p-4">
        <img src={p.preview} alt={`${p.title} preview`} loading="lazy" className={`mx-auto h-56 rounded-lg bg-card ${p.file ? "" : "opacity-40"}`} />
      </div>
      <div className="flex items-center justify-between gap-3 p-4">
        <h3 className="font-kids text-lg font-bold">{p.title}</h3>
        {p.file ? (
          <a href={p.file} download onClick={onDownload} className="inline-flex shrink-0 items-center gap-1 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
            <Download className="h-4 w-4" /> Free
          </a>
        ) : (
          <span className="shrink-0 rounded-full bg-secondary px-3 py-1 text-sm font-semibold text-primary">Coming soon</span>
        )}
      </div>
    </article>
  );
}

function EmailPrompt({ title, onClose }: { title: string; onClose: () => void }) {
  const [sent, setSent] = useState(false);
  return (
    <div role="dialog" aria-label="Optional email signup" className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-md rounded-2xl border border-border bg-card p-5 shadow-card">
      {sent ? (
        <p className="font-kids font-semibold text-primary">Thanks! We’ll let you know when new printables arrive.</p>
      ) : (
        <>
          <p className="font-kids text-lg font-bold text-primary">Enjoy “{title}”!</p>
          <p className="mt-1 text-sm text-muted-foreground">Want new free printables by email? Totally optional.</p>
          {/* TODO: form has no backend — source only flips local state. See src/lib/server-todo.md. */}
          <form className="mt-3 flex gap-2" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
            <input type="email" required placeholder="you@email.com" className="min-w-0 flex-1 rounded-lg border border-input bg-background px-3 py-2" />
            <button className="rounded-lg bg-primary px-4 py-2 font-semibold text-primary-foreground">Sign up</button>
          </form>
        </>
      )}
      <button onClick={onClose} className="mt-3 text-sm text-muted-foreground underline">No thanks</button>
    </div>
  );
}
