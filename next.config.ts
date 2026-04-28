import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // 讓 build 產生一個 out 資料夾
  images: {
    unoptimized: true,
  },
  basePath: "/portfolio",
};

export default nextConfig;
