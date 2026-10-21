"use client";

import { useEffect, useState } from "react";
import { bookingHref, bookingLabel, brand, links } from "./data";
import { lockScroll, scrollToId } from "./lib";
import LogoMark from "./LogoMark";
import { ArrowUpRight, Instagram } from "./Icons";

const items = [
  ["servicos", "Serviços"],
  ["experiencia", "Experiência"],
  ["trabalhos", "Trabalhos"],
  ["equipa", "Equipa"],
  ["espacos", "Espaços"],
] as const;

export function Wordmark() {
  if (brand.logo) {
    return <img className="ae-logo" src={brand.logo} alt={brand.fullName} />;
  }
  return (
    <span className="ae-wordmark">
      <LogoMark className="ae-wordmark__mark" />
      <span className="ae-wordmark__text">
        <b>Autoestima</b>
        <small>Hair & Body</small>
      </span>
    </span>
  );
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    lockScroll(true);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      lockScroll(false);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    /* espera o menu fechar para o scroll não ficar bloqueado */
    requestAnimationFrame(() => scrollToId(id));
  };

  return (
    <>
      <header className={`ae-nav${scrolled ? " is-scrolled" : ""}${open ? " is-open" : ""}`}>
        <div className="ae-wrap ae-nav__bar">
          <a href="#inicio" className="ae-nav__brand" onClick={go("inicio")} aria-label="Autoestima, voltar ao início">
            <Wordmark />
          </a>
          <nav className="ae-nav__links" aria-label="Secções">
            {items.map(([id, label]) => (
              <a key={id} href={`#${id}`} onClick={go(id)}>
                {label}
              </a>
            ))}
          </nav>
          <div className="ae-nav__actions">
            <a className="ae-btn ae-btn--ink ae-btn--sm" href={bookingHref} target="_blank" rel="noopener noreferrer">
              <span>Marcar</span>
              <ArrowUpRight />
            </a>
            <button
              type="button"
              className="ae-burger"
              aria-expanded={open}
              aria-controls="ae-menu"
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              onClick={() => setOpen((v) => !v)}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <div id="ae-menu" className={`ae-menu${open ? " is-open" : ""}`} aria-hidden={!open} data-lenis-prevent>
        <div className="ae-menu__aura" aria-hidden="true" />
        <nav className="ae-menu__links" aria-label="Menu">
          {items.map(([id, label], i) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={go(id)}
              tabIndex={open ? 0 : -1}
              style={{ "--i": i } as React.CSSProperties}
            >
              <small>0{i + 1}</small>
              {label}
            </a>
          ))}
        </nav>
        <div className="ae-menu__foot">
          <a
            className="ae-btn ae-btn--ink"
            href={bookingHref}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={open ? 0 : -1}
          >
            {bookingLabel} <ArrowUpRight />
          </a>
          <a
            className="ae-menu__ig"
            href={links.instagram}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={open ? 0 : -1}
          >
            <Instagram /> {links.instagramHandle}
          </a>
        </div>
      </div>
    </>
  );
}
