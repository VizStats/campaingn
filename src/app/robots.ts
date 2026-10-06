import type { MetadataRoute } from "next";
import { ALLOW_INDEXING } from "@/content/indexing";
import { site } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  if (!ALLOW_INDEXING) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
