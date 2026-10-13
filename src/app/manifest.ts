import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "aiDOCS",
    short_name: "aiDOCS",
    description: "Documents into reviewed accounting rows for Georgian teams.",
    start_url: "/",
    display: "standalone",
    background_color: "#fbfcfc",
    theme_color: "#5b5bf7",
    icons: [
      { src: "/icon.svg?v=17-20260811", type: "image/svg+xml", sizes: "any" },
    ],
  };
}
