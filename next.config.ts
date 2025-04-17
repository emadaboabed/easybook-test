import type { NextConfig } from "next";
import i18nConfig from "./next-i18next.config";
const { i18n } = i18nConfig;

const nextConfig: NextConfig = {
  experimental: {},
  i18n,

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
