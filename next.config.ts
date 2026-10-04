import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  compress: true,
  experimental: { useTypeScriptCli: false },
  async redirects() {
    return [{ source: "/neighborhoods/:slug", destination: "/localities/:slug", permanent: true }];
  },
};

export default nextConfig;
