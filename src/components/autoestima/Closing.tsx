"use client";

import { useEffect, useRef, useState } from "react";
import { bookingHref, bookingLabel, brand, links, spaces } from "./data";
import { scrollToId } from "./lib";
import { Wordmark } from "./Nav";
import { Seal } from "./Hero";
import { ArrowUpRight, Instagram, MapPin, WhatsApp } from "./Icons";

export default function Closing({ year }: { year: number }) {
  return (
    <section className="ae-close" id="marcar" data-nav-dark>
      <div className="ae-close__aura" aria-hidden="true">
        <i />
        <i />
      </div>
      <div className="ae-wrap ae-close__cta">
        <Seal className="ae-close__seal" />
        <p className="ae-kicker ae-kicker--light" data-reveal>
          <span className="ae-kicker__dot" />A sua vez
        </p>
        <h2 data-reveal>
          A sua melhor versão
          <br />
          <em>começa aqui.</em>
        </h2>
        <p className="ae-close__lead" data-reveal>
          Marque a sua visita e deixe o resto connosco. Do primeiro olá ao último retoque, o tempo é todo seu.
        </p>
        <div className="ae-close__btns" data-reveal>
          <a className="ae-btn ae-btn--lilac" href={bookingHref} target="_blank" rel="noopener noreferrer">
            {bookingLabel} <ArrowUpRight />
          </a>
          {links.whatsapp ? (
            <a
              className="ae-btn ae-btn--line"
              href={`https://wa.me/${links.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsApp /> WhatsApp
            </a>
          ) : (
            <a className="ae-btn ae-btn--line" href={links.instagram} target="_blank" rel="noopener noreferrer">
              <Instagram /> {links.instagramHandle}
            </a>
          )}
        </div>
      </div>

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
              {[
                ["servicos", "Serviços"],
                ["experiencia", "Experiência"],
                ["menu", "Menu completo"],
                ["equipa", "Equipa"],
                ["faq", "Perguntas"],
              ].map(([id, label]) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToId(id);
                    }}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
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
    </section>
  );
}

/* Barra de marcação fixa no telemóvel: aparece depois do topo e some no fim */
export function StickyBar() {
  const [show, setShow] = useState(false);
  const endRef = useRef(false);

  useEffect(() => {
    const end = document.getElementById("marcar");
    const io = end
      ? new IntersectionObserver(([e]) => {
          endRef.current = e.isIntersecting;
          setShow(window.scrollY > window.innerHeight * 0.7 && !e.isIntersecting);
        })
      : null;
    if (end && io) io.observe(end);
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.7 && !endRef.current);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io?.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className={`ae-sticky${show ? " is-on" : ""}`} aria-hidden={!show}>
      <a
        className="ae-btn ae-btn--ink"
        href={bookingHref}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={show ? 0 : -1}
      >
        {bookingLabel} <ArrowUpRight />
      </a>
      <a
        className="ae-sticky__ig"
        href={links.whatsapp ? `https://wa.me/${links.whatsapp}` : links.instagram}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={links.whatsapp ? "WhatsApp" : "Instagram"}
        tabIndex={show ? 0 : -1}
      >
        {links.whatsapp ? <WhatsApp /> : <Instagram />}
      </a>
    </div>
  );
}
