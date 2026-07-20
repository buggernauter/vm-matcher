import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  compiler: {
    styledComponents: true,
  },
  async redirects() {
    return [
      { source: '/', destination: '/spanien-varldsmastare', permanent: true },
    ];
  },
};

export default nextConfig;
