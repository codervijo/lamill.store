import { useState } from "react";
import { Menu, X } from "lucide-react";
import { navLinks } from "../../config/site";
import { href, isActive } from "../../lib/paths";

/** Mobile menu toggle + drawer (island). Desktop nav is static in SiteLayout.astro. */
export function MobileNav({ currentPath }: { currentPath: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        className="rounded-md p-2 text-primary md:hidden"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        {open ? <X /> : <Menu />}
      </button>
      {open && (
        <nav className="absolute inset-x-0 top-full border-t border-border bg-background/90 px-4 pb-3 backdrop-blur md:hidden" aria-label="Mobile">
          {navLinks.map((l) => (
            <a
              key={l.to}
              href={href(l.to)}
              onClick={() => setOpen(false)}
              className={`block rounded-md px-3 py-3 font-medium ${isActive(currentPath, l.to) ? "bg-secondary text-primary" : "text-foreground"}`}
            >
              {l.label}
            </a>
          ))}
        </nav>
      )}
    </>
  );
}
