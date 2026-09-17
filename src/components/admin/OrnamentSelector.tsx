import { useWedding } from "../../lib/WeddingContext";
import { ORNAMENTS, type OrnamentId } from "../Ornaments";

export default function OrnamentSelector() {
  const { data, updateData } = useWedding();
  const currentOrnament = (data.ornamentId || "modern") as OrnamentId;

  const handleSelect = async (ornamentId: OrnamentId) => {
    await updateData({ ornamentId });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-light italic text-ivory">
          Pilih Ornamen Adat
        </h2>
        <p className="mt-2 text-sm text-sage-300/70">
          Pilih ornamen yang sesuai dengan budaya dan tema pernikahan Anda. Ornamen akan ditampilkan di sudut-sudut cover undangan.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Object.entries(ORNAMENTS).map(([id, ornament]) => {
          const isSelected = currentOrnament === id;
          const OrnamentComponent = ornament.component;

          return (
            <button
              key={id}
              onClick={() => handleSelect(id as OrnamentId)}
              className={`group relative overflow-hidden rounded-lg border-2 transition-all duration-300 ${
                isSelected
                  ? "border-gold-400 shadow-[0_0_20px_rgba(200,169,97,0.3)]"
                  : "border-gold-500/20 hover:border-gold-500/50"
              }`}
            >
              {/* Preview */}
              <div className="relative h-40 bg-pine-900/80 p-4">
                {/* 4 sudut ornamen */}
                <OrnamentComponent
                  className="absolute left-2 top-2 size-16 text-gold-400"
                  position="top-left"
                />
                <OrnamentComponent
                  className="absolute right-2 top-2 size-16 text-gold-400"
                  position="top-right"
                />
                <OrnamentComponent
                  className="absolute bottom-2 left-2 size-16 text-gold-400"
                  position="bottom-left"
                />
                <OrnamentComponent
                  className="absolute bottom-2 right-2 size-16 text-gold-400"
                  position="bottom-right"
                />

                {/* Center text */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="font-display text-2xl italic text-gold-300">
                      A & B
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
                  {ornament.name}
                </h3>
                <p className="mt-1 text-xs text-sage-300/70">{ornament.description}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
