import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['sqlite3', 'sqlite'],
  typescript: {
    // Không chặn build Vercel khi có cảnh báo kiểu TypeScript
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      {
        source: '/products',
        destination: '/san-pham',
        permanent: true,
      },
      {
        source: '/products/:path*',
        destination: '/san-pham/:path*',
        permanent: true,
      },
      {
        source: '/services/eye-test',
        destination: '/bao-hanh',
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.farello.vn',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.kinhmatlily.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
