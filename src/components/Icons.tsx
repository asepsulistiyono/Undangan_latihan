type P = { className?: string };

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const IconEnvelope = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <rect x="3" y="5.5" width="18" height="13" rx="1.2" />
    <path d="M3.4 7l8.6 6 8.6-6" />
  </svg>
);

export const IconRings = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <circle cx="9" cy="13.5" r="5.5" />
    <circle cx="15" cy="13.5" r="5.5" />
    <path d="M12.8 4.6L15 2.4l2.2 2.2-2.2 2.2z" />
  </svg>
);

export const IconCalendar = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <rect x="3.5" y="5" width="17" height="15.5" rx="1.5" />
    <path d="M3.5 9.5h17M8 3v4M16 3v4" />
    <path d="M8 13.5h2.5M13.5 13.5H16M8 17h2.5" />
  </svg>
);

export const IconClock = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3.2 2" />
  </svg>
);

export const IconPin = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M12 21.5s-6.8-5.6-6.8-10.6a6.8 6.8 0 1113.6 0c0 5-6.8 10.6-6.8 10.6z" />
    <circle cx="12" cy="10.8" r="2.4" />
  </svg>
);

export const IconHeart = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M12 20.5C7.2 16.2 3.5 13 3.5 9.5 3.5 7 5.4 5 7.9 5c1.6 0 3.1.8 4.1 2.1C13 5.8 14.5 5 16.1 5c2.5 0 4.4 2 4.4 4.5 0 3.5-3.7 6.7-8.5 11z" />
  </svg>
);

export const IconCamera = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <rect x="3" y="7" width="18" height="13" rx="2" />
    <circle cx="12" cy="13.2" r="3.6" />
    <path d="M8 7l1.4-2.5h5.2L16 7" />
  </svg>
);

export const IconChat = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M21 12a8.5 8.5 0 01-8.5 8.5c-1.2 0-2.4-.25-3.4-.7L3 21l1.2-5.1A8.5 8.5 0 1121 12z" />
    <path d="M8.5 12h.01M12 12h.01M15.5 12h.01" />
  </svg>
);

export const IconCopy = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <rect x="9" y="9" width="11" height="11" rx="1.5" />
    <path d="M5 15V5.5A1.5 1.5 0 016.5 4H15" />
  </svg>
);

export const IconCheck = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M4.5 12.5l5 5 10-11" />
  </svg>
);

export const IconInstagram = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
    <circle cx="12" cy="12" r="3.8" />
    <circle cx="17" cy="7" r="0.6" fill="currentColor" stroke="none" />
  </svg>
);

export const IconArrowUp = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M12 19.5v-15M5.5 11L12 4.5 18.5 11" />
  </svg>
);

export const IconClose = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

export const IconChevronL = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M14.5 5.5L8 12l6.5 6.5" />
  </svg>
);

export const IconChevronR = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M9.5 5.5L16 12l-6.5 6.5" />
  </svg>
);

export const IconSparkle = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M12 3.5l1.9 6.6 6.6 1.9-6.6 1.9L12 20.5l-1.9-6.6-6.6-1.9 6.6-1.9z" />
  </svg>
);

export const IconLeaf = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M5 19.5C5 9.5 13 5 20 4.2 19 11.5 15 19.5 5 19.5z" />
    <path d="M5 19.5c3-6.5 7-9.8 11-11.5" />
  </svg>
);

export const IconGift = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <rect x="3.5" y="8.5" width="17" height="4" rx="0.8" />
    <rect x="5.5" y="12.5" width="13" height="8" rx="1" />
    <path d="M12 8.5v12" />
    <path d="M12 8.5C10 8.5 7.3 7.9 7.3 5.7 7.3 4.4 8.4 3.5 9.6 3.5 11.4 3.5 12 6 12 8.5zM12 8.5c2 0 4.7-.6 4.7-2.8 0-1.3-1.1-2.2-2.3-2.2-1.8 0-2.4 2.5-2.4 5z" />
  </svg>
);

export const IconUsers = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <circle cx="9" cy="9.5" r="3.2" />
    <path d="M3.5 19.5c0-3 2.5-5 5.5-5s5.5 2 5.5 5" />
    <circle cx="16.5" cy="10" r="2.4" />
    <path d="M15.7 14.7c2.6.4 4.8 2.2 4.8 4.8" />
  </svg>
);

export const IconGlass = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M7 3.5h10l-1 7a4 4 0 01-8 0z" />
    <path d="M12 14.5v5M8.5 20.5h7" />
  </svg>
);
