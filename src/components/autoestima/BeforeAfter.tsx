"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "./Icons";

const clamp = (v: number) => Math.min(100, Math.max(0, v));

/* Comparador antes/depois: o "depois" fica por baixo e o "antes" é recortado
   até à posição do puxador. Arrasta-se com rato ou dedo (o scroll vertical
   continua a funcionar no telemóvel) e com as setas do teclado. */
export default function BeforeAfter({ before, after, alt }: { before: string; after: string; alt: string }) {
  const [x, setX] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const touched = useRef(false);

  const fromClient = (clientX: number) => {
    const r = ref.current?.getBoundingClientRect();
    if (r) setX(clamp(((clientX - r.left) / r.width) * 100));
  };

  /* Ao entrar no ecrã, o puxador mexe-se sozinho uma vez para mostrar que se pode arrastar */
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const tick = (t: number) => {
          if (touched.current) return;
          const k = Math.min(1, (t - t0) / 2600);
          setX(50 + Math.sin(k * Math.PI * 2) * 26 * (1 - k));
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
    };
  }, []);

  const onKey = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 20 : 5;
    const map: Record<string, number> = { ArrowLeft: x - step, ArrowRight: x + step, Home: 0, End: 100 };
    if (!(e.key in map)) return;
    e.preventDefault();
    touched.current = true;
    setX(clamp(map[e.key]));
  };

  return (
    <div
      ref={ref}
      className="ae-ba"
      style={{ "--x": `${x}%` } as React.CSSProperties}
      onPointerDown={(e) => {
        touched.current = true;
        dragging.current = true;
        e.currentTarget.setPointerCapture(e.pointerId);
        fromClient(e.clientX);
      }}
      onPointerMove={(e) => dragging.current && fromClient(e.clientX)}
      onPointerUp={() => (dragging.current = false)}
      onPointerCancel={() => (dragging.current = false)}
    >
      <img className="ae-ba__img" src={after} alt={`Depois do tratamento: ${alt}`} draggable={false} loading="lazy" />
      <div className="ae-ba__before">
        <img className="ae-ba__img" src={before} alt={`Antes do tratamento: ${alt}`} draggable={false} loading="lazy" />
      </div>
      <span className="ae-ba__tag is-before" aria-hidden="true">
        Antes
      </span>
      <span className="ae-ba__tag is-after" aria-hidden="true">
        Depois
      </span>
      <div
        className="ae-ba__handle"
        role="slider"
        tabIndex={0}
        aria-label="Comparar antes e depois"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(x)}
        aria-valuetext={`${Math.round(x)}% antes`}
        onKeyDown={onKey}
      >
        <span className="ae-ba__knob">
          <ArrowLeft />
          <ArrowRight />
        </span>
      </div>
    </div>
  );
}
