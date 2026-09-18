import { useWedding } from "../../lib/WeddingContext";
import { getAllTemplates, type TemplateId } from "../../lib/templates";

export default function TemplateSelector() {
  const { data, template, updateData } = useWedding();
  const templates = getAllTemplates();

  const handleSelectTemplate = async (templateId: TemplateId) => {
    await updateData({ templateId });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-light italic text-ivory">
          Pilih Desain Template
        </h2>
        <p className="mt-2 text-sm text-sage-300/70">
          Pilih template desain yang sesuai dengan tema pernikahan Anda. Setiap template memiliki layout, warna, dan gaya visual yang berbeda.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {templates.map((t) => {
          const isSelected = template.id === t.id;
          return (
            <button
              key={t.id}
              onClick={() => handleSelectTemplate(t.id)}
              className={`group relative overflow-hidden rounded-lg border-2 transition-all duration-300 ${
                isSelected
                  ? "border-gold-400 shadow-[0_0_20px_rgba(200,169,97,0.3)]"
                  : "border-gold-500/20 hover:border-gold-500/50"
              }`}
            >
              {/* Preview */}
              <div className={`relative h-32 ${t.preview}`}>
                {/* Decorative elements based on template */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div
                      className="font-display text-3xl italic"
                      style={{ color: t.colors.secondary }}
                    >
                      {t.name.split(" ")[0]}
                    </div>
                    <div
                      className="mt-1 text-xs tracking-widest"
                      style={{ color: t.colors.accent }}
                    >
                      {t.layout.heroStyle.toUpperCase()}
                    </div>
                  </div>
                </div>

                {/* Selected indicator */}
                {isSelected && (
                  <div className="absolute right-2 top-2 flex size-7 items-center justify-center rounded-full bg-gold-500 shadow-lg">
                    <svg
                      className="size-4 text-pine-950"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="bg-pine-900/80 p-4">
                <h3 className="font-display text-lg font-light italic text-ivory">
                  {t.name}
                </h3>
                <p className="mt-1 text-xs text-sage-300/70">{t.description}</p>
                
                {/* Color swatches */}
                <div className="mt-3 flex gap-2">
                  {Object.entries(t.colors).map(([key, color]) => (
                    <div
                      key={key}
                      className="size-6 rounded-full border border-gold-500/20"
                      style={{ backgroundColor: color }}
                      title={key}
                    />
                  ))}
                </div>
                
                {/* Layout info */}
                <div className="mt-3 text-[10px] text-sage-300/60">
                  <p>Hero: {t.layout.heroStyle}</p>
                  <p>Couple: {t.layout.coupleStyle}</p>
                  <p>Events: {t.layout.eventStyle}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Info Box */}
      <div className="mt-6 rounded-lg border border-gold-500/20 bg-pine-800/50 p-5">
        <h4 className="font-display text-sm font-semibold text-gold-300">
          💡 Informasi Template
        </h4>
        <ul className="mt-3 space-y-2 text-xs text-sage-300/80">
          <li>• Setiap template memiliki layout, warna, dan gaya visual yang berbeda</li>
          <li>• Template akan diterapkan ke seluruh halaman undangan</li>
          <li>• Anda bisa mengubah template kapan saja tanpa kehilangan data</li>
          <li>• Template default adalah "Classic Elegant"</li>
        </ul>
      </div>
    </div>
  );
}
