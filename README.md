# Autoestima Hair & Body · Landing page

Landing page do salão **Autoestima Hair & Body Beauty & Cosmetics** (Odivelas e Pontinha).
Next.js 15 + React 19 + TypeScript, CSS próprio (lilás, branco e preto), scroll suave com Lenis.

## Correr localmente

```bash
npm install
npm run dev
```

Abre http://localhost:3000

## Onde mexer

- `src/components/autoestima/data.ts`: tudo o que vem do briefing (serviços, equipa, espaços, links, fotos).
  - `links.treatwell` e `links.whatsapp`: enquanto estiverem vazios, as marcações vão para o Instagram.
  - Fotos: ficam em `public/autoestima/trabalhos/` (WebP, 900px para a grelha e `-full` 1600px para o lightbox). Onde um campo `photo`/`src` está vazio aparece uma arte lilás.
- `src/components/autoestima/autoestima.css`: o design todo (cores em `.ae`, no topo).
- `src/app/layout.tsx`: título, descrição e imagem de partilha. `PREVIEW = true` deixa o site fora do Google; muda para `false` quando a cliente aprovar.

## Publicar

Na Vercel: importar este repositório e carregar em Deploy. Cada push para `main` publica sozinho.
