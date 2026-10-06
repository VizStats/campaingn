import type { MetadataRoute } from "next";
import { candidate } from "@/content/facts";
import { site } from "@/content/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.title,
    short_name: candidate.callName,
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#fffdf8",
    theme_color: "#2a1a05",
    icons: [{ src: "/icon.png", sizes: "180x180", type: "image/png" }],
  };
}
