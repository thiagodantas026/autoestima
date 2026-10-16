/* Onde o site está publicado. GITHUB_PAGES=1 (npm run build:pages) gera a
   versão para thiagodantas026.github.io/autoestima/; na Vercel o build recebe
   o domínio de produção do projeto. Serve para os links partilhados
   (WhatsApp, Instagram) e os canonical apontarem para o sítio certo. */
const pages = process.env.GITHUB_PAGES === "1";
const host = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const siteUrl = pages
  ? "https://thiagodantas026.github.io"
  : host
    ? `https://${host}`
    : "https://autoestima.vercel.app";

/* Caminho da página inicial dentro do domínio, sempre com "/" no fim */
export const homePath = pages ? "/autoestima/" : "/";
