import { useWedding } from "../../lib/WeddingContext";
import { religiousFormats, type ReligiousFormat } from "../../lib/religiousFormats";
import { IconCheck } from "../Icons";

export default function ReligiousFormatSelector() {
  const { data, updateData, religiousFormat } = useWedding();

  const handleSelect = async (formatId: ReligiousFormat) => {
    console.log("🔄 Memilih format agama:", formatId);
    
    // Reset quote ke kosong agar menggunakan religiousFormat.defaultScripture
    await updateData({ 
      religiousFormat: formatId,
      quote: {
        arabic: "",
        text: "",
        textEn: "",
        source: "",
      }
    });
    
    console.log("✅ Format agama tersimpan, quote di-reset");
  };

  const formats = Object.values(religiousFormats);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-light italic text-ivory">
          Pilih Format Agama
        </h2>
        <p className="mt-2 text-sm text-sage-300/70">
          Pilih format penulisan berdasarkan agama yang akan digunakan dalam undangan. Format ini akan mempengaruhi salam pembuka, ayat suci, dan salam penutup.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {formats.map((format) => {
          const isSelected = religiousFormat.id === format.id;
          return (
            <button
              key={format.id}
              onClick={() => handleSelect(format.id)}
              className={`group relative overflow-hidden rounded-lg border-2 transition-all duration-300 ${
                isSelected
                  ? "border-gold-400 shadow-[0_0_20px_rgba(200,169,97,0.3)]"
                  : "border-gold-500/20 hover:border-gold-500/50"
              }`}
            >
              {/* Preview */}
              <div className="relative h-40 bg-pine-900/80 p-4">
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <div className="text-5xl mb-3" style={{ color: format.color }}>
                    {format.symbol}
                  </div>
                  <div className="font-display text-lg italic text-gold-300">
                    {format.name}
                  </div>
                  <div className="mt-2 text-xs text-sage-300/70">
                    {format.openingGreeting}
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
                  {format.name}
                </h3>
                <p className="mt-1 text-xs text-sage-300/70">{format.nameEn}</p>
                <div className="mt-3 space-y-1 text-[10px] text-sage-300/60">
                  <p><span className="font-semibold text-gold-400">Salam:</span> {format.openingGreeting}</p>
                  <p><span className="font-semibold text-gold-400">Ayat:</span> {format.scriptureTitle}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Info Box */}
      <div className="mt-6 rounded-lg border border-gold-500/20 bg-pine-800/50 p-5">
        <h4 className="font-display text-sm font-semibold text-gold-300">
          💡 Informasi Format Agama
        </h4>
        <ul className="mt-3 space-y-2 text-xs text-sage-300/80">
          <li>• <span className="font-semibold text-gold-400">Islam:</span> Menggunakan salam Assalamu'alaikum, ayat Al-Quran, dan doa islami</li>
          <li>• <span className="font-semibold text-gold-400">Kristen Protestan:</span> Menggunakan salam Shalom, ayat Al-Kitab, dan berkat Kristen</li>
          <li>• <span className="font-semibold text-gold-400">Kristen Katolik:</span> Menggunakan salam dalam Kristus, bacaan Kitab Suci, dan berkat Katolik</li>
          <li>• <span className="font-semibold text-gold-400">Hindu:</span> Menggunakan Om Swastiastu, Wedasana, dan doa Hindu</li>
          <li>• <span className="font-semibold text-gold-400">Buddha:</span> Menggunakan Namo Buddhaya, Dhammapada, dan doa Buddha</li>
          <li>• <span className="font-semibold text-gold-400">Konghucu:</span> Menggunakan salam kebajikan, ajaran Li Ji, dan doa Konghucu</li>
          <li>• <span className="font-semibold text-gold-400">Universal:</span> Format netral tanpa afiliasi agama tertentu</li>
        </ul>
      </div>
    </div>
  );
}
