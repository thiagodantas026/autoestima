import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/autoestima/LegalPage";
import { homePath } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de Cookies · Autoestima Hair & Body",
  description: "Este site não usa cookies nem ferramentas de rastreio.",
  alternates: { canonical: `${homePath}cookies/` },
};

export default function Cookies() {
  return (
    <LegalPage kicker="Cookies" title="Política de Cookies">
      <h2>O que são cookies</h2>
      <p>
        Cookies são pequenos ficheiros que um site guarda no seu dispositivo para se lembrar de informação, por exemplo
        para medir visitas ou mostrar publicidade.
      </p>

      <h2>Este site não usa cookies</h2>
      <p>
        Não usamos cookies, nem ferramentas de estatística, publicidade ou rastreio, e não guardamos informação no seu
        navegador. Por isso não lhe pedimos consentimento nem mostramos um aviso de cookies.
      </p>
      <p>
        As fontes de letra e as imagens estão alojadas no próprio site: ao visitar a página, o seu navegador não faz
        pedidos a serviços de terceiros como o Google.
      </p>

      <h2>Ligações para outros sites</h2>
      <p>
        Quando carrega numa ligação para o Instagram, WhatsApp, Treatwell, Google Maps ou outro site, sai deste site. A
        partir daí aplicam-se as políticas de privacidade e de cookies desses serviços.
      </p>

      <h2>Alterações</h2>
      <p>
        Se um dia passarmos a usar cookies que não sejam estritamente necessários, só o faremos depois de lhe pedir
        consentimento, e atualizamos esta página. Para saber como tratamos os seus dados, veja a{" "}
        <Link href="/privacidade">Política de Privacidade</Link>.
      </p>
    </LegalPage>
  );
}
