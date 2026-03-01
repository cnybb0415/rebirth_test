import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  outputFileTracingExcludes: {
    "*": ["./public/images/**", "./public/font/**"],
  },
};

export default nextConfig;
