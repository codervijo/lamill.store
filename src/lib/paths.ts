// trailingSlash: 'always' (astro.config.mjs) — internal links must end in "/"
// or they 308-redirect.
export function href(path: string): string {
  return path.endsWith("/") ? path : `${path}/`;
}

export function isActive(current: string, path: string): boolean {
  return href(current) === href(path);
}
