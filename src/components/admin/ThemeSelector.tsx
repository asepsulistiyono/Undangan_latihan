import { useWedding } from "../../lib/WeddingContext";
import { THEMES } from "../../lib/themes";
import { IconCheck } from "../Icons";

export default function ThemeSelector() {
  const { data, theme, updateData } = useWedding();

  const handleSelectTheme = async (themeId: string) => {
    await updateData({ themeId });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-light italic text-ivory">
          Pilih Tema Undangan
        </h2>
        <p className="mt-2 text-sm text-sage-300/70">
          Pilih tema yang sesuai dengan selera Anda. Tema akan diterapkan ke seluruh halaman undangan.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {THEMES.map((t) => {
          const isSelected = theme.id === t.id;
          return (
            <button
              key={t.id}
              onClick={() => handleSelectTheme(t.id)}
              className={`group relative overflow-hidden rounded-lg border-2 transition-all duration-300 ${
                isSelected
                  ? "border-gold-400 shadow-[0_0_20px_rgba(200,169,97,0.3)]"
                  : "border-gold-500/20 hover:border-gold-500/50"
              }`}
            >
              {/* Preview */}
              <div className={`relative h-32 ${t.preview}`}>
                {/* Decorative elements */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div
                      className="font-display text-3xl italic"
                      style={{ color: t.colors.secondary }}
                    >
                      A & B
                    </div>
                    <div
                      className="mt-1 text-xs tracking-widest"
                      style={{ color: t.colors.accent }}
                    >
                      12 · 06 · 2027
                    </div>
                  </div>
                </div>

                {/* Selected indicator */}
                {isSelected && (
                  <div className="absolute right-2 top-2 flex size-7 items-center justify-center rounded-full bg-gold-500 shadow-lg">
                    <IconCheck className="size-4 text-pine-950" />
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
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
