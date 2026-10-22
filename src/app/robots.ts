import type { MetadataRoute } from "next";
import { homePath, siteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: new URL(`${homePath}sitemap.xml`, siteUrl).href,
  };
}
