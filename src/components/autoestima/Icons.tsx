import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;
const base = { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", "aria-hidden": true } as const;

export const ArrowUpRight = (p: P) => (
  <svg {...base} {...p}>
    <path d="M7 17 17 7M8 7h9v9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ArrowRight = (p: P) => (
  <svg {...base} {...p}>
    <path
      d="M4 12h16m-6-6 6 6-6 6"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ArrowLeft = (p: P) => (
  <svg {...base} {...p}>
    <path
      d="M20 12H4m6-6-6 6 6 6"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Instagram = (p: P) => (
  <svg {...base} {...p}>
    <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" />
  </svg>
);

export const WhatsApp = (p: P) => (
  <svg {...base} {...p}>
    <path d="M4 20l1.2-3.8A8.5 8.5 0 1 1 8 19.1L4 20Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    <path
      d="M9.2 8.6c.2-.5.5-.5.8-.5h.5c.2 0 .4.1.5.4l.6 1.5c.1.2 0 .5-.1.6l-.5.6c.6 1.1 1.4 1.9 2.5 2.5l.6-.5c.2-.2.4-.2.6-.1l1.5.6c.3.1.4.3.4.5v.5c0 .3 0 .6-.5.8-.6.3-1.6.4-3-.3a8.3 8.3 0 0 1-3.6-3.6c-.7-1.4-.6-2.4-.3-3Z"
      fill="currentColor"
    />
  </svg>
);

export const Phone = (p: P) => (
  <svg {...base} {...p}>
    <path
      d="M6.6 3.5h2.6l1.4 4-2 1.4a12 12 0 0 0 6.5 6.5l1.4-2 4 1.4v2.6a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.6 5.7a2 2 0 0 1 2-2.2Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
  </svg>
);

export const Clock = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.6" />
    <path d="M12 7.5V12l3 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const MapPin = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="12" cy="9.5" r="2.5" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);

export const Search = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.6" />
    <path d="m16 16 4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

export const Plus = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

export const Close = (p: P) => (
  <svg {...base} {...p}>
    <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

export const Check = (p: P) => (
  <svg {...base} {...p}>
    <path
      d="m5 12.5 4.5 4.5L19 7.5"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Sparkle = (p: P) => (
  <svg {...base} {...p}>
    <path
      d="M12 2c.6 4.8 2.2 6.9 7 8-4.8 1.1-6.4 3.2-7 8-.6-4.8-2.2-6.9-7-8 4.8-1.1 6.4-3.2 7-8Z"
      fill="currentColor"
    />
  </svg>
);
