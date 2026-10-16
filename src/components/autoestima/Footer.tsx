"use client";

import Link from "next/link";
import { brand, links, spaces } from "./data";
import { scrollToId } from "./lib";
import { Wordmark } from "./Nav";
import { ArrowUpRight, Instagram, MapPin, WhatsApp } from "./Icons";

const sections = [
  ["servicos", "Serviços"],
  ["experiencia", "Experiência"],
  ["menu", "Menu completo"],
  ["equipa", "Equipa"],
  ["faq", "Perguntas"],
] as const;

/* Rodapé partilhado pela página principal e pelas páginas legais.
   Inclui o que a lei portuguesa pede num site de serviços ao consumidor:
   política de privacidade e de cookies (RGPD), Livro de Reclamações
   Eletrónico (DL 74/2017) e informação sobre resolução alternativa de
   litígios (Lei 144/2015). */
export default function Footer({ year, home = true }: { year: number; home?: boolean }) {
  return (
    <footer className="ae-foot">
      <div className="ae-wrap ae-foot__grid">
        <div className="ae-foot__brand">
          <Wordmark light />
          <p>{brand.slogan}</p>
        </div>
        <div>
          <h3>Espaços</h3>
          <ul>
            {spaces.map((s) => (
              <li key={s.id}>
                <a href={s.maps} target="_blank" rel="noopener noreferrer">
                  <MapPin /> {s.city}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Contactos</h3>
          <ul>
            <li>
              <a href={links.instagram} target="_blank" rel="noopener noreferrer">
                <Instagram /> Instagram
              </a>
            </li>
            {links.whatsapp && (
              <li>
                <a href={`https://wa.me/${links.whatsapp}`} target="_blank" rel="noopener noreferrer">
                  <WhatsApp /> WhatsApp
                </a>
              </li>
            )}
            {links.phone && (
              <li>
                <a href={`tel:${links.phone.replace(/\s/g, "")}`}>{links.phone}</a>
              </li>
            )}
            {links.email && (
              <li>
                <a href={`mailto:${links.email}`}>{links.email}</a>
              </li>
            )}
            {links.treatwell && (
              <li>
                <a href={links.treatwell} target="_blank" rel="noopener noreferrer">
                  Treatwell
                </a>
              </li>
            )}
            <li>
              <a href={links.site} target="_blank" rel="noopener noreferrer">
                autoestima.store
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3>Navegar</h3>
          <ul>
            {sections.map(([id, label]) => (
              <li key={id}>
                {home ? (
                  <a
                    href={`#${id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToId(id);
                    }}
                  >
                    {label}
                  </a>
                ) : (
                  <Link href={`/#${id}`}>{label}</Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="ae-wrap ae-foot__legal">
        <nav aria-label="Informação legal">
          <Link href="/privacidade">Política de Privacidade</Link>
          <Link href="/cookies">Política de Cookies</Link>
          <a href="https://www.livroreclamacoes.pt/Inicio/" target="_blank" rel="noopener noreferrer">
            Livro de Reclamações <ArrowUpRight />
          </a>
        </nav>
        <p>
          Em caso de litígio de consumo, pode recorrer a uma Entidade de Resolução Alternativa de Litígios. A lista
          completa está no{" "}
          <a href="https://www.consumidor.gov.pt/" target="_blank" rel="noopener noreferrer">
            Portal do Consumidor
          </a>
          .
        </p>
      </div>

      <div className="ae-wrap ae-foot__bottom">
        <p>
          © {year} {brand.fullName}
        </p>
        <p>
          Site por{" "}
          <a href="https://upmaxpro.pt" target="_blank" rel="noopener">
            UpMax Pro
          </a>
        </p>
      </div>
      <p className="ae-foot__giant" aria-hidden="true">
        Autoestima
      </p>
    </footer>
  );
}
