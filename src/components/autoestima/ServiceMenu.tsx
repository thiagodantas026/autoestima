"use client";

import { useMemo, useState } from "react";
import { bookingHref, categories, links, totalServices } from "./data";
import { SectionHead } from "./Story";
import { ArrowUpRight, Close, Search, Sparkle } from "./Icons";

/* Serviços que a cliente pediu para destacar */
const featured = new Set([
  "Reconstrução capilar com exossomo",
  "Escova progressiva",
  "Tranças africanas (diversas)",
  "Box braids e boho braids",
  "Permanente afro",
  "Micropigmentação de sobrancelhas",
  "Limpeza de pele",
  "Massagem redutora",
  "Manicure",
]);

const norm = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

export default function ServiceMenu() {
  const [cat, setCat] = useState("todos");
  const [q, setQ] = useState("");

  const results = useMemo(() => {
    const term = norm(q.trim());
    return categories
      .filter((c) => term || cat === "todos" || c.id === cat)
      .flatMap((c) => c.services.map((name) => ({ name, cat: c.label })))
      .filter((s) => !term || norm(s.name).includes(term) || norm(s.cat).includes(term));
  }, [cat, q]);

  const tabs = [{ id: "todos", label: "Todos", count: totalServices }].concat(
    categories.map((c) => ({ id: c.id, label: c.label, count: c.services.length })),
  );

  return (
    <section className="ae-menu-sec" id="menu">
      <div className="ae-wrap">
        <div className="ae-menu-sec__top">
          <SectionHead
            num="04"
            kicker="Menu completo"
            title={
              <>
                {totalServices} serviços, <em>um só lugar</em>
              </>
            }
            lead="Do cabelo às unhas, do rosto ao corpo. Procure o que precisa ou explore por categoria."
          />
          <label className="ae-search" data-reveal>
            <Search />
            <span className="ae-sr">Procurar serviço</span>
            <input
              type="search"
              placeholder="Procurar, ex.: tranças"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              autoComplete="off"
            />
            {q && (
              <button type="button" onClick={() => setQ("")} aria-label="Limpar pesquisa">
                <Close />
              </button>
            )}
          </label>
        </div>

        <div className="ae-tabs" role="tablist" aria-label="Categorias" data-reveal>
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={!q && cat === t.id}
              className={!q && cat === t.id ? "is-on" : undefined}
              onClick={() => {
                setCat(t.id);
                setQ("");
              }}
            >
              {t.label}
              <small>{t.count}</small>
            </button>
          ))}
        </div>

        <ul className="ae-list" key={`${cat}-${q ? "q" : ""}`}>
          {results.map((s, i) => (
            <li key={s.name} style={{ "--i": Math.min(i, 14) } as React.CSSProperties}>
              <a href={bookingHref} target="_blank" rel="noopener noreferrer">
                <span className="ae-list__name">
                  {s.name}
                  {featured.has(s.name) && (
                    <span className="ae-list__star" title="Destaque da casa">
                      <Sparkle />
                      <span className="ae-sr">Destaque da casa</span>
                    </span>
                  )}
                </span>
                <span className="ae-list__cat">{s.cat}</span>
                <ArrowUpRight className="ae-list__go" />
              </a>
            </li>
          ))}
        </ul>

        {!results.length && (
          <p className="ae-list__empty">
            Não encontrámos esse serviço na lista.{" "}
            <a href={links.instagramDm} target="_blank" rel="noopener noreferrer">
              Pergunte-nos no Instagram
            </a>
            , pode ser que o façamos.
          </p>
        )}

        <p className="ae-menu-sec__note">
          <Sparkle /> Destaques da casa · Preços e disponibilidade confirmados na marcação.
        </p>
      </div>
    </section>
  );
}
