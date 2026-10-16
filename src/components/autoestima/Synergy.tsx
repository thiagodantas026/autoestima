"use client";

import { useEffect, useMemo, useState } from "react";
import { comboServices, defaultCombo, links, zoneLabel, type ComboService, type Zone } from "./data";
import { fmtMinutes } from "./lib";
import { SectionHead } from "./Story";
import { ArrowUpRight, Check } from "./Icons";

const MAX = 3;
const zones = Object.keys(zoneLabel) as Zone[];

function initial(): Partial<Record<Zone, string>> {
  const out: Partial<Record<Zone, string>> = {};
  for (const id of defaultCombo) {
    const s = comboServices.find((c) => c.id === id);
    if (s) out[s.zone] = s.id;
  }
  return out;
}

export default function Synergy() {
  const [picked, setPicked] = useState(initial);
  const [toast, setToast] = useState("");

  const chosen = useMemo(
    () => zones.map((z) => comboServices.find((c) => c.id === picked[z])).filter((c): c is ComboService => Boolean(c)),
    [picked],
  );

  const sequential = chosen.reduce((n, c) => n + c.minutes, 0);
  const parallel = chosen.reduce((n, c) => Math.max(n, c.minutes), 0);
  const saved = sequential - parallel;
  const full = chosen.length >= MAX;

  useEffect(() => {
    if (!toast) return;
    const id = window.setTimeout(() => setToast(""), 4200);
    return () => window.clearTimeout(id);
  }, [toast]);

  const toggle = (s: ComboService) => {
    setPicked((p) => {
      const next = { ...p };
      if (next[s.zone] === s.id) delete next[s.zone];
      else next[s.zone] = s.id;
      return next;
    });
  };

  const book = () => {
    const list = chosen.map((c) => c.name).join(" + ");
    const msg = `Olá! Gostava de marcar ${list}, em simultâneo. Que dias têm disponíveis?`;
    if (links.whatsapp) {
      window.open(`https://wa.me/${links.whatsapp}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
      return;
    }
    navigator.clipboard?.writeText(msg).then(
      () => setToast("Pedido copiado. É só colar na conversa do Instagram."),
      () => undefined,
    );
    window.open(links.instagramDm, "_blank", "noopener");
  };

  let cursor = 0;

  return (
    <section className="ae-syn" id="experiencia">
      <div className="ae-wrap ae-syn__grid">
        <div className="ae-syn__intro">
          <SectionHead
            num="03"
            kicker="A experiência Autoestima"
            title={
              <>
                Até três profissionais. <em>Ao mesmo tempo.</em>
              </>
            }
            lead="É o que nos distingue: reunimos todos os serviços no mesmo lugar e, conforme o que precisa, várias profissionais trabalham em si em simultâneo. Monte a sua visita e veja o tempo que poupa."
          />

          <div className="ae-syn__zones" data-reveal>
            {zones.map((z) => {
              const zoneTaken = Boolean(picked[z]);
              const locked = full && !zoneTaken;
              return (
                <fieldset key={z} className={`ae-zone${locked ? " is-locked" : ""}`} disabled={locked}>
                  <legend>
                    {zoneLabel[z]}
                    {locked && <small>máx. {MAX} em simultâneo</small>}
                  </legend>
                  <div className="ae-zone__opts">
                    {comboServices
                      .filter((c) => c.zone === z)
                      .map((c) => {
                        const on = picked[z] === c.id;
                        return (
                          <button
                            key={c.id}
                            type="button"
                            className={`ae-pill${on ? " is-on" : ""}`}
                            aria-pressed={on}
                            onClick={() => toggle(c)}
                          >
                            {on && <Check />}
                            {c.name}
                          </button>
                        );
                      })}
                  </div>
                </fieldset>
              );
            })}
          </div>
        </div>

        <div className="ae-syn__card" data-reveal>
          <div className="ae-syn__card-head">
            <p>A sua visita</p>
            <span>
              {chosen.length} {chosen.length === 1 ? "profissional" : "profissionais"}
            </span>
          </div>

          <div className="ae-syn__row">
            <div className="ae-syn__label">
              <span>Uma coisa de cada vez</span>
              <strong>{sequential ? fmtMinutes(sequential) : "0 min"}</strong>
            </div>
            <div className="ae-syn__track">
              {chosen.map((c, i) => {
                const left = sequential ? (cursor / sequential) * 100 : 0;
                cursor += c.minutes;
                return (
                  <i
                    key={c.id}
                    className={`ae-bar ae-bar--${i}`}
                    style={{ left: `${left}%`, width: `${(c.minutes / sequential) * 100}%` }}
                  />
                );
              })}
            </div>
          </div>

          <div className="ae-syn__row">
            <div className="ae-syn__label">
              <span>Na Autoestima, em simultâneo</span>
              <strong className="is-hl">{parallel ? fmtMinutes(parallel) : "0 min"}</strong>
            </div>
            <div className="ae-syn__lanes">
              {chosen.map((c, i) => (
                <div key={c.id} className="ae-syn__lane">
                  {/* o texto existe duas vezes: claro por baixo e escuro dentro da barra,
                      para se ler tanto sobre o lilás como sobre o fundo escuro */}
                  <span className="ae-syn__txt">
                    {c.name} · {fmtMinutes(c.minutes)}
                  </span>
                  <i
                    className={`ae-bar ae-bar--${i}`}
                    style={{ width: `${sequential ? (c.minutes / sequential) * 100 : 0}%` }}
                  >
                    <span className="ae-syn__txt" aria-hidden="true">
                      {c.name} · {fmtMinutes(c.minutes)}
                    </span>
                  </i>
                </div>
              ))}
              {!chosen.length && <p className="ae-syn__empty">Escolha os serviços ao lado.</p>}
            </div>
          </div>

          <div className="ae-syn__saved" aria-live="polite">
            {saved > 0 ? (
              <>
                <span>Poupa cerca de</span>
                <strong>{fmtMinutes(saved)}</strong>
              </>
            ) : (
              <span>Junte pelo menos dois serviços para ver o tempo que poupa.</span>
            )}
          </div>

          <button type="button" className="ae-btn ae-btn--lilac ae-syn__cta" onClick={book} disabled={!chosen.length}>
            Quero marcar esta visita <ArrowUpRight />
          </button>
          <p className="ae-syn__note">
            Durações aproximadas, só para ilustrar. O tempo certo é confirmado na marcação.
          </p>
          <p className={`ae-toast${toast ? " is-on" : ""}`} role="status">
            {toast}
          </p>
        </div>
      </div>
    </section>
  );
}
