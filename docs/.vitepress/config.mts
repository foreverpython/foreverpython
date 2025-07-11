import { defineConfig, HeadConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Forever Python",
  description: "A hands-on Python blog — concise, fully-typed code you can run and tweak instantly.",
  head: [
    ["link", { rel: "icon", type: "image/png", href: "/favicon-96x96.png", sizes: "96x96" }],
    ["link", { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" }],
    ["link", { rel: "shortcut icon", href: "/favicon.ico" }],
    ["link", { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" }],
    ["link", { rel: "manifest", href: "/site.webmanifest" }],
  ],
  transformHead: ({ title, description }) => {
    const head: HeadConfig[] = [
      // Primary Meta
      ["meta", { name: "title", content: title }],
      ["meta", { name: "description", content: description }],

      // Open Graph
      ["meta", { property: "og:type", content: "website" }],
      ["meta", { property: "og:title", content: title }],
      ["meta", { property: "og:description", content: description }],
      ["meta", { property: "og:image", content: "/og_image.png" }],

      // Twitter Card
      ["meta", { name: "twitter:card", content: "summary_large_image" }],
      ["meta", { name: "twitter:title", content: title }],
      ["meta", { name: "twitter:description", content: description }],
      ["meta", { name: "twitter:image", content: "/og_image.png" }],
    ];
    return head;
  },
  vite: {
    server: {
      allowedHosts: ["localhost.mohanram.dev"],
      cors: true,
    },
  },
  sitemap: {
    hostname: "https://foreverpython.com",
  },
  lastUpdated: true,
  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
      { text: "Browse", link: "/browse" },
      { text: "Playground", link: "https://playground.foreverpython.com/lab" },
    ],
    logo: { light: "/logo-light.svg", dark: "/logo-dark.svg" },
    search: {
      provider: "local",
    },
    socialLinks: [{ icon: "github", link: "https://github.com/foreverpython/foreverpython" }],
  },
});
