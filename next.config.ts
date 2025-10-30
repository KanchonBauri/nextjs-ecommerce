
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Turbopack বন্ধ করার জন্য
  experimental: {
    turbo: false,
  },
  reactStrictMode: true,
};

export default nextConfig;
