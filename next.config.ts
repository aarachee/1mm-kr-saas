import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/pdfcut",
        destination: "https://pdfcut.aarachee.workers.dev",
      },
      {
        source: "/pdfcut/:path*",
        destination: "https://pdfcut.aarachee.workers.dev/:path*",
      },
    ];
  },
};

export default nextConfig;
