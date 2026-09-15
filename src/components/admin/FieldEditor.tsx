import { useState, type ReactNode } from "react";
import { IconCheck, IconPencil, IconClose } from "../Icons";

interface FieldEditorProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  type?: "text" | "textarea" | "color" | "number";
  placeholder?: string;
  description?: string;
  multiline?: boolean;
}

export default function FieldEditor({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  description,
  multiline,
}: FieldEditorProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);

  const save = () => {
    onChange(draft);
    setEditing(false);
  };

  const cancel = () => {
    setDraft(value);
    setEditing(false);
  };

  const inputCls =
    "w-full rounded-[3px] border border-gold-500/25 bg-pine-900/80 px-4 py-3 text-sm text-ivory placeholder:text-sage-300/40 transition-colors focus:border-gold-400 focus:outline-none";

  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between">
        <label className="text-[11px] font-bold uppercase tracking-[0.28em] text-gold-400">
          {label}
        </label>
        {!editing && (
          <button
            onClick={() => setEditing(true)}
            className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-gold-300 transition-colors hover:text-gold-200"
          >
            <IconPencil className="size-3.5" />
            Ubah
          </button>
        )}
      </div>

      {editing ? (
        <div className="space-y-2.5">
          {type === "textarea" || multiline ? (
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              rows={4}
              placeholder={placeholder}
              className={`${inputCls} resize-y`}
              autoFocus
            />
          ) : type === "color" ? (
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                className="size-12 cursor-pointer rounded-[3px] border border-gold-500/25"
              />
              <input
                type="text"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                className={`${inputCls} flex-1 font-mono uppercase`}
                placeholder="#000000"
              />
            </div>
          ) : type === "number" ? (
            <input
              type="number"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder={placeholder}
              className={inputCls}
              autoFocus
            />
          ) : (
            <input
              type="text"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder={placeholder}
              className={inputCls}
              autoFocus
            />
          )}

          {description && <p className="text-xs text-sage-300/60">{description}</p>}

          <div className="flex gap-2">
            <button
              onClick={save}
              className="inline-flex items-center gap-2 bg-gold-500 px-5 py-2.5 text-[10px] font-extrabold uppercase tracking-[0.18em] text-pine-950 transition-all hover:bg-gold-400"
            >
              <IconCheck className="size-4" />
              Simpan
            </button>
            <button
              onClick={cancel}
              className="border border-gold-500/30 px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.18em] text-sage-300 transition-colors hover:text-ivory"
            >
              Batal
            </button>
          </div>
        </div>
      ) : (
        <div className="rounded-[3px] border border-gold-500/15 bg-pine-800/40 px-4 py-3">
          {type === "color" ? (
            <div className="flex items-center gap-3">
              <span
                className="size-8 rounded-[3px] border border-gold-500/30"
                style={{ backgroundColor: value }}
              />
              <span className="font-mono text-sm uppercase text-ivory">{value}</span>
            </div>
          ) : (
            <p className="text-sm leading-relaxed text-ivory whitespace-pre-wrap">
              {value || <span className="text-sage-300/50 italic">Belum diisi</span>}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
