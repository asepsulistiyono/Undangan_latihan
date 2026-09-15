import { useState } from "react";
import { signIn } from "../../lib/auth";
import { SUPABASE_ENABLED } from "../../lib/supabase";
import { Monogram } from "../Decor";
import { IconArrowLeft, IconCheck } from "../Icons";

export default function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await signIn(email, password);
      onLogin();
    } catch (err: any) {
      setError(err.message || "Login gagal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-x-clip bg-pine-950 font-sans text-ivory">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0"
        style={{
          background:
            "radial-gradient(55% 40% at 85% -5%, rgba(200,169,97,0.09), transparent 65%), radial-gradient(60% 45% at -10% 35%, rgba(32,71,52,0.5), transparent 60%)",
        }}
      />

      <div className="relative mx-auto flex min-h-screen max-w-md flex-col items-center justify-center px-5 py-10">
        <Monogram className="size-20 text-gold-400" />
        <h1 className="mt-6 font-display text-3xl font-light italic text-ivory">
          Panel Admin
        </h1>
        <p className="mt-2 text-sm text-sage-300/80">Masuk untuk mengelola undangan</p>

        <form onSubmit={handleSubmit} className="mt-10 w-full space-y-5">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-[0.28em] text-gold-400">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-2.5 w-full rounded-[3px] border border-gold-500/25 bg-pine-900/80 px-4 py-3 text-sm text-ivory placeholder:text-sage-300/40 transition-colors focus:border-gold-400 focus:outline-none"
              placeholder="admin@example.com"
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-[0.28em] text-gold-400">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-2.5 w-full rounded-[3px] border border-gold-500/25 bg-pine-900/80 px-4 py-3 text-sm text-ivory placeholder:text-sage-300/40 transition-colors focus:border-gold-400 focus:outline-none"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="border-l-2 border-rose-400/70 bg-rose-400/10 px-4 py-3 text-sm text-rose-300">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2.5 bg-gold-500 px-6 py-4 text-xs font-extrabold uppercase tracking-[0.25em] text-pine-950 shadow-[0_10px_30px_rgba(200,169,97,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-400 disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="size-4 animate-spin rounded-full border-2 border-pine-950 border-t-transparent" />
                Memproses...
              </span>
            ) : (
              <>
                <IconCheck className="size-4" />
                Masuk
              </>
            )}
          </button>
        </form>

        <a
          href="#/"
          className="mt-8 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-gold-400 transition-colors hover:text-gold-200"
        >
          <IconArrowLeft className="size-4" />
          Kembali ke undangan
        </a>

        {!SUPABASE_ENABLED && (
          <div className="mt-8 w-full border border-gold-500/30 bg-pine-800/50 p-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-gold-400">
              Mode Demo
            </p>
            <p className="mt-2 text-xs leading-relaxed text-sage-300/80">
              Supabase belum dikonfigurasi. Gunakan kredensial demo berikut:
            </p>
            <div className="mt-3 space-y-1.5 font-mono text-xs">
              <p className="text-gold-200">
                <span className="text-sage-300/60">Email:</span> superadmin@demo.com
              </p>
              <p className="text-gold-200">
                <span className="text-sage-300/60">Password:</span> demo123
              </p>
            </div>
            <p className="mt-3 text-[10px] leading-relaxed text-sage-300/60">
              Data tersimpan di localStorage browser. Untuk produksi, konfigurasi Supabase di file{" "}
              <code className="text-gold-300">.env</code>.
            </p>
          </div>
        )}

        <p className="mt-6 max-w-xs text-center text-xs leading-relaxed text-sage-300/60">
          Belum punya akun? Minta super admin membuatkan akun untuk Anda.
        </p>
      </div>
    </div>
  );
}
