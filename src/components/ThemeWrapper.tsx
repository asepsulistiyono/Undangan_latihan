import { type ReactNode } from "react";
import { useWedding } from "../lib/WeddingContext";

export default function ThemeWrapper({ children }: { children: ReactNode }) {
  const { theme } = useWedding();

  return (
    <div
      className="relative min-h-screen overflow-x-clip font-sans"
      style={{
        backgroundColor: theme.colors.background,
        color: theme.colors.text,
        // CSS variables untuk digunakan di komponen
        ["--theme-primary" as any]: theme.colors.primary,
        ["--theme-secondary" as any]: theme.colors.secondary,
        ["--theme-accent" as any]: theme.colors.accent,
      }}
    >
      {children}
    </div>
  );
}
