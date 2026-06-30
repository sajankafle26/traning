/** @type {import('next').NextConfig} */
console.log("--- NEXT CONFIG LOADED ---");

const nextConfig = {
  reactCompiler: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "i.pravatar.cc" },
      { protocol: "https", hostname: "ui-avatars.com" },
      { protocol: "https", hostname: "img.youtube.com" },
      { protocol: "https", hostname: "sangalotech.com" },
      { protocol: "http", hostname: "localhost" },
    ],
  },
  devIndicators: false,
};

export default nextConfig;
