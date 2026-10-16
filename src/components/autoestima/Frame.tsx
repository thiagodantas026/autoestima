import type { CSSProperties } from "react";

/* Moldura de imagem. Com `src` mostra a fotografia; sem `src` desenha uma
   arte lilás (gradiente + inicial em itálico) que ocupa o lugar da foto
   até a cliente enviar as imagens. */
export default function Frame({
  src,
  alt,
  hue = 270,
  mark,
  className = "",
  eager = false,
}: {
  src?: string;
  alt: string;
  hue?: number;
  mark?: string;
  className?: string;
  eager?: boolean;
}) {
  if (src) {
    return (
      <div className={`ae-frame ${className}`}>
        <img src={src} alt={alt} loading={eager ? "eager" : "lazy"} decoding="async" />
      </div>
    );
  }
  return (
    <div
      className={`ae-frame ae-frame--art ${className}`}
      style={{ "--h": hue } as CSSProperties}
      role="img"
      aria-label={alt}
    >
      <span className="ae-frame__orbit" aria-hidden="true" />
      <span className="ae-frame__orbit ae-frame__orbit--2" aria-hidden="true" />
      {mark && (
        <span className="ae-frame__mark" aria-hidden="true">
          {mark}
        </span>
      )}
    </div>
  );
}
