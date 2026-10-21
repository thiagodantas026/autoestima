import { bookingFor, faqs, hours, links, phoneHref, spaces } from "./data";
import Frame from "./Frame";
import { SectionHead } from "./Story";
import { ArrowUpRight, Clock, MapPin, Phone, Plus } from "./Icons";

export default function Spaces() {
  return (
    <section className="ae-spaces" id="espacos">
      <div className="ae-wrap">
        <SectionHead
          num="07"
          kicker="Os nossos espaços"
          title={
            <>
              Dois espaços, <em>a mesma essência</em>
            </>
          }
          lead="Escolha o mais perto de si. Nos dois, o mesmo cuidado do primeiro ao último minuto."
        />
        <div className="ae-spaces__grid">
          {spaces.map((s, i) => (
            <article key={s.id} className="ae-space" data-reveal style={{ "--i": i } as React.CSSProperties}>
              <div className="ae-space__media">
                <Frame src={s.photo} alt={`Espaço Autoestima ${s.inCity}`} hue={i ? 292 : 266} mark={s.city[0]} />
                <span className="ae-space__since">Desde {s.since}</span>
              </div>
              <div className="ae-space__body">
                <p className="ae-space__kicker">
                  <MapPin /> {s.city}
                </p>
                <h3>
                  <em>{s.title}</em>
                </h3>
                <p>{s.text}</p>
                <ul className="ae-space__focus">
                  {s.focus.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
                {s.address && <address>{s.address}</address>}
                <div className="ae-space__ctas">
                  <a
                    className="ae-btn ae-btn--ink ae-btn--sm"
                    href={bookingFor(s.inCity)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Marcar {s.inCity} <ArrowUpRight />
                  </a>
                  <a className="ae-link" href={s.maps} target="_blank" rel="noopener noreferrer">
                    Como chegar <ArrowUpRight />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="ae-hours" data-reveal>
          <p className="ae-hours__kicker">
            <Clock /> Horário
          </p>
          <dl>
            {hours.map((h) => (
              <div key={h.days}>
                <dt>{h.days}</dt>
                <dd>{h.label}</dd>
              </div>
            ))}
          </dl>
          <a className="ae-hours__phone" href={phoneHref}>
            <Phone /> {links.phone}
          </a>
        </div>
      </div>
    </section>
  );
}

export function Faq() {
  return (
    <section className="ae-faq" id="faq">
      <div className="ae-wrap ae-faq__grid">
        <SectionHead
          num="08"
          kicker="Perguntas frequentes"
          title={
            <>
              Antes de <em>marcar</em>
            </>
          }
          lead="Ficou alguma dúvida? Mande-nos mensagem, respondemos com gosto."
        />
        <div className="ae-faq__list">
          {faqs.map((f) => (
            <details key={f.q} className="ae-qa" data-reveal>
              <summary>
                <span>{f.q}</span>
                <Plus />
              </summary>
              <div className="ae-qa__a">
                <p>{f.a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
