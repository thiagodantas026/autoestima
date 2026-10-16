import type { NextConfig } from "next";

/* GITHUB_PAGES=1 (npm run build:pages) gera uma versão estática para
   thiagodantas026.github.io/autoestima/. Sem a variável fica o build normal,
   que é o que a Vercel usa. */
const pages = process.env.GITHUB_PAGES === "1";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  ...(pages ? { output: "export", basePath: "/autoestima", trailingSlash: true, images: { unoptimized: true } } : {}),
};

export default nextConfig;
