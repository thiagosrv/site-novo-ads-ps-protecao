import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        // Covers the R2 Public Development URL (pub-<hash>.r2.dev). If a
        // custom domain is connected to the bucket later, add its hostname
        // here too — remotePatterns can't be derived from R2_PUBLIC_URL at
        // build time.
        hostname: "*.r2.dev",
      },
    ],
  },
  experimental: {
    serverActions: {
      // Default is 1MB; uploadCoverImage (src/lib/blog/actions.ts) allows
      // up to 8MB, so the framework guard needs matching headroom or real
      // cover photos never reach that check.
      bodySizeLimit: "10mb",
    },
  },
};

export default nextConfig;

// Exposes Cloudflare bindings (env vars, etc.) to `next dev` when running
// locally against the Workers runtime — no-op for `next build`/Vercel.
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
