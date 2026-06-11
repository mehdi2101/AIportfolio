/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Placeholder images are served from picsum.photos during development.
    // REPLACE: once you swap in real images under /public/images, this
    // remote pattern can be removed.
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
    ],
  },
};

export default nextConfig;
