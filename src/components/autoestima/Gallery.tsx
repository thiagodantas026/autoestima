"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { beforeAfter, bookingHref, bookingLabel, gallery, links } from "./data";
import BeforeAfter from "./BeforeAfter";
import Frame from "./Frame";
import { lockScroll } from "./lib";
import { SectionHead } from "./Story";
import { ArrowLeft, ArrowRight, ArrowUpRight, Close, Instagram } from "./Icons";

const hues = [268, 300, 252, 282, 312, 262, 290, 276, 306, 258, 284];

export default function Gallery() {
  const photos = gallery.filter((g) => g.src);
  const [open, setOpen] = useState<number | null>(null);
  const touchX = useRef<number | null>(null);

  const step = useCallback(
    (d: number) => setOpen((o) => (o === null ? o : (o + d + photos.length) % photos.length)),
    [photos.length],
  );

  useEffect(() => {
    if (open === null) return;
    lockScroll(true);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      lockScroll(false);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, step]);

  return (
    <section className="ae-gal" id="trabalhos">
      <div className="ae-wrap">
        <SectionHead
          num="05"
          kicker="Trabalhos"
          title={
            <>
              Feito pelas <em>nossas mãos</em>
            </>
          }
          lead="Trabalhos reais, feitos nas nossas cadeiras. Há sempre mais no Instagram."
        />

        <div className="ae-gal__feature" data-reveal>
          <BeforeAfter before={beforeAfter.before} after={beforeAfter.after} alt={beforeAfter.alt} />
          <div className="ae-gal__feature-copy">
            <p className="ae-kicker">
              <span className="ae-kicker__dot" />
              Antes & depois · Corpo
            </p>
            <h3>
              Arraste e <em>veja a diferença</em>
            </h3>
            <p>
              Tratamento corporal feito na Autoestima, numa das nossas clientes. Massagem redutora, drenagem linfática e
              aplicação de enzimas fazem parte dos cuidados de corpo que pode marcar connosco.
            </p>
            <a className="ae-btn ae-btn--ink" href={bookingHref} target="_blank" rel="noopener noreferrer">
              {bookingLabel} <ArrowUpRight />
            </a>
            <small>Resultado real de uma cliente. Os resultados variam de pessoa para pessoa.</small>
          </div>
        </div>

        <div className="ae-gal__grid">
          {gallery.map((g, i) => {
            const idx = g.src ? photos.indexOf(g) : -1;
            const tile = (
              <>
                <Frame src={g.src} alt={g.alt} hue={hues[i % hues.length]} mark={g.label[0]} />
                <span className="ae-gal__label">{g.label}</span>
              </>
            );
            return (
              <figure key={i} className={`ae-gal__item${g.tall ? " is-tall" : ""}`} data-reveal>
                {idx >= 0 ? (
                  <button type="button" onClick={() => setOpen(idx)} aria-label={`Ampliar: ${g.alt}`}>
                    {tile}
                  </button>
                ) : (
                  tile
                )}
              </figure>
            );
          })}
          <a
            className="ae-gal__item ae-gal__ig"
            href={links.instagram}
            target="_blank"
            rel="noopener noreferrer"
            data-reveal
          >
            <Instagram />
            <strong>Veja mais no Instagram</strong>
            <span>
              {links.instagramHandle} <ArrowUpRight />
            </span>
          </a>
        </div>
      </div>

      {open !== null && photos[open] && (
        <div
          className="ae-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={photos[open].alt}
          onClick={() => setOpen(null)}
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
            touchX.current = null;
          }}
          data-lenis-prevent
        >
          <img
            src={photos[open].full ?? photos[open].src}
            alt={photos[open].alt}
            onClick={(e) => e.stopPropagation()}
          />
          <button type="button" className="ae-lightbox__close" aria-label="Fechar" onClick={() => setOpen(null)}>
            <Close />
          </button>
          {photos.length > 1 && (
            <>
              <button
                type="button"
                className="ae-lightbox__nav is-prev"
                aria-label="Anterior"
                onClick={(e) => {
                  e.stopPropagation();
                  step(-1);
                }}
              >
                <ArrowLeft />
              </button>
              <button
                type="button"
                className="ae-lightbox__nav is-next"
                aria-label="Seguinte"
                onClick={(e) => {
                  e.stopPropagation();
                  step(1);
                }}
              >
                <ArrowRight />
              </button>
            </>
          )}
          <p className="ae-lightbox__count">
            {open + 1} / {photos.length}
          </p>
        </div>
      )}
    </section>
  );
}
