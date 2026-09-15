import { useEffect, useState } from "react";
import {
  changePassword,
  createAdmin,
  deleteAdmin,
  listAdmins,
  signOut,
  type AdminProfile,
} from "../../lib/auth";
import { Monogram } from "../Decor";
import { IconArrowLeft, IconCheck, IconClose, IconTrash, IconUsers } from "../Icons";

export default function SuperAdminPanel({ profile }: { profile: AdminProfile }) {
  const [admins, setAdmins] = useState<AdminProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newRole, setNewRole] = useState<"admin" | "super_admin">("admin");
  const [newName, setNewName] = useState("");
  const [creating, setCreating] = useState(false);
  const [changingPwd, setChangingPwd] = useState(false);
  const [oldPwd, setOldPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2600);
  };

  const fetchAdmins = async () => {
    setLoading(true);
    try {
      const list = await listAdmins();
      setAdmins(list);
    } catch (err: any) {
      showToast("Gagal memuat daftar admin: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail || !newPassword) {
      showToast("Email dan password wajib diisi");
      return;
    }
    setCreating(true);
    try {
      await createAdmin(newEmail, newPassword, newRole, newName || null);
      showToast("Admin berhasil dibuat");
      setNewEmail("");
      setNewPassword("");
      setNewName("");
      setNewRole("admin");
      fetchAdmins();
    } catch (err: any) {
      showToast("Gagal membuat admin: " + err.message);
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (userId: string, name: string) => {
    if (!confirm(`Yakin ingin menghapus admin "${name}"?`)) return;
    try {
      await deleteAdmin(userId);
      showToast("Admin dihapus");
      fetchAdmins();
    } catch (err: any) {
      showToast("Gagal menghapus: " + err.message);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPwd !== confirmPwd) {
      showToast("Password baru tidak cocok");
      return;
    }
    if (newPwd.length < 6) {
      showToast("Password minimal 6 karakter");
      return;
    }
    setChangingPwd(true);
    try {
      await changePassword(newPwd);
      showToast("Password berhasil diubah");
      setOldPwd("");
      setNewPwd("");
      setConfirmPwd("");
    } catch (err: any) {
      showToast("Gagal mengubah password: " + err.message);
    } finally {
      setChangingPwd(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-pine-950 font-sans text-ivory">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0"
        style={{
          background:
            "radial-gradient(55% 40% at 85% -5%, rgba(200,169,97,0.09), transparent 65%), radial-gradient(60% 45% at -10% 35%, rgba(32,71,52,0.5), transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-5xl px-5 py-8 sm:px-8">
        {/* Header */}
        <header className="flex flex-wrap items-center justify-between gap-5 border-b border-gold-500/15 pb-6">
          <div className="flex items-center gap-4">
            <Monogram className="size-12 text-gold-400 sm:size-14" />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.38em] text-rose-400">
                Super Admin
              </p>
              <h1 className="mt-1 font-display text-2xl font-light italic text-ivory sm:text-3xl">
                Kelola Admin
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="#/admin"
              className="inline-flex items-center gap-2 border border-gold-500/40 px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.18em] text-gold-300 transition-all hover:bg-gold-500 hover:text-pine-950"
            >
              <IconArrowLeft className="size-4" />
              Panel Admin
            </a>
            <a
              href="#/"
              className="inline-flex items-center gap-2 border border-gold-500/40 px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.18em] text-gold-300 transition-all hover:bg-gold-500 hover:text-pine-950"
            >
              Lihat Undangan
            </a>
            <button
              onClick={() => signOut()}
              className="border border-rose-400/30 px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.18em] text-rose-300 transition-colors hover:bg-rose-400 hover:text-pine-950"
            >
              Keluar
            </button>
          </div>
        </header>

        {/* Ganti Password */}
        <section className="mt-8">
          <h2 className="font-display text-2xl font-light italic text-ivory">
            Ganti Password Saya
          </h2>
          <form onSubmit={handleChangePassword} className="mt-5 space-y-5 border border-gold-500/15 bg-pine-800/40 p-6">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-[0.28em] text-gold-400">
                Password Baru
              </label>
              <input
                type="password"
                value={newPwd}
                onChange={(e) => setNewPwd(e.target.value)}
                required
                minLength={6}
                className="mt-2.5 w-full rounded-[3px] border border-gold-500/25 bg-pine-900/80 px-4 py-3 text-sm text-ivory placeholder:text-sage-300/40 transition-colors focus:border-gold-400 focus:outline-none"
                placeholder="Minimal 6 karakter"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-[0.28em] text-gold-400">
                Konfirmasi Password Baru
              </label>
              <input
                type="password"
                value={confirmPwd}
                onChange={(e) => setConfirmPwd(e.target.value)}
                required
                className="mt-2.5 w-full rounded-[3px] border border-gold-500/25 bg-pine-900/80 px-4 py-3 text-sm text-ivory placeholder:text-sage-300/40 transition-colors focus:border-gold-400 focus:outline-none"
                placeholder="Ulangi password baru"
              />
            </div>
            <button
              type="submit"
              disabled={changingPwd}
              className="inline-flex items-center gap-2.5 bg-gold-500 px-6 py-3 text-[11px] font-extrabold uppercase tracking-[0.22em] text-pine-950 shadow-[0_8px_24px_rgba(200,169,97,0.25)] transition-all hover:-translate-y-0.5 hover:bg-gold-400 disabled:opacity-50"
            >
              {changingPwd ? "Menyimpan..." : "Ubah Password"}
            </button>
          </form>
        </section>

        {/* Tambah Admin */}
        <section className="mt-12">
          <h2 className="font-display text-2xl font-light italic text-ivory">
            Tambah Admin Baru
          </h2>
          <form onSubmit={handleCreate} className="mt-5 space-y-5 border border-gold-500/15 bg-pine-800/40 p-6">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-[0.28em] text-gold-400">
                Nama (opsional)
              </label>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="mt-2.5 w-full rounded-[3px] border border-gold-500/25 bg-pine-900/80 px-4 py-3 text-sm text-ivory placeholder:text-sage-300/40 transition-colors focus:border-gold-400 focus:outline-none"
                placeholder="Nama admin"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-[0.28em] text-gold-400">
                Email
              </label>
              <input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                required
                className="mt-2.5 w-full rounded-[3px] border border-gold-500/25 bg-pine-900/80 px-4 py-3 text-sm text-ivory placeholder:text-sage-300/40 transition-colors focus:border-gold-400 focus:outline-none"
                placeholder="admin@example.com"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-[0.28em] text-gold-400">
                Password Awal
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength={6}
                className="mt-2.5 w-full rounded-[3px] border border-gold-500/25 bg-pine-900/80 px-4 py-3 text-sm text-ivory placeholder:text-sage-300/40 transition-colors focus:border-gold-400 focus:outline-none"
                placeholder="Minimal 6 karakter"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-[0.28em] text-gold-400">
                Role
              </label>
              <div className="mt-2.5 flex gap-3">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="admin"
                    checked={newRole === "admin"}
                    onChange={() => setNewRole("admin")}
                    className="size-4 accent-gold-500"
                  />
                  <span className="text-sm text-ivory">Admin</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="super_admin"
                    checked={newRole === "super_admin"}
                    onChange={() => setNewRole("super_admin")}
                    className="size-4 accent-rose-400"
                  />
                  <span className="text-sm text-ivory">Super Admin</span>
                </label>
              </div>
            </div>
            <button
              type="submit"
              disabled={creating}
              className="inline-flex items-center gap-2.5 bg-gold-500 px-6 py-3 text-[11px] font-extrabold uppercase tracking-[0.22em] text-pine-950 shadow-[0_8px_24px_rgba(200,169,97,0.25)] transition-all hover:-translate-y-0.5 hover:bg-gold-400 disabled:opacity-50"
            >
              {creating ? "Membuat..." : "Buat Admin"}
            </button>
          </form>
        </section>

        {/* Daftar Admin */}
        <section className="mt-12">
          <h2 className="font-display text-2xl font-light italic text-ivory">
            Daftar Admin
          </h2>
          {loading ? (
            <div className="mt-5 text-center text-sage-300/70">Memuat...</div>
          ) : admins.length === 0 ? (
            <div className="mt-5 border border-dashed border-gold-500/25 px-6 py-12 text-center">
              <IconUsers className="mx-auto size-10 text-gold-500/50" />
              <p className="mt-4 font-display text-lg italic text-sage-300/90">
                Belum ada admin
              </p>
            </div>
          ) : (
            <ul className="mt-5 space-y-3">
              {admins.map((a) => (
                <li
                  key={a.user_id}
                  className="flex flex-col gap-3 border border-gold-500/15 bg-pine-800/40 p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-ivory">
                      {a.name || "Tanpa nama"}
                    </p>
                    <p className="mt-0.5 truncate text-xs text-sage-300/70">
                      {a.user_id}
                    </p>
                    <span
                      className={`mt-2 inline-block rounded-full px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                        a.role === "super_admin"
                          ? "border border-rose-400/40 text-rose-300"
                          : "border border-gold-500/40 text-gold-300"
                      }`}
                    >
                      {a.role === "super_admin" ? "Super Admin" : "Admin"}
                    </span>
                  </div>
                  {a.user_id !== profile.user_id && (
                    <button
                      onClick={() => handleDelete(a.user_id, a.name || "Tanpa nama")}
                      className="inline-flex items-center gap-2 border border-rose-400/30 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-rose-300 transition-colors hover:bg-rose-400 hover:text-pine-950"
                    >
                      <IconTrash className="size-4" />
                      Hapus
                    </button>
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      {/* Toast */}
      {toast && (
        <div
          role="status"
          className="fixed bottom-6 left-1/2 z-[95] flex -translate-x-1/2 items-center gap-2.5 whitespace-nowrap bg-gold-500 px-6 py-3.5 text-xs font-extrabold uppercase tracking-[0.18em] text-pine-950 shadow-[0_16px_44px_rgba(200,169,97,0.4)] animate-[tick-pop_0.5s_cubic-bezier(0.16,1,0.3,1)]"
        >
          <IconCheck className="size-4" />
          {toast}
        </div>
      )}
    </div>
  );
}
