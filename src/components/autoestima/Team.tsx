"use client";

import { useEffect, useRef, useState } from "react";
import { spaces, team, teamSkills, totalServices } from "./data";
import Frame from "./Frame";
import { initials } from "./lib";
import { SectionHead } from "./Story";

const hues = [272, 296, 256, 284, 310, 264, 290];

export default function Team() {
  const [skill, setSkill] = useState("Todas");

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
          <div className="ae-chips" role="group" aria-label="Filtrar por especialidade" data-reveal>
            {teamSkills.map((s) => (
              <button
                key={s}
                type="button"
                className={skill === s ? "is-on" : undefined}
                aria-pressed={skill === s}
                onClick={() => setSkill(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <ul className="ae-team__grid">
          {team.map((m, i) => {
            const match = skill === "Todas" || m.skills.includes(skill);
            return (
              <li
                key={m.name}
                className={`ae-member${match ? "" : " is-dim"}${m.founder ? " is-founder" : ""}`}
                data-reveal
                style={{ "--i": i } as React.CSSProperties}
              >
                <div className="ae-member__media">
                  <Frame src={m.photo} alt={m.name} hue={hues[i % hues.length]} mark={initials(m.name)} />
                  {m.founder && <span className="ae-member__badge">Fundadora</span>}
                </div>
                <h3>{m.name}</h3>
                <p>{m.role}</p>
                <ul className="ae-member__skills">
                  {m.skills.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
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
