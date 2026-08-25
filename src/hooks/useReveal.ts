import { useEffect, useRef } from "react";

/**
 * Mengamati semua elemen `.reveal` di dalam container dan
 * menambahkan kelas `.is-in` saat elemen masuk viewport.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const targets = root.classList.contains("reveal")
      ? [root, ...Array.from(root.querySelectorAll<HTMLElement>(".reveal"))]
      : Array.from(root.querySelectorAll<HTMLElement>(".reveal"));

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -48px 0px" }
    );

    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  return ref;
}
