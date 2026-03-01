import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  experimental: {
    outputFileTracingExcludes: {
      "*": ["./public/images/**", "./public/font/**"],
    },
  },
};

export default nextConfig;
