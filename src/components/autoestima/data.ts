/* Autoestima Hair & Body Beauty & Cosmetics
   Tudo o que vem do briefing da cliente vive aqui. Para atualizar o site
   (fotos, links, contactos) basta mexer neste ficheiro.

   Fotos: pôr os ficheiros em public/autoestima/ e preencher os campos
   `photo` / `src` com o caminho, por exemplo "/autoestima/portfolio-01.jpg".
   Enquanto um campo estiver vazio, o site mostra uma arte lilás no lugar. */

export const brand = {
  name: "Autoestima",
  fullName: "Autoestima Hair & Body Beauty & Cosmetics",
  tagline: "Hair & Body · Beauty & Cosmetics",
  slogan: "O espaço onde a sua beleza se destaca.",
  since: 2022,
  founder: "Celmira Nascimento",
  /* Logótipo oficial (PNG/SVG com fundo transparente). Vazio = wordmark tipográfico. */
  logo: "",
  /* Foto principal do topo (vertical, de preferência). Vazio = espelho lilás animado. */
  heroPhoto: "",
};

export const links = {
  instagram: "https://www.instagram.com/autoestimacosmo/",
  instagramHandle: "@autoestimacosmo",
  instagramDm: "https://ig.me/m/autoestimacosmo",
  site: "https://www.autoestima.store/",
  /* Link da página do salão no Treatwell. Vazio = as marcações vão para o WhatsApp. */
  treatwell: "",
  /* Só dígitos com indicativo, ex.: "351912345678". Vazio = sem botão de WhatsApp. */
  whatsapp: "351939211910",
  whatsappLabel: "939 211 910",
  /* Telefone fixo, como aparece no letreiro */
  phone: "214 026 548",
  email: "",
};

/* Identificação legal do responsável pelo tratamento de dados (RGPD).
   Preencher com os dados da empresa da cliente: o que ficar vazio não aparece
   nas páginas de privacidade. O email é o contacto para pedidos de dados. */
export const legal = {
  name: "",
  nif: "",
  address: "",
  email: "",
  updated: "16 de outubro de 2026",
};

/* Horário que está no painel da porta do salão */
export const hours = [
  {
    days: "Segunda a sábado",
    short: "Seg a sáb",
    label: "10h às 19h",
    opens: "10:00",
    closes: "19:00",
    schema: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  },
  { days: "Domingo", short: "Dom", label: "11h às 15h", opens: "11:00", closes: "15:00", schema: ["Sunday"] },
];

export const phoneHref = `tel:+351${links.phone.replace(/\s/g, "")}`;

export const whatsappHref = (text = "Olá! Gostava de marcar uma visita na Autoestima.") =>
  `https://wa.me/${links.whatsapp}?text=${encodeURIComponent(text)}`;

/* Marcações: Treatwell se houver link, senão WhatsApp, senão Instagram.
   `where` junta o espaço à mensagem, ex.: "em Odivelas". */
export const bookingFor = (where = "") =>
  links.treatwell ||
  (links.whatsapp
    ? whatsappHref(`Olá! Gostava de marcar uma visita na Autoestima${where ? ` ${where}` : ""}.`)
    : links.instagramDm);
export const bookingHref = bookingFor();
export const bookingLabel = links.treatwell
  ? "Marcar no Treatwell"
  : links.whatsapp
    ? "Marcar pelo WhatsApp"
    : "Marcar visita";

/* Fotos reais do salão enviadas pela cliente */
export const salon = {
  team: { src: "/autoestima/salao/equipa-salao.webp", w: 1400, h: 933, alt: "A equipa da Autoestima no salão" },
  teamTools: {
    src: "/autoestima/salao/equipa.webp",
    w: 1200,
    h: 1200,
    alt: "A equipa da Autoestima com pentes e secadores, em frente ao logótipo do salão",
  },
  facade: {
    src: "/autoestima/salao/fachada.webp",
    w: 1400,
    h: 788,
    alt: "Fachada da Autoestima, com o letreiro lilás: cabeleireiro unissexo e estética",
  },
};

export type Space = {
  id: string;
  city: string;
  /* "em Odivelas", "na Pontinha" */
  inCity: string;
  since: number;
  title: string;
  text: string;
  focus: string[];
  /* Morada completa, se a cliente a quiser mostrar. */
  address: string;
  photo: string;
  maps: string;
};

export const spaces: Space[] = [
  {
    id: "odivelas",
    city: "Odivelas",
    inCity: "em Odivelas",
    since: 2022,
    title: "Onde tudo começou",
    text: "Abriu como loja de cosméticos e cresceu com as profissionais que foram chegando. Hoje é salão completo: cabelo, tranças, unhas e cosmética, no mesmo espaço.",
    focus: ["Cabelo", "Tranças & Afro", "Unhas", "Cosméticos"],
    address: "",
    photo: "",
    maps: "https://www.google.com/maps/search/?api=1&query=Autoestima+Hair+%26+Body+Odivelas",
  },
  {
    id: "pontinha",
    city: "Pontinha",
    inCity: "na Pontinha",
    since: 2025,
    title: "Estética avançada",
    text: "O espaço mais recente, pensado para tratamentos de rosto e corpo: limpeza de pele, microagulhamento, massagens, drenagem e micropigmentação.",
    focus: ["Estética facial", "Corpo", "Micropigmentação", "Depilação a laser"],
    address: "",
    photo: "",
    maps: "https://www.google.com/maps/search/?api=1&query=Autoestima+Hair+%26+Body+Pontinha",
  },
];

export const timeline = [
  {
    year: "1997",
    place: "Angola",
    title: "O sonho",
    text: "Numa viagem a Angola, o primeiro trabalho num salão de beleza, como ajudante de cabeleireira. Nasce a vontade de um dia ter um espaço próprio.",
  },
  {
    year: "2022",
    place: "Odivelas",
    title: "A primeira porta",
    text: "Para ajudar um familiar sem emprego, o sonho passa à prática: abre em Odivelas, primeiro como loja de cosméticos.",
  },
  {
    year: "Depois",
    place: "Odivelas",
    title: "O salão ganha vida",
    text: "Chegam cabeleireiras, trancistas e esteticistas. A loja ramifica e torna-se salão de beleza, estética e cosméticos.",
  },
  {
    year: "2025",
    place: "Pontinha",
    title: "Um novo espaço",
    text: "Abre a Pontinha, dedicada à estética avançada e à beleza.",
  },
];

export type Category = {
  id: string;
  label: string;
  services: string[];
};

export const categories: Category[] = [
  {
    id: "cabelo",
    label: "Cabelo",
    services: [
      "Reconstrução capilar com exossomo",
      "Botox capilar",
      "Escova progressiva",
      "Hidratação",
      "Coloração",
      "Madeixas",
      "Corte feminino",
      "Brushing",
      "Lavagem",
      "Extensão capilar fio a fio",
      "Tissagem (método americano)",
      "Tissagem (método costurado)",
    ],
  },
  {
    id: "afro",
    label: "Tranças & Afro",
    services: ["Tranças africanas (diversas)", "Box braids e boho braids", "Permanente afro", "Soltura de cachos"],
  },
  {
    id: "rosto",
    label: "Rosto & Olhar",
    services: [
      "Limpeza de pele",
      "Microagulhamento",
      "Micropigmentação de sobrancelhas",
      "Design de sobrancelhas",
      "Epilação de sobrancelhas (linha, cera e pinça)",
      "Henna",
      "Aplicação de cílios (tufos)",
    ],
  },
  {
    id: "corpo",
    label: "Corpo",
    services: [
      "Massagem redutora",
      "Massagem relaxante",
      "Drenagem linfática",
      "Aplicação de enzimas (gordura localizada)",
    ],
  },
  { id: "unhas", label: "Unhas", services: ["Manicure", "Pedicure"] },
  { id: "depilacao", label: "Depilação", services: ["Depilação a laser", "Depilação a cera"] },
  { id: "make", label: "Maquilhagem & Penteados", services: ["Maquilhagem", "Penteados para cerimónia"] },
];

export const totalServices = categories.reduce((n, c) => n + c.services.length, 0);

export type Signature = {
  name: string;
  category: string;
  text: string;
  /* Paleta da arte de substituição (enquanto não há foto). */
  hue: number;
  photo: string;
};

/* Os serviços "carro-chefe" indicados pela cliente. */
export const signatures: Signature[] = [
  {
    name: "Reconstrução capilar",
    category: "Cabelo · com exossomo",
    text: "Tratamento profundo para fios fragilizados, com exossomo para devolver força, brilho e toque macio.",
    hue: 268,
    photo: "",
  },
  {
    name: "Tranças",
    category: "Tranças & Afro",
    text: "Tranças africanas, box braids e boho braids feitas por trancistas com mão firme e muito cuidado.",
    hue: 290,
    photo: "",
  },
  {
    name: "Cachos permanentes",
    category: "Tranças & Afro",
    text: "Permanente afro para cachos definidos que duram, e soltura de cachos para quem quer movimento.",
    hue: 250,
    photo: "",
  },
  {
    name: "Escova progressiva",
    category: "Cabelo",
    text: "Fios alinhados, sem frizz e fáceis de pentear, com acabamento natural.",
    hue: 278,
    photo: "",
  },
  {
    name: "Micropigmentação",
    category: "Sobrancelhas",
    text: "Sobrancelhas desenhadas fio a fio, pensadas para o seu rosto, para acordar já com o olhar pronto.",
    hue: 300,
    photo: "/autoestima/trabalhos/micropigmentacao.webp",
  },
  {
    name: "Limpeza de pele",
    category: "Estética facial",
    text: "Higienização profunda, extração e hidratação para uma pele limpa, luminosa e respirada.",
    hue: 262,
    photo: "",
  },
  {
    name: "Massagem redutora",
    category: "Corpo",
    text: "Massagem modeladora para ativar a circulação e trabalhar as zonas que mais a incomodam.",
    hue: 284,
    photo: "",
  },
  {
    name: "Manicure",
    category: "Unhas",
    text: "Mãos cuidadas ao detalhe, do tratamento da cutícula ao acabamento perfeito.",
    hue: 312,
    photo: "",
  },
];

/* Simulador "até 3 profissionais em simultâneo".
   Duração aproximada em minutos, só para ilustrar. Cada zona do corpo só
   pode ter um serviço de cada vez, e no máximo 3 profissionais por cliente. */
export type ComboService = { id: string; name: string; zone: Zone; minutes: number };
export type Zone = "cabelo" | "maos" | "pes" | "rosto";

export const zoneLabel: Record<Zone, string> = {
  cabelo: "Cabelo",
  maos: "Mãos",
  pes: "Pés",
  rosto: "Rosto & olhar",
};

export const comboServices: ComboService[] = [
  { id: "trancas", name: "Box braids", zone: "cabelo", minutes: 240 },
  { id: "progressiva", name: "Escova progressiva", zone: "cabelo", minutes: 150 },
  { id: "reconstrucao", name: "Reconstrução capilar", zone: "cabelo", minutes: 90 },
  { id: "coloracao", name: "Coloração", zone: "cabelo", minutes: 120 },
  { id: "manicure", name: "Manicure", zone: "maos", minutes: 45 },
  { id: "pedicure", name: "Pedicure", zone: "pes", minutes: 60 },
  { id: "sobrancelhas", name: "Design de sobrancelhas", zone: "rosto", minutes: 30 },
  { id: "cilios", name: "Aplicação de cílios", zone: "rosto", minutes: 45 },
  { id: "henna", name: "Henna", zone: "rosto", minutes: 30 },
];

export const defaultCombo = ["trancas", "manicure", "pedicure"];

export type Member = { name: string; role: string; skills: string[]; founder?: boolean; photo: string };

export const team: Member[] = [
  { name: "Celmira Nascimento", role: "Fundadora", skills: ["Estética", "Cabelo"], founder: true, photo: "" },
  { name: "Bindiya Lama", role: "Esteticista & cabeleireira", skills: ["Estética", "Unhas", "Cabelo"], photo: "" },
  { name: "Claudia", role: "Trancista & manicure", skills: ["Tranças", "Unhas"], photo: "" },
  { name: "Patricia", role: "Trancista & manicure", skills: ["Tranças", "Unhas"], photo: "" },
  { name: "Lara", role: "Trancista & maquilhadora", skills: ["Tranças", "Maquilhagem"], photo: "" },
  { name: "Adelaide", role: "Trancista", skills: ["Tranças"], photo: "" },
  {
    name: "Ana Novais",
    role: "Trancista, maquilhadora & manicure",
    skills: ["Tranças", "Maquilhagem", "Unhas"],
    photo: "",
  },
];

export const teamSkills = ["Todas", "Estética", "Cabelo", "Tranças", "Unhas", "Maquilhagem"];

export type Shot = {
  src: string;
  /* versão grande para o lightbox */
  full?: string;
  alt: string;
  label: string;
  /* ocupa duas linhas no mosaico */
  tall?: boolean;
};

/* Portfólio enviado pela cliente. As fotos ficam em public/autoestima/trabalhos/,
   em duas medidas: 900px para a grelha e 1600px (-full) para o lightbox. */
const t = (name: string) => ({
  src: `/autoestima/trabalhos/${name}.webp`,
  full: `/autoestima/trabalhos/${name}-full.webp`,
});

export const gallery: Shot[] = [
  { ...t("coloracao"), alt: "Coloração com pontas iluminadas feita na Autoestima", label: "Coloração", tall: true },
  { ...t("cilios-sobrancelhas"), alt: "Extensão de cílios e design de sobrancelhas", label: "Cílios & sobrancelhas" },
  { ...t("micropigmentacao"), alt: "Sobrancelhas logo após a micropigmentação", label: "Micropigmentação" },
  { ...t("madeixas"), alt: "Madeixas acobreadas com corte em camadas", label: "Madeixas", tall: true },
  {
    ...t("micropigmentacao-pelicula"),
    alt: "Sobrancelhas micropigmentadas em fase de cicatrização",
    label: "Sobrancelhas",
  },
];

/* Antes e depois tirado do vídeo da cliente (tratamento corporal), alinhado
   para o comparador. */
export const beforeAfter = {
  before: "/autoestima/trabalhos/antes.webp",
  after: "/autoestima/trabalhos/depois.webp",
  alt: "abdómen de uma cliente",
};

export const faqs = [
  {
    q: "Como faço a marcação?",
    a: "Envie-nos mensagem pelo WhatsApp para o 939 211 910, ligue para o 214 026 548 ou fale connosco no Instagram. Diga-nos que serviços quer fazer e encontramos o melhor horário.",
  },
  {
    q: "Qual é o horário?",
    a: "De segunda a sábado, das 10h às 19h, e ao domingo, das 11h às 15h.",
  },
  {
    q: "Também atendem homens?",
    a: "Sim. Somos cabeleireiro unissexo e estética: toda a gente é bem-vinda.",
  },
  {
    q: "Posso fazer vários serviços ao mesmo tempo?",
    a: "Sim, é a nossa especialidade. Conforme o que precisa, podem trabalhar até 3 profissionais em simultâneo: por exemplo tranças, manicure e pedicure na mesma visita. Poupa horas.",
  },
  {
    q: "Onde ficam os espaços?",
    a: "Temos dois espaços: Odivelas, onde tudo começou, com cabelo, tranças, unhas e cosméticos, e a Pontinha, dedicada à estética avançada de rosto e corpo.",
  },
  {
    q: "As profissionais são certificadas?",
    a: "Sim. A equipa tem certificação nas suas áreas de trabalho, da estética ao cabelo e às tranças.",
  },
  {
    q: "Trabalham com cabelo afro e cacheado?",
    a: "Muito. Tranças africanas, box braids, boho braids, permanente afro e soltura de cachos fazem parte do nosso dia a dia, com trancistas experientes.",
  },
  {
    q: "Também vendem cosméticos?",
    a: "Sim. A Autoestima nasceu como loja de cosméticos, e os cosméticos continuam a fazer parte da casa. Pergunte-nos o que levar para manter os resultados.",
  },
];

export const marquee = [
  "Tranças africanas",
  "Reconstrução capilar",
  "Limpeza de pele",
  "Box braids",
  "Micropigmentação",
  "Escova progressiva",
  "Massagem redutora",
  "Manicure & pedicure",
  "Permanente afro",
  "Drenagem linfática",
  "Depilação a laser",
  "Maquilhagem",
];
