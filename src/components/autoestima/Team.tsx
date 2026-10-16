"use client";

import { useEffect, useRef } from "react";
import { salon, spaces, team, totalServices } from "./data";
import { SectionHead } from "./Story";

export default function Team() {
  return (
    <section className="ae-team" id="equipa">
      <div className="ae-wrap">
        <div className="ae-team__top">
          <SectionHead
            num="06"
            kicker="A equipa"
            title={
              <>
                As mãos por trás da <em>sua autoestima</em>
              </>
            }
            lead="Esteticistas, cabeleireiras, trancistas, manicures e maquilhadoras certificadas, cada uma no que faz melhor."
          />
        </div>

        <div className="ae-team__photos">
          <figure className="ae-team__photo ae-team__photo--wide" data-reveal>
            <img src={salon.team.src} alt={salon.team.alt} width={salon.team.w} height={salon.team.h} loading="lazy" />
            <figcaption>A equipa, no salão</figcaption>
          </figure>
          <figure className="ae-team__photo" data-reveal style={{ "--i": 1 } as React.CSSProperties}>
            <img
              src={salon.teamTools.src}
              alt={salon.teamTools.alt}
              width={salon.teamTools.w}
              height={salon.teamTools.h}
              loading="lazy"
            />
          </figure>
        </div>
      </div>
    </section>
  );
}

function Counter({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    el.textContent = "0";
    let raf = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const tick = (t: number) => {
          const k = Math.min(1, (t - t0) / 1400);
          el.textContent = String(Math.round(value * (1 - Math.pow(1 - k, 3))));
          if (k < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      el.textContent = String(value);
    };
  }, [value]);
  return <span ref={ref}>{value}</span>;
}

export function Numbers() {
  const items = [
    { n: spaces.length, label: "espaços", sub: "Odivelas e Pontinha" },
    { n: team.length, label: "profissionais", sub: "certificadas" },
    { n: totalServices, label: "serviços", sub: "num só lugar" },
    { n: 3, label: "em simultâneo", sub: "profissionais a cuidar de si" },
  ];
  return (
    <section className="ae-numbers" aria-label="A Autoestima em números">
      <div className="ae-wrap ae-numbers__grid">
        {items.map((it, i) => (
          <div key={it.label} className="ae-numbers__item" data-reveal style={{ "--i": i } as React.CSSProperties}>
            <strong>
              <Counter value={it.n} />
            </strong>
            <span>{it.label}</span>
            <small>{it.sub}</small>
          </div>
        ))}
      </div>
    </section>
  );
}
