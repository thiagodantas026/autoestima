"use client";

import { useEffect, useRef, useState } from "react";
import { bookingHref, signatures } from "./data";
import Frame from "./Frame";
import { SectionHead } from "./Story";
import { ArrowUpRight } from "./Icons";

const pad = (n: number) => String(n).padStart(2, "0");

export default function Signatures() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  /* Avança sozinho enquanto a secção está à vista e ninguém está a interagir */
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setActive((a) => (a + 1) % signatures.length), 3800);
    return () => window.clearInterval(id);
  }, [visible, paused]);

  const current = signatures[active];

  return (
    <section className="ae-sig" id="servicos" data-nav-dark>
      <div className="ae-wrap">
        <div
          className="ae-sig__layout"
          ref={ref}
          onPointerEnter={() => setPaused(true)}
          onPointerLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          <div>
            <SectionHead
              light
              num="02"
              kicker="Serviços em destaque"
              title={
                <>
                  Os <em>destaques</em> da casa
                </>
              }
              lead="Os tratamentos que mais nos pedem e que fazemos com mais orgulho. Passe por cada um."
            />
            <ol className="ae-sig__list">
              {signatures.map((s, i) => (
                <li key={s.name} className={`ae-sig__item${i === active ? " is-active" : ""}`} data-reveal>
                  <button
                    type="button"
                    className="ae-sig__trigger"
                    aria-pressed={i === active}
                    onPointerEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                  >
                    <span className="ae-sig__num">{pad(i + 1)}</span>
                    <span className="ae-sig__name">{s.name}</span>
                    <span className="ae-sig__cat">{s.category}</span>
                  </button>
                  {/* versão de telemóvel: cada serviço é um cartão completo */}
                  <div className="ae-sig__card">
                    <Frame src={s.photo} alt={s.name} hue={s.hue} mark={s.name[0]} className="ae-sig__card-media" />
                    <p className="ae-sig__card-cat">{s.category}</p>
                    <h3>{s.name}</h3>
                    <p>{s.text}</p>
                    <a href={bookingHref} target="_blank" rel="noopener noreferrer">
                      Marcar <ArrowUpRight />
                    </a>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <aside className="ae-sig__stage" aria-live="polite">
            <div className="ae-sig__sticky">
              <div className="ae-sig__media">
                {signatures.map((s, i) => (
                  <Frame
                    key={s.name}
                    src={s.photo}
                    alt={s.name}
                    hue={s.hue}
                    mark={s.name[0]}
                    className={i === active ? "is-active" : undefined}
                  />
                ))}
                <span className="ae-sig__count">
                  {pad(active + 1)} <i>/</i> {pad(signatures.length)}
                </span>
              </div>
              <div className="ae-sig__info" key={active}>
                <p className="ae-sig__info-cat">{current.category}</p>
                <h3>{current.name}</h3>
                <p>{current.text}</p>
                <a className="ae-btn ae-btn--lilac" href={bookingHref} target="_blank" rel="noopener noreferrer">
                  Marcar este serviço <ArrowUpRight />
                </a>
              </div>
              <div className="ae-sig__progress" aria-hidden="true">
                {signatures.map((s, i) => (
                  <i key={s.name} className={i === active ? (paused ? "is-on is-paused" : "is-on") : undefined} />
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
