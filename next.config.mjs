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
      { protocol: "https", hostname: "phwyqhfesmtrzxtqkuzf.supabase.co" },
      { protocol: "https", hostname: "placehold.co" },
      { protocol: "https", hostname: "via.placeholder.com" },
      { protocol: "http", hostname: "localhost" },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ];
  },
  devIndicators: false,
};

export default nextConfig;
