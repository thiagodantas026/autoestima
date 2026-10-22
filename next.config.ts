import type { NextConfig } from "next";

/* Três formas de publicar:
   - HOSTING=1 (npm run build:hosting): site estático na raiz de
     autoestimahairbody.pt, para carregar na Hostinger (public_html).
   - GITHUB_PAGES=1 (npm run build:pages): versão estática de pré-visualização
     em thiagodantas026.github.io/autoestima/.
   - Sem variável: o build normal, que é o que a Vercel usa. */
const pages = process.env.GITHUB_PAGES === "1";
const hosting = process.env.HOSTING === "1";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  ...(pages || hosting ? { output: "export", trailingSlash: true, images: { unoptimized: true } } : {}),
  ...(pages ? { basePath: "/autoestima" } : {}),
};

export default nextConfig;
