import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: ["@/assets/css/tailwind.css"],
  modules: ["@nuxt/eslint", "@nuxt/fonts"],
  vite: {
    plugins: [tailwindcss()],
  },
  app: {
    head: {
      title: "Xinx Music Archive - Electronic Music Producer",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content:
            "Discover Xinx Music archive featuring electronic music, dubstep, and experimental sounds. Listen to EPs, singles, and remixes from underground electronic producer Xinx.",
        },
        {
          name: "keywords",
          content:
            "Xinx Music, electronic music, dubstep, experimental music, underground music, music producer, electronic beats, remix, EP, single",
        },
        { name: "author", content: "Xinx" },
        { name: "robots", content: "index, follow" },
        { name: "language", content: "en" },
        { name: "theme-color", content: "#0a0a0a" },

        // Open Graph tags
        { property: "og:type", content: "website" },
        {
          property: "og:title",
          content: "Xinx Music Archive - Electronic Music Producer",
        },
        {
          property: "og:description",
          content:
            "Discover Xinx Music archive featuring electronic music, dubstep, and experimental sounds. Listen to EPs, singles, and remixes.",
        },
        { property: "og:image", content: "/ogImage.png" },
        { property: "og:url", content: "https://xinxmusic.com" },
        { property: "og:site_name", content: "Xinx Music" },

        // Twitter Card tags
        { name: "twitter:card", content: "summary_large_image" },
        {
          name: "twitter:title",
          content: "Xinx Music Archive - Electronic Music Producer",
        },
        {
          name: "twitter:description",
          content:
            "Discover Xinx Music archive featuring electronic music, dubstep, and experimental sounds.",
        },
        { name: "twitter:image", content: "/ogImage.png" },

        // Additional SEO tags
        { name: "format-detection", content: "telephone=no" },
        { name: "msapplication-TileColor", content: "#0a0a0a" },
        { name: "mobile-web-app-capable", content: "yes" },
        {
          name: "apple-mobile-web-app-status-bar-style",
          content: "black-translucent",
        },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "canonical", href: "https://xinxmusic.com" },
        { rel: "preconnect", href: "https://media.xinxmusic.com" },
        { rel: "dns-prefetch", href: "https://media.xinxmusic.com" },
      ],
      script: [
        {
          type: "application/ld+json",
          innerHTML: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MusicGroup",
            name: "Xinx",
            url: "https://xinxmusic.com",
            genre: ["Electronic", "Dubstep", "Experimental"],
            description:
              "Underground electronic music producer and DJ specializing in dubstep and experimental electronic sounds",
            image: "https://xinxmusic.com/ogImage.png",
            sameAs: ["https://xinxmusic.com"],
            member: {
              "@type": "Person",
              name: "Xinx",
              jobTitle: "Music Producer",
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": "https://xinxmusic.com",
            },
          }),
        },
      ],
    },
  },
  nitro: {
    prerender: {
      routes: ["/sitemap.xml", "/robots.txt"],
    },
  },
});
