"use client";

import { useEffect, useId, useRef } from "react";
import { bookingHref, bookingLabel, brand, spaces, team, totalServices } from "./data";
import { scrollToId, useScrollVar } from "./lib";
import LogoMark from "./LogoMark";
import { ArrowUpRight, Sparkle } from "./Icons";

export function Seal({ className = "" }: { className?: string }) {
  /* o selo aparece no topo e no fecho: cada um precisa do seu id */
  const pathId = `ae-seal-${useId().replace(/:/g, "")}`;
  return (
    <div className={`ae-seal ${className}`} aria-hidden="true">
      <svg className="ae-seal__ring" viewBox="0 0 200 200">
        <defs>
          <path id={pathId} d="M100,100 m-76,0 a76,76 0 1,1 152,0 a76,76 0 1,1 -152,0" />
        </defs>
        <text>
          <textPath href={`#${pathId}`} textLength="472" lengthAdjust="spacing">
            Autoestima · Hair & Body · Beauty & Cosmetics ·
          </textPath>
        </text>
      </svg>
      <Sparkle className="ae-seal__star" />
    </div>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const archRef = useRef<HTMLDivElement>(null);
  useScrollVar(sectionRef, { start: 0, end: 0 });

  /* O reflexo do espelho segue o cursor */
  useEffect(() => {
    const el = archRef.current;
    if (!el || !window.matchMedia("(pointer: fine)").matches) return;
    let raf = 0;
    let x = 0.5;
    let y = 0.35;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      x = (e.clientX - r.left) / r.width;
      y = (e.clientY - r.top) / r.height;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        el.style.setProperty("--mx", x.toFixed(3));
        el.style.setProperty("--my", y.toFixed(3));
      });
    };
    el.classList.add("is-tracking");
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <section className="ae-hero" id="inicio" ref={sectionRef}>
      <div className="ae-hero__aura" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>

      <div className="ae-wrap ae-hero__grid">
        <div className="ae-hero__copy">
          <p className="ae-kicker ae-in" style={{ "--d": 0 } as React.CSSProperties}>
            <span className="ae-kicker__dot" />
            {spaces.map((s) => s.city).join(" · ")} · Desde {brand.since}
          </p>
          <h1 className="ae-hero__title">
            <span className="ae-line">
              <span style={{ "--d": 1 } as React.CSSProperties}>O espaço onde</span>
            </span>
            <span className="ae-line">
              <span style={{ "--d": 2 } as React.CSSProperties}>
                a sua <em>beleza</em>
              </span>
            </span>
            <span className="ae-line">
              <span style={{ "--d": 3 } as React.CSSProperties}>se destaca.</span>
            </span>
          </h1>
          <p className="ae-hero__lead ae-in" style={{ "--d": 4 } as React.CSSProperties}>
            Cabelo, tranças, estética avançada, unhas e cosméticos num só lugar. E até três profissionais a cuidar de si
            ao mesmo tempo, para poupar horas em cada visita.
          </p>
          <div className="ae-hero__ctas ae-in" style={{ "--d": 5 } as React.CSSProperties}>
            <a className="ae-btn ae-btn--ink" href={bookingHref} target="_blank" rel="noopener noreferrer">
              <span>{bookingLabel}</span>
              <ArrowUpRight />
            </a>
            <a
              className="ae-btn ae-btn--ghost"
              href="#servicos"
              onClick={(e) => {
                e.preventDefault();
                scrollToId("servicos");
              }}
            >
              Ver serviços
            </a>
          </div>
          <dl className="ae-hero__facts ae-in" style={{ "--d": 6 } as React.CSSProperties}>
            <div>
              <dt>{spaces.length}</dt>
              <dd>espaços</dd>
            </div>
            <div>
              <dt>{team.length}</dt>
              <dd>profissionais</dd>
            </div>
            <div>
              <dt>{totalServices}</dt>
              <dd>serviços</dd>
            </div>
          </dl>
        </div>

        <div className="ae-hero__visual">
          <div className="ae-arch" ref={archRef}>
            <div className="ae-arch__glass">
              {brand.heroPhoto ? (
                <img src={brand.heroPhoto} alt="Autoestima Hair & Body" fetchPriority="high" />
              ) : (
                <>
                  <div className="ae-arch__silk" aria-hidden="true" />
                  <LogoMark className="ae-arch__mono" />
                </>
              )}
              <span className="ae-arch__sheen" aria-hidden="true" />
            </div>
            <span className="ae-arch__frame" aria-hidden="true" />
          </div>
          <Seal className="ae-hero__seal" />
          <span className="ae-float ae-float--1" aria-hidden="true">
            <Sparkle /> Reconstrução com exossomo
          </span>
          <span className="ae-float ae-float--2" aria-hidden="true">
            <Sparkle /> Box braids
          </span>
          <span className="ae-float ae-float--3" aria-hidden="true">
            <Sparkle /> Micropigmentação
          </span>
        </div>
      </div>

      <a
        className="ae-hero__scroll"
        href="#historia"
        onClick={(e) => {
          e.preventDefault();
          scrollToId("historia");
        }}
      >
        <span>Descobrir</span>
        <i aria-hidden="true" />
      </a>
    </section>
  );
}
