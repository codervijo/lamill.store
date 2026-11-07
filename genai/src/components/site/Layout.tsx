import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/config/site";

export function Logo({ className = "h-9 w-9" }: { className?: string }) {
  // Folded "L" mark
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <rect width="40" height="40" rx="9" className="fill-primary" />
      <path d="M12 8h7v17h-7z" className="fill-primary-foreground" />
      <path d="M12 25h7l-7 7z" className="fill-brand-light" />
      <path d="M19 25h10v7H12z" className="fill-primary-foreground" opacity=".85" />
    </svg>
  );
}

export function SiteLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
            <Logo />
            <span className="font-display text-xl font-semibold text-primary">LaMill Store</span>
          </Link>
          <nav className="hidden gap-1 md:flex" aria-label="Main">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                activeOptions={{ exact: true }}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary"
                activeProps={{ className: "text-primary bg-secondary" }}
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <button
            className="rounded-md p-2 text-primary md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
        {open && (
          <nav className="border-t border-border px-4 pb-3 md:hidden" aria-label="Mobile">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                activeOptions={{ exact: true }}
                className="block rounded-md px-3 py-3 font-medium text-foreground"
                activeProps={{ className: "bg-secondary text-primary" }}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        )}
      </header>
      <main>{children}</main>
      <footer className="mt-20 border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} LaMill Store · lamill.store</span>
          <span>Made with care for curious families.</span>
        </div>
      </footer>
    </div>
  );
}
