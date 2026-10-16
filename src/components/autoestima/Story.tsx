"use client";

import { Fragment, useRef } from "react";
import { brand, marquee, timeline } from "./data";
import { useScrollVar } from "./lib";
import { Sparkle } from "./Icons";

export function SectionHead({
  num,
  kicker,
  title,
  lead,
  light = false,
}: {
  num: string;
  kicker: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  light?: boolean;
}) {
  return (
    <header className={`ae-head${light ? " ae-head--light" : ""}`}>
      <p className="ae-head__kicker" data-reveal>
        <span>{num}</span>
        <i aria-hidden="true" />
        {kicker}
      </p>
      <h2 className="ae-head__title" data-reveal>
        {title}
      </h2>
      {lead && (
        <p className="ae-head__lead" data-reveal>
          {lead}
        </p>
      )}
    </header>
  );
}

export function Marquee() {
  const row = (hidden: boolean) => (
    <div className="ae-marquee__row" aria-hidden={hidden || undefined}>
      {marquee.map((item, i) => (
        <Fragment key={item}>
          <span className={i % 2 ? "ae-marquee__outline" : undefined}>{item}</span>
          <Sparkle className="ae-marquee__star" />
        </Fragment>
      ))}
    </div>
  );
  return (
    <div className="ae-marquee" data-nav-dark>
      <div className="ae-marquee__track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}

/* Manifesto: as palavras acendem com o scroll. `*` marca palavras em itálico. */
const manifesto =
  "Há dias em que o *espelho* pesa. É aí que entramos: com tempo, técnica e cuidado, para que volte a *gostar* *do* *que* *vê.*";

export default function Story() {
  const manifestoRef = useRef<HTMLParagraphElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  useScrollVar(manifestoRef, { start: 0.88, end: 0.42 });
  useScrollVar(timelineRef, { start: 0.85, end: 0.5 });

  const words = manifesto.split(" ");

  return (
    <section className="ae-story" id="historia">
      <div className="ae-wrap">
        <SectionHead
          num="01"
          kicker="A nossa história"
          title={
            <>
              Um sonho com <em>quase trinta anos</em>
            </>
          }
        />

        <p className="ae-manifesto" ref={manifestoRef} style={{ "--n": words.length } as React.CSSProperties}>
          {words.map((w, i) => {
            const italic = w.startsWith("*");
            const text = w.replace(/\*/g, "");
            return (
              <Fragment key={i}>
                <span className={italic ? "is-em" : undefined} style={{ "--i": i } as React.CSSProperties}>
                  {text}
                </span>{" "}
              </Fragment>
            );
          })}
        </p>

        <div className="ae-timeline" ref={timelineRef} style={{ "--n": timeline.length } as React.CSSProperties}>
          <span className="ae-timeline__rail" aria-hidden="true">
            <i />
          </span>
          <ol className="ae-timeline__list">
            {timeline.map((t, i) => (
              <li
                key={t.title}
                className="ae-timeline__step"
                data-reveal
                style={{ "--t": i / timeline.length, "--i": i } as React.CSSProperties}
              >
                <span className="ae-timeline__dot" aria-hidden="true" />
                <span className="ae-timeline__year">{t.year}</span>
                <span className="ae-timeline__place">{t.place}</span>
                <h3>{t.title}</h3>
                <p>{t.text}</p>
              </li>
            ))}
          </ol>
        </div>

        <figure className="ae-quote" data-reveal>
          <span className="ae-quote__mark" aria-hidden="true">
            “
          </span>
          <blockquote>
            A nossa missão é elevar a autoestima dos clientes, entregando o que realmente procuram na área da beleza.
          </blockquote>
          <figcaption>
            <strong>{brand.founder}</strong>
            <span>Fundadora</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
