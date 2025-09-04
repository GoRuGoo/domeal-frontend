import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "do!meal ドミトリー×自炊",
    short_name: "do!meal",
    description: "The App elminates the hassle with cooking at a dormitory",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#EFB034FF",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
