"use client";

import { useEffect, useRef, useState } from "react";
import { bookingHref, bookingLabel, hours, links, phoneHref } from "./data";
import { Seal } from "./Hero";
import Footer from "./Footer";
import { ArrowUpRight, Instagram, Phone, WhatsApp } from "./Icons";

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
        <p className="ae-close__hours" data-reveal>
          {hours.map((h) => `${h.days}, ${h.label}`).join(" · ")}
        </p>
        <div className="ae-close__btns" data-reveal>
          <a className="ae-btn ae-btn--lilac" href={bookingHref} target="_blank" rel="noopener noreferrer">
            {links.whatsapp && !links.treatwell && <WhatsApp />} {bookingLabel} <ArrowUpRight />
          </a>
          {links.phone ? (
            <a className="ae-btn ae-btn--line" href={phoneHref}>
              <Phone /> {links.phone}
            </a>
          ) : (
            <a className="ae-btn ae-btn--line" href={links.instagram} target="_blank" rel="noopener noreferrer">
              <Instagram /> {links.instagramHandle}
            </a>
          )}
        </div>
      </div>

      <Footer year={year} />
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
      {links.phone ? (
        <a className="ae-sticky__ig" href={phoneHref} aria-label={`Ligar para ${links.phone}`} tabIndex={show ? 0 : -1}>
          <Phone />
        </a>
      ) : (
        <a
          className="ae-sticky__ig"
          href={links.instagram}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          tabIndex={show ? 0 : -1}
        >
          <Instagram />
        </a>
      )}
    </div>
  );
}
