/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@fulfillx/ui', '@fulfillx/contracts', '@fulfillx/sdk'],
  experimental: {
    optimizePackageImports: ['@fulfillx/ui'],
  },
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api',
  },
}

module.exports = nextConfig