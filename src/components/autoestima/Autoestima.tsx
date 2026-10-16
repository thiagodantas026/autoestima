"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import "./autoestima.css";
import Nav from "./Nav";
import Hero from "./Hero";
import Story, { Marquee } from "./Story";
import Signatures from "./Signatures";
import Synergy from "./Synergy";
import ServiceMenu from "./ServiceMenu";
import Gallery from "./Gallery";
import Team, { Numbers } from "./Team";
import Spaces, { Faq } from "./Spaces";
import Closing, { StickyBar } from "./Closing";
import { prefersReducedMotion, setLenis } from "./lib";

function Intro() {
  return (
    <div className="ae-intro" aria-hidden="true">
      <p className="ae-intro__word">
        {"Autoestima".split("").map((c, i) => (
          <span key={i} style={{ "--i": i } as React.CSSProperties}>
            {c}
          </span>
        ))}
      </p>
      <span className="ae-intro__line" />
      <p className="ae-intro__tag">Hair & Body · Beauty & Cosmetics</p>
    </div>
  );
}

/* Anel que segue o cursor e cresce sobre botões e links (só com rato) */
function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia("(pointer: fine)").matches || prefersReducedMotion()) return;
    let x = -100;
    let y = -100;
    let cx = x;
    let cy = y;
    let raf = 0;
    const loop = () => {
      cx += (x - cx) * 0.2;
      cy += (y - cy) * 0.2;
      el.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      const t = e.target as Element | null;
      el.classList.toggle("is-hover", Boolean(t?.closest("a, button, summary, input, [role=tab]")));
      el.classList.add("is-on");
    };
    const onLeave = () => el.classList.remove("is-on");
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);
  return <div className="ae-cursor" ref={ref} aria-hidden="true" />;
}

export default function Autoestima({ year }: { year: number }) {
  const rootRef = useRef<HTMLDivElement>(null);

  /* Scroll suave só com rato e sem "reduzir movimento" */
  useEffect(() => {
    if (prefersReducedMotion() || !window.matchMedia("(pointer: fine)").matches) return;
    const lenis = new Lenis({ duration: 1.15, autoRaf: true, anchors: true });
    setLenis(lenis);
    return () => {
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  /* Revela os elementos marcados com data-reveal quando entram no ecrã */
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (prefersReducedMotion()) return;
    root.classList.add("ae-js");
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.08 },
    );
    let raf = 0;
    const scan = () => {
      raf = 0;
      root.querySelectorAll("[data-reveal]:not(.is-in)").forEach((el) => io.observe(el));
    };
    scan();
    const mo = new MutationObserver(() => {
      if (!raf) raf = requestAnimationFrame(scan);
    });
    mo.observe(root, { childList: true, subtree: true });
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return (
    <div className="ae" ref={rootRef}>
      <Intro />
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Story />
        <Signatures />
        <Synergy />
        <ServiceMenu />
        <Gallery />
        <Team />
        <Numbers />
        <Spaces />
        <Faq />
      </main>
      <Closing year={year} />
      <StickyBar />
    </div>
  );
}
