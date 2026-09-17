import { useRef } from "react";
import { useWedding } from "../../lib/WeddingContext";
import { ORNAMENTS, type OrnamentId } from "../Ornaments";
import { IconUpload, IconTrash } from "../Icons";

export default function OrnamentSelector() {
  const { data, updateData } = useWedding();
  const currentOrnament = (data.ornamentId || "modern") as OrnamentId;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSelect = async (ornamentId: OrnamentId) => {
    await updateData({ ornamentId });
  };

  const handleCustomUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validasi file type
    if (file.type !== "image/svg+xml") {
      alert("Hanya file SVG yang diperbolehkan");
      return;
    }

    // Validasi ukuran file (max 500KB)
    if (file.size > 500 * 1024) {
      alert("Ukuran file maksimal 500KB");
      return;
    }

    // Baca file sebagai text
    const reader = new FileReader();
    reader.onload = async (event) => {
      const svgContent = event.target?.result as string;
      
      // Validasi bahwa ini adalah SVG
      if (!svgContent.includes("<svg")) {
        alert("File bukan SVG yang valid");
        return;
      }

      // Simpan SVG dan set sebagai ornamen custom
      await updateData({ 
        customOrnament: svgContent,
        ornamentId: "custom"
      });
    };
    reader.readAsText(file);
  };

  const handleDeleteCustom = async () => {
    await updateData({ 
      customOrnament: undefined,
      ornamentId: "modern" // Reset ke default
    });
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

        {/* Custom Ornament Upload */}
        <div className="relative overflow-hidden rounded-lg border-2 border-dashed border-gold-500/40 transition-all duration-300 hover:border-gold-500/70">
          {data.customOrnament ? (
            // Preview custom ornament
            <>
              <div className="relative h-40 bg-pine-900/80 p-4">
                {/* Render custom SVG di 4 sudut */}
                <div
                  className="absolute left-2 top-2 size-16 text-gold-400"
                  dangerouslySetInnerHTML={{ __html: data.customOrnament }}
                />
                <div
                  className="absolute right-2 top-2 size-16 scale-x-[-1] text-gold-400"
                  dangerouslySetInnerHTML={{ __html: data.customOrnament }}
                />
                <div
                  className="absolute bottom-2 left-2 size-16 scale-y-[-1] text-gold-400"
                  dangerouslySetInnerHTML={{ __html: data.customOrnament }}
                />
                <div
                  className="absolute bottom-2 right-2 size-16 scale-x-[-1] scale-y-[-1] text-gold-400"
                  dangerouslySetInnerHTML={{ __html: data.customOrnament }}
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
                {currentOrnament === "custom" && (
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

              {/* Info & Actions */}
              <div className="bg-pine-900/80 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-display text-lg font-light italic text-ivory">
                      Custom Ornamen
                    </h3>
                    <p className="mt-1 text-xs text-sage-300/70">SVG upload Anda</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteCustom();
                    }}
                    className="flex size-8 items-center justify-center rounded-full border border-rose-400/40 text-rose-300 transition-colors hover:bg-rose-400 hover:text-pine-950"
                    title="Hapus ornamen custom"
                  >
                    <IconTrash className="size-4" />
                  </button>
                </div>
                <button
                  onClick={() => handleSelect("custom" as OrnamentId)}
                  className={`mt-3 w-full rounded px-3 py-2 text-xs font-bold uppercase tracking-wider transition-all ${
                    currentOrnament === "custom"
                      ? "bg-gold-500 text-pine-950"
                      : "border border-gold-500/40 text-gold-300 hover:bg-gold-500/10"
                  }`}
                >
                  {currentOrnament === "custom" ? "Aktif" : "Gunakan"}
                </button>
              </div>
            </>
          ) : (
            // Upload area
            <label className="flex h-full min-h-[280px] cursor-pointer flex-col items-center justify-center p-6 text-center">
              <input
                ref={fileInputRef}
                type="file"
                accept=".svg,image/svg+xml"
                onChange={handleCustomUpload}
                className="hidden"
              />
              <div className="flex size-16 items-center justify-center rounded-full border-2 border-dashed border-gold-500/40">
                <IconUpload className="size-8 text-gold-400" />
              </div>
              <h3 className="mt-4 font-display text-lg font-light italic text-ivory">
                Upload Custom
              </h3>
              <p className="mt-2 text-xs text-sage-300/70">
                Upload file SVG Anda sendiri
              </p>
              <p className="mt-1 text-[10px] text-sage-300/50">
                Maksimal 500KB
              </p>
            </label>
          )}
        </div>
      </div>

      {/* Info Box */}
      <div className="mt-6 rounded-lg border border-gold-500/20 bg-pine-800/50 p-5">
        <h4 className="font-display text-sm font-semibold text-gold-300">
          💡 Tips Upload Ornamen Custom
        </h4>
        <ul className="mt-3 space-y-2 text-xs text-sage-300/80">
          <li>• File harus dalam format SVG (Scalable Vector Graphics)</li>
          <li>• Ukuran maksimal 500KB untuk performa optimal</li>
          <li>• Gunakan viewBox="0 0 120 120" untuk konsistensi</li>
          <li>• Ornamen akan otomatis di-rotate di 4 sudut cover</li>
          <li>• Warna ornamen akan menyesuaikan tema (emas/default)</li>
          <li>• Anda bisa membuat ornamen di Adobe Illustrator, Figma, atau Inkscape</li>
        </ul>
      </div>
    </div>
  );
}
