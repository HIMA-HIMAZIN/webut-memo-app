import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['lh3.googleusercontent.com'], // ここに許可するホスト名を追加
  },
};

export default nextConfig;
