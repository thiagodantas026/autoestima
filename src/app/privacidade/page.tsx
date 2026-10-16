import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/autoestima/LegalPage";
import { brand, legal, links, spaces } from "@/components/autoestima/data";
import { homePath } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de Privacidade · Autoestima Hair & Body",
  description: "Como a Autoestima Hair & Body trata os dados pessoais, de acordo com o RGPD.",
  alternates: { canonical: `${homePath}privacidade/` },
};

const contactEmail = legal.email || links.email;

function Contact() {
  if (contactEmail) {
    return <a href={`mailto:${contactEmail}`}>{contactEmail}</a>;
  }
  return (
    <>
      mensagem no Instagram{" "}
      <a href={links.instagramDm} target="_blank" rel="noopener noreferrer">
        {links.instagramHandle}
      </a>
    </>
  );
}

export default function Privacidade() {
  return (
    <LegalPage kicker="RGPD" title="Política de Privacidade">
      <p>
        A sua privacidade é importante para nós. Esta política explica que dados pessoais tratamos quando visita este
        site ou nos contacta, para que os usamos e quais são os seus direitos, de acordo com o Regulamento Geral sobre a
        Proteção de Dados (Regulamento (UE) 2016/679, &quot;RGPD&quot;) e a Lei n.º 58/2019.
      </p>

      <h2>1. Quem é o responsável pelos seus dados</h2>
      <p>
        O responsável pelo tratamento é <strong>{legal.name || brand.fullName}</strong>, com espaços em{" "}
        {spaces.map((s) => s.city).join(" e ")}.
      </p>
      <ul>
        {legal.nif && <li>NIF: {legal.nif}</li>}
        {legal.address && <li>Morada: {legal.address}</li>}
        <li>
          Contacto para questões de privacidade: <Contact />
        </li>
      </ul>

      <h2>2. Que dados tratamos</h2>
      <ul>
        <li>
          <strong>Navegação no site.</strong> Este site não tem formulários, não pede dados pessoais e não usa cookies
          nem ferramentas de estatística ou publicidade. O serviço que aloja o site pode registar dados técnicos de
          acesso, como o endereço IP, o navegador e a data e hora do pedido, para garantir a segurança e o funcionamento
          do site.
        </li>
        <li>
          <strong>Contactos e marcações.</strong> Quando fala connosco para marcar ou tirar dúvidas (Instagram,
          WhatsApp, Treatwell, telefone, email ou presencialmente), tratamos os dados que nos dá: nome, contacto,
          serviços pretendidos, datas e o conteúdo das mensagens.
        </li>
      </ul>

      <h2>3. Para que usamos os dados e com que fundamento</h2>
      <ul>
        <li>
          Responder aos seus pedidos e gerir as suas marcações: diligências pré-contratuais e execução do contrato
          (artigo 6.º, n.º 1, alínea b) do RGPD).
        </li>
        <li>
          Cumprir obrigações legais, como a faturação: cumprimento de obrigação legal (artigo 6.º, n.º 1, alínea c)).
        </li>
        <li>Garantir a segurança e o bom funcionamento do site: interesse legítimo (artigo 6.º, n.º 1, alínea f)).</li>
      </ul>
      <p>
        Não vendemos os seus dados, não os usamos para publicidade sem o seu consentimento e não tomamos decisões
        automatizadas sobre si.
      </p>

      <h2>4. Com quem partilhamos</h2>
      <ul>
        <li>
          As plataformas que escolhe para falar connosco (Instagram e WhatsApp, da Meta, e Treatwell) tratam os dados
          também segundo as suas próprias políticas de privacidade.
        </li>
        <li>O prestador que aloja este site, apenas para o pôr a funcionar.</li>
        <li>Autoridades públicas, quando a lei o exigir.</li>
      </ul>
      <p>
        Alguns destes prestadores podem tratar dados fora do Espaço Económico Europeu. Nesses casos, a transferência
        segue as garantias previstas no RGPD, como decisões de adequação da Comissão Europeia ou cláusulas contratuais
        tipo.
      </p>

      <h2>5. Durante quanto tempo guardamos os dados</h2>
      <ul>
        <li>
          Mensagens e dados de marcação: durante o tempo necessário para gerir a marcação e a relação consigo. Depois
          são apagados.
        </li>
        <li>Documentos de faturação: pelo prazo que a lei fiscal obriga a conservar.</li>
        <li>Registos técnicos de acesso: pelo período definido pelo prestador de alojamento.</li>
      </ul>

      <h2>6. Os seus direitos</h2>
      <p>
        Pode, a qualquer momento, pedir acesso aos seus dados, a sua retificação ou apagamento, a limitação do
        tratamento, a portabilidade e opor-se ao tratamento. Quando o tratamento se basear no seu consentimento, pode
        retirá-lo quando quiser, sem afetar o que foi feito antes.
      </p>
      <p>
        Para exercer estes direitos contacte-nos por <Contact />. Respondemos no prazo máximo de um mês. Tem também o
        direito de apresentar reclamação à Comissão Nacional de Proteção de Dados (
        <a href="https://www.cnpd.pt" target="_blank" rel="noopener noreferrer">
          www.cnpd.pt
        </a>
        ).
      </p>

      <h2>7. Fotografias de trabalhos</h2>
      <p>
        As fotografias publicadas no site mostram trabalhos feitos nos nossos espaços. Se aparece numa delas e não quer
        que continue publicada, fale connosco e retiramo-la.
      </p>

      <h2>8. Cookies</h2>
      <p>
        Este site não usa cookies. Os detalhes estão na <Link href="/cookies">Política de Cookies</Link>.
      </p>

      <h2>9. Alterações a esta política</h2>
      <p>
        Podemos atualizar esta política quando a lei ou a forma como trabalhamos mudarem. A data no topo indica a versão
        em vigor.
      </p>
    </LegalPage>
  );
}
