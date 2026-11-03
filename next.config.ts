import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  poweredByHeader: false,
  experimental: {
    // Only ship the icons and motion features we actually import.
    optimizePackageImports: ['lucide-react', 'motion'],
  },
};

export default nextConfig;
