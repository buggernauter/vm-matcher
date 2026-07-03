import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  compiler: {
    styledComponents: true,
  },
  async redirects() {
    return [
      { source: '/', destination: '/fotbolls-vm-2026', permanent: true },
    ];
  },
};

export default nextConfig;
