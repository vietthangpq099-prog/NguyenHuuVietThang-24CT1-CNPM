import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
      // CDN Farello.vn — ảnh kính mắt thật từ thương hiệu Việt
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
