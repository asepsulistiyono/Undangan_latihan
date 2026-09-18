import { type ReactNode } from "react";
import { useWedding } from "../lib/WeddingContext";

interface TemplateWrapperProps {
  children: ReactNode;
}

/**
 * TemplateWrapper - Menerapkan style dari template yang dipilih ke seluruh undangan
 */
export default function TemplateWrapper({ children }: TemplateWrapperProps) {
  const { template } = useWedding();

  // Generate CSS variables dari template
  const cssVariables = {
    "--template-primary": template.colors.primary,
    "--template-secondary": template.colors.secondary,
    "--template-accent": template.colors.accent,
    "--template-background": template.colors.background,
    "--template-text": template.colors.text,
    "--template-font-heading": template.fonts.heading,
    "--template-font-body": template.fonts.body,
    "--template-font-accent": template.fonts.accent,
  } as React.CSSProperties;

  return (
    <div
      className="template-wrapper"
      style={cssVariables}
      data-template={template.id}
      data-hero-style={template.layout.heroStyle}
      data-couple-style={template.layout.coupleStyle}
      data-event-style={template.layout.eventStyle}
    >
      {children}
    </div>
  );
}
