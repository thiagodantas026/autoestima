import Link from "next/link";
import { legal } from "./data";
import { Wordmark } from "./Nav";
import Footer from "./Footer";
import { ArrowLeft } from "./Icons";

/* Moldura das páginas legais (privacidade e cookies): cabeçalho simples,
   texto legível e o mesmo rodapé do site. */
export default function LegalPage({
  kicker,
  title,
  children,
}: {
  kicker: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="ae ae-legal-page">
      <header className="ae-legal__nav">
        <div className="ae-wrap ae-legal__bar">
          <Link href="/" aria-label="Autoestima, voltar à página inicial">
            <Wordmark />
          </Link>
          <Link href="/" className="ae-link">
            <ArrowLeft /> Voltar ao site
          </Link>
        </div>
      </header>

      <main className="ae-wrap ae-legal">
        <p className="ae-kicker">
          <span className="ae-kicker__dot" />
          {kicker}
        </p>
        <h1>{title}</h1>
        <p className="ae-legal__date">Última atualização: {legal.updated}</p>
        <div className="ae-legal__body">{children}</div>
      </main>

      <div className="ae-legal__foot">
        <Footer year={new Date().getFullYear()} home={false} />
      </div>
    </div>
  );
}
