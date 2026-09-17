import { useWedding } from "../../lib/WeddingContext";
import { IconCheck } from "../Icons";

export default function LanguageSelector() {
  const { data, language, updateData } = useWedding();

  const handleSelectLanguage = async (lang: "id" | "en") => {
    await updateData({ language: lang });
  };

  const languages = [
    {
      id: "id" as const,
      name: "Bahasa Indonesia",
      flag: "🇮🇩",
      description: "Format nasional Indonesia",
    },
    {
      id: "en" as const,
      name: "English",
      flag: "🇬🇧",
      description: "International format",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-light italic text-ivory">
          Pilih Bahasa
        </h2>
        <p className="mt-2 text-sm text-sage-300/70">
          Pilih bahasa untuk tampilan undangan. Bahasa akan diterapkan ke seluruh halaman undangan.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {languages.map((lang) => {
          const isSelected = language === lang.id;
          return (
            <button
              key={lang.id}
              onClick={() => handleSelectLanguage(lang.id)}
              className={`group relative overflow-hidden rounded-lg border-2 transition-all duration-300 ${
                isSelected
                  ? "border-gold-400 shadow-[0_0_20px_rgba(200,169,97,0.3)]"
                  : "border-gold-500/20 hover:border-gold-500/50"
              }`}
            >
              {/* Preview */}
              <div className="relative h-32 bg-pine-900/80 p-6">
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <div className="text-5xl mb-3">{lang.flag}</div>
                  <div className="font-display text-xl italic text-gold-300">
                    {lang.id === "id" ? "Undangan Pernikahan" : "Wedding Invitation"}
                  </div>
                  <div className="mt-2 text-xs text-sage-300/70">
                    {lang.id === "id" ? "Raka & Sekar" : "John & Jane"}
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
                  {lang.name}
                </h3>
                <p className="mt-1 text-xs text-sage-300/70">{lang.description}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Info Box */}
      <div className="mt-6 rounded-lg border border-gold-500/20 bg-pine-800/50 p-5">
        <h4 className="font-display text-sm font-semibold text-gold-300">
          💡 Informasi
        </h4>
        <ul className="mt-3 space-y-2 text-xs text-sage-300/80">
          <li>• Bahasa akan diterapkan ke seluruh teks di undangan</li>
          <li>• Nama mempelai, tanggal, dan lokasi tetap sesuai data yang Anda isi</li>
          <li>• Anda bisa mengubah bahasa kapan saja</li>
          <li>• Bahasa default adalah Bahasa Indonesia</li>
        </ul>
      </div>
    </div>
  );
}
