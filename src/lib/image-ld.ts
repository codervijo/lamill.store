// ImageObject JSON-LD comes from imagemill (src/data/images.jsonld.json);
// override its description with the page's image-search alt text.
export function withDescription(ld: unknown, description: string): unknown {
  return ld && typeof ld === "object" ? { ...(ld as Record<string, unknown>), description } : ld;
}
