import type { NextConfig } from "next";
// import i18nConfig from "./next-i18next.config";   // ← remove this
// const { i18n } = i18nConfig;                      // ← and this

const nextConfig: NextConfig = {
  experimental: {},

  typescript: {
    ignoreBuildErrors: true,
  },

  eslint: {
    ignoreDuringBuilds: true,
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Set-Cookie",
            value: "SameSite=Strict; Secure; HttpOnly; Path=/",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
