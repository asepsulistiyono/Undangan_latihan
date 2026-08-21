import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";

/* ---------------- countdown ---------------- */
export interface CountdownParts {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  passed: boolean;
}

export function useCountdown(targetISO: string): CountdownParts {
  const target = useMemo(() => new Date(targetISO).getTime(), [targetISO]);
  const calc = (): CountdownParts => {
    const diff = target - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, passed: true };
    return {
      days: Math.floor(diff / 86_400_000),
      hours: Math.floor(diff / 3_600_000) % 24,
      minutes: Math.floor(diff / 60_000) % 60,
      seconds: Math.floor(diff / 1_000) % 60,
      passed: false,
    };
  };
  const [parts, setParts] = useState<CountdownParts>(calc);
  useEffect(() => {
    const id = window.setInterval(() => setParts(calc()), 1000);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);
  return parts;
}

/* ---------------- in-view (scroll reveal) ---------------- */
export function useInView<T extends HTMLElement>(threshold = 0.18) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setInView(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true);
            obs.unobserve(e.target);
          }
        });
      },
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ---------------- guest name from URL ---------------- */
export function useGuestName(): string {
  return useMemo(() => {
    const p = new URLSearchParams(window.location.search);
    return p.get("to") ?? p.get("guest") ?? p.get("nama") ?? "Tamu Undangan";
  }, []);
}

/* ---------------- body scroll lock ---------------- */
export function useScrollLock(locked: boolean) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = locked ? "hidden" : prev;
    return () => {
      document.body.style.overflow = prev;
    };
  }, [locked]);
}

/* ---------------- helper: stagger style ---------------- */
export const stagger = (ms: number): CSSProperties =>
  ({ "--rd": `${ms}ms` }) as CSSProperties;
