/** @type {import('next').NextConfig} */
const isStaticExport = process.env.STATIC_EXPORT === "true";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig = {
  reactStrictMode: true,
  // Export 100% statique (GitHub Pages). La version serveur (Vercel, `next start`)
  // reste le mode par défaut : les routes API y sont actives.
  ...(isStaticExport
    ? {
        output: "export",
        trailingSlash: true,
        images: { unoptimized: true },
      }
    : {
        images: {
          remotePatterns: [
            { protocol: "https", hostname: "images.unsplash.com" },
            { protocol: "https", hostname: "plus.unsplash.com" },
            { protocol: "https", hostname: "images.pexels.com" },
            { protocol: "https", hostname: "i.pravatar.cc" },
          ],
        },
      }),
  basePath,
};

module.exports = nextConfig;
