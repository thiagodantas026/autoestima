"use client";

import { useEffect, type RefObject } from "react";
import type Lenis from "lenis";

/* Instância única do Lenis (scroll suave no desktop). Os overlays (menu,
   lightbox) param-no enquanto estão abertos. */
let lenis: Lenis | null = null;

export function setLenis(instance: Lenis | null) {
  lenis = instance;
}

export function lockScroll(locked: boolean) {
  const html = document.documentElement;
  if (locked) {
    lenis?.stop();
    html.classList.add("ae-locked");
  } else {
    lenis?.start();
    html.classList.remove("ae-locked");
  }
}

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) lenis.scrollTo(el);
  else el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function fmtMinutes(total: number) {
  const h = Math.floor(total / 60);
  const m = total % 60;
  if (!h) return `${m} min`;
  return m ? `${h}h${String(m).padStart(2, "0")}` : `${h}h`;
}

export function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  return (parts[0][0] + (parts.length > 1 ? parts[parts.length - 1][0] : "")).toUpperCase();
}

/* Escreve no elemento uma variável CSS (0 a 1) com o progresso do scroll.
   p = 0 quando o topo do elemento está em `start` (fração da altura do ecrã)
   e p = 1 quando a base do elemento chega a `end`. */
export function useScrollVar(
  ref: RefObject<HTMLElement | null>,
  { name = "--p", start = 1, end = 0 }: { name?: string; start?: number; end?: number } = {},
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const span = r.height + vh * (start - end);
      const p = Math.min(1, Math.max(0, (vh * start - r.top) / span));
      el.style.setProperty(name, p.toFixed(4));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ref, name, start, end]);
}

export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
