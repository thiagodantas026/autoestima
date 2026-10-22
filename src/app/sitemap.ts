import type { MetadataRoute } from "next";
import { homePath, siteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "privacidade/", "cookies/"].map((path) => ({
    url: new URL(`${homePath}${path}`, siteUrl).href,
    changeFrequency: "monthly",
    priority: path ? 0.3 : 1,
  }));
}
