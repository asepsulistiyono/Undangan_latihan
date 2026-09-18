import { useEffect, useState } from "react";
import {
  changePassword,
  createAdmin,
  deleteAdmin,
  getAdminPassword,
  getAdminWA,
  listAdmins,
  resetAdminPassword,
  setAdminWA,
  signOut,
  type AdminProfile,
} from "../../lib/auth";
import { Monogram } from "../Decor";
import { IconArrowLeft, IconCheck, IconEye, IconEyeOff, IconPencil, IconTrash, IconUsers } from "../Icons";

export default function SuperAdminPanel({ profile, userName }: { profile: AdminProfile; userName: string | null }) {
  const [admins, setAdmins] = useState<AdminProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newRole, setNewRole] = useState<"admin" | "super_admin">("admin");
  const [newName, setNewName] = useState("");
  const [creating, setCreating] = useState(false);
  const [showPwdModal, setShowPwdModal] = useState(false);
  const [adminWA, setAdminWAState] = useState("6281234567890");
  const [editingWA, setEditingWA] = useState(false);
  const [tempWA, setTempWA] = useState("");
  const [showPwd, setShowPwd] = useState<Record<string, string | null>>({});
  const [resetModal, setResetModal] = useState<{ userId: string; name: string } | null>(null);
  const [resetPwd, setResetPwd] = useState("");
  const [resetConfirmPwd, setResetConfirmPwd] = useState("");
  const [changePwdModal, setChangePwdModal] = useState(false);
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
    getAdminWA().then(setAdminWAState);
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUsername || !newPassword) {
      showToast("Username dan password wajib diisi");
      return;
    }
    if (newPassword.length < 6) {
      showToast("Password minimal 6 karakter");
      return;
    }
    setCreating(true);
    try {
      await createAdmin(newUsername, newPassword, newRole, newName || null);
      showToast("Admin berhasil dibuat");
      setNewUsername("");
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

  const handleChangePassword = async () => {
    if (newPwd !== confirmPwd) {
      showToast("Password baru tidak cocok");
      return;
    }
    if (newPwd.length < 6) {
      showToast("Password minimal 6 karakter");
      return;
    }
    try {
      await changePassword(newPwd);
      showToast("Password berhasil diubah");
      setNewPwd("");
      setConfirmPwd("");
      setChangePwdModal(false);
    } catch (err: any) {
      showToast("Gagal mengubah password: " + err.message);
    }
  };

  const handleTogglePassword = async (userId: string) => {
    if (showPwd[userId]) {
      setShowPwd((prev) => ({ ...prev, [userId]: null }));
      return;
    }
    try {
      const pwd = await getAdminPassword(userId);
      setShowPwd((prev) => ({ ...prev, [userId]: pwd }));
    } catch (err: any) {
      showToast("Gagal menampilkan password: " + err.message);
    }
  };

  const handleResetPassword = async () => {
    if (!resetModal) return;
    if (resetPwd !== resetConfirmPwd) {
      showToast("Password baru tidak cocok");
      return;
    }
    if (resetPwd.length < 6) {
      showToast("Password minimal 6 karakter");
      return;
    }
    try {
      await resetAdminPassword(resetModal.userId, resetPwd);
      showToast("Password berhasil direset");
      setResetModal(null);
      setResetPwd("");
      setResetConfirmPwd("");
    } catch (err: any) {
      showToast("Gagal reset password: " + err.message);
    }
  };

  const handleSaveWA = async () => {
    if (!tempWA) {
      showToast("Nomor WhatsApp wajib diisi");
      return;
    }
    try {
      await setAdminWA(tempWA);
      setAdminWAState(tempWA);
      setEditingWA(false);
      showToast("Nomor WhatsApp berhasil diperbarui");
    } catch (err: any) {
      showToast("Gagal menyimpan: " + err.message);
    }
  };

  // Cari username dari admin list
  const getUsername = (userId: string): string => {
    // Di mode demo, user_id adalah ID unik, kita perlu lookup dari localStorage
    // Untuk sekarang, tampilkan user_id saja
    return userId;
  };

  return (
    <div className="relative min-h-screen bg-pine-950 font-sans text-ivory">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0"
        style={{
          background:
            "radial-gradient(55% 40% at 85% -5%, rgba(244,63,94,0.08), transparent 65%), radial-gradient(60% 45% at -10% 35%, rgba(190,18,60,0.15), transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-5xl px-5 py-8 sm:px-8">
        {/* Header */}
        <header className="flex flex-wrap items-center justify-between gap-5 border-b border-rose-500/20 pb-6">
          <div className="flex items-center gap-4">
            <div className="flex size-12 items-center justify-center rounded-full border border-rose-400/50 bg-rose-500/10 sm:size-14">
              <span className="font-display text-xl italic text-rose-300 sm:text-2xl">SA</span>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.38em] text-rose-400">
                Super Admin
              </p>
              <h1 className="mt-1 font-display text-2xl font-light italic text-ivory sm:text-3xl">
                Kelola Admin
              </h1>
              {userName && (
                <p className="mt-1 text-xs text-sage-300/70">
                  Halo, <span className="font-semibold text-rose-300">{userName}</span>
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="#/admin"
              className="inline-flex items-center gap-2 border border-rose-400/40 px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.18em] text-rose-300 transition-all hover:bg-rose-400 hover:text-white"
            >
              <IconArrowLeft className="size-4" />
              Panel Admin
            </a>
            <a
              href="#/"
              className="inline-flex items-center gap-2 border border-rose-400/40 px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.18em] text-rose-300 transition-all hover:bg-rose-400 hover:text-white"
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

        {/* Ganti Password Saya - Tombol */}
        <section className="mt-8">
          <h2 className="font-display text-2xl font-light italic text-ivory">
            Keamanan Akun
          </h2>
          <div className="mt-5 border border-rose-500/20 bg-pine-800/40 p-6">
            <p className="text-sm text-sage-300/80">
              Ubah password akun Anda secara berkala untuk menjaga keamanan.
            </p>
            <button
              onClick={() => setChangePwdModal(true)}
              className="mt-4 inline-flex items-center gap-2.5 bg-rose-500 px-6 py-3 text-[11px] font-extrabold uppercase tracking-[0.22em] text-white shadow-[0_8px_24px_rgba(244,63,94,0.25)] transition-all hover:-translate-y-0.5 hover:bg-rose-400"
            >
              <IconPencil className="size-4" />
              Ubah Password
            </button>
          </div>
        </section>

        {/* Setting WhatsApp Admin */}
        <section className="mt-12">
          <h2 className="font-display text-2xl font-light italic text-ivory">
            Nomor WhatsApp Admin
          </h2>
          <p className="mt-2 text-sm text-sage-300/70">
            Nomor ini akan ditampilkan di halaman login untuk tamu yang ingin minta dibuatkan akun.
          </p>
          <div className="mt-5 border border-rose-500/20 bg-pine-800/40 p-6">
            {editingWA ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-[0.28em] text-gold-400">
                    Nomor WhatsApp (dengan kode negara)
                  </label>
                  <input
                    type="text"
                    value={tempWA}
                    onChange={(e) => setTempWA(e.target.value)}
                    className="mt-2.5 w-full rounded-[3px] border border-gold-500/25 bg-pine-900/80 px-4 py-3 text-sm text-ivory placeholder:text-sage-300/40 transition-colors focus:border-gold-400 focus:outline-none"
                    placeholder="6281234567890"
                  />
                  <p className="mt-2 text-xs text-sage-300/60">
                    Contoh: 6281234567890 (Indonesia), tanpa tanda + atau spasi
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleSaveWA}
                    className="inline-flex items-center gap-2 bg-rose-500 px-5 py-2.5 text-[10px] font-extrabold uppercase tracking-[0.18em] text-white transition-all hover:bg-rose-400"
                  >
                    <IconCheck className="size-4" />
                    Simpan
                  </button>
                  <button
                    onClick={() => {
                      setEditingWA(false);
                      setTempWA("");
                    }}
                    className="border border-rose-500/30 px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.18em] text-sage-300 transition-colors hover:text-ivory"
                  >
                    Batal
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-sage-300/60">
                    Nomor Saat Ini
                  </p>
                  <p className="mt-1 font-mono text-lg text-gold-200">+{adminWA}</p>
                </div>
                <button
                  onClick={() => {
                    setEditingWA(true);
                    setTempWA(adminWA);
                  }}
                  className="inline-flex items-center gap-2 border border-rose-400/30 px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.18em] text-rose-300 transition-colors hover:bg-rose-400 hover:text-white"
                >
                  <IconPencil className="size-4" />
                  Ubah
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Tambah Admin */}
        <section className="mt-12">
          <h2 className="font-display text-2xl font-light italic text-ivory">
            Tambah Admin Baru
          </h2>
          <form onSubmit={handleCreate} className="mt-5 space-y-5 border border-rose-500/20 bg-pine-800/40 p-6">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-[0.28em] text-gold-400">
                Nama Lengkap (opsional)
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
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                required
                className="mt-2.5 w-full rounded-[3px] border border-gold-500/25 bg-pine-900/80 px-4 py-3 text-sm text-ivory placeholder:text-sage-300/40 transition-colors focus:border-gold-400 focus:outline-none"
                placeholder="email@domain.com"
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
              className="inline-flex items-center gap-2.5 bg-rose-500 px-6 py-3 text-[11px] font-extrabold uppercase tracking-[0.22em] text-white shadow-[0_8px_24px_rgba(244,63,94,0.25)] transition-all hover:-translate-y-0.5 hover:bg-rose-400 disabled:opacity-50"
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
                  className="border border-rose-500/20 bg-pine-800/40 p-4"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-ivory">
                        {a.name || "Tanpa nama"}
                      </p>
                      <p className="mt-0.5 truncate font-mono text-xs text-sage-300/70">
                        ID: {a.user_id}
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
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => handleTogglePassword(a.user_id)}
                        className="inline-flex items-center gap-2 border border-rose-400/30 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-rose-300 transition-colors hover:bg-rose-400 hover:text-white"
                        title="Lihat password"
                      >
                        {showPwd[a.user_id] ? (
                          <>
                            <IconEyeOff className="size-4" />
                            Sembunyikan
                          </>
                        ) : (
                          <>
                            <IconEye className="size-4" />
                            Lihat Password
                          </>
                        )}
                      </button>
                      {showPwd[a.user_id] && (
                        <div className="flex items-center gap-2 rounded-[3px] border border-rose-400/30 bg-pine-900/80 px-3 py-2">
                          <span className="font-mono text-xs text-rose-200">
                            {showPwd[a.user_id]}
                          </span>
                        </div>
                      )}
                      <button
                        onClick={() => setResetModal({ userId: a.user_id, name: a.name || "Tanpa nama" })}
                        className="inline-flex items-center gap-2 border border-amber-400/30 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-amber-300 transition-colors hover:bg-amber-400 hover:text-pine-950"
                        title="Reset password"
                      >
                        <IconPencil className="size-4" />
                        Reset
                      </button>
                      {a.user_id !== profile.user_id && (
                        <button
                          onClick={() => handleDelete(a.user_id, a.name || "Tanpa nama")}
                          className="inline-flex items-center gap-2 border border-rose-400/30 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-rose-300 transition-colors hover:bg-rose-400 hover:text-pine-950"
                        >
                          <IconTrash className="size-4" />
                          Hapus
                        </button>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      {/* Modal Ubah Password */}
      {changePwdModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-pine-950/90 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md border border-rose-500/30 bg-pine-900 p-6">
            <h3 className="font-display text-xl font-light italic text-ivory">
              Ubah Password
            </h3>
            <p className="mt-2 text-sm text-sage-300/80">
              Ubah password untuk akun <span className="font-semibold text-rose-300">{userName}</span>
            </p>
            <div className="mt-5 space-y-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-[0.28em] text-rose-400">
                  Password Baru
                </label>
                <input
                  type="password"
                  value={newPwd}
                  onChange={(e) => setNewPwd(e.target.value)}
                  required
                  minLength={6}
                  className="mt-2.5 w-full rounded-[3px] border border-rose-500/25 bg-pine-800/80 px-4 py-3 text-sm text-ivory placeholder:text-sage-300/40 transition-colors focus:border-rose-400 focus:outline-none"
                  placeholder="Minimal 6 karakter"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-[0.28em] text-rose-400">
                  Konfirmasi Password Baru
                </label>
                <input
                  type="password"
                  value={confirmPwd}
                  onChange={(e) => setConfirmPwd(e.target.value)}
                  required
                  className="mt-2.5 w-full rounded-[3px] border border-rose-500/25 bg-pine-800/80 px-4 py-3 text-sm text-ivory placeholder:text-sage-300/40 transition-colors focus:border-rose-400 focus:outline-none"
                  placeholder="Ulangi password baru"
                />
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  onClick={handleChangePassword}
                  className="inline-flex items-center gap-2 bg-rose-500 px-5 py-2.5 text-[10px] font-extrabold uppercase tracking-[0.18em] text-white transition-all hover:bg-rose-400"
                >
                  <IconCheck className="size-4" />
                  Simpan Password
                </button>
                <button
                  onClick={() => {
                    setChangePwdModal(false);
                    setNewPwd("");
                    setConfirmPwd("");
                  }}
                  className="border border-rose-500/30 px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.18em] text-sage-300 transition-colors hover:text-ivory"
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Reset Password */}
      {resetModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-pine-950/90 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md border border-rose-500/30 bg-pine-900 p-6">
            <h3 className="font-display text-xl font-light italic text-ivory">
              Reset Password Admin
            </h3>
            <p className="mt-2 text-sm text-sage-300/80">
              Reset password untuk: <span className="font-semibold text-rose-300">{resetModal.name}</span>
            </p>
            <div className="mt-5 space-y-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-[0.28em] text-rose-400">
                  Password Baru
                </label>
                <input
                  type="password"
                  value={resetPwd}
                  onChange={(e) => setResetPwd(e.target.value)}
                  required
                  minLength={6}
                  className="mt-2.5 w-full rounded-[3px] border border-rose-500/25 bg-pine-800/80 px-4 py-3 text-sm text-ivory placeholder:text-sage-300/40 transition-colors focus:border-rose-400 focus:outline-none"
                  placeholder="Minimal 6 karakter"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-[0.28em] text-rose-400">
                  Konfirmasi Password Baru
                </label>
                <input
                  type="password"
                  value={resetConfirmPwd}
                  onChange={(e) => setResetConfirmPwd(e.target.value)}
                  required
                  className="mt-2.5 w-full rounded-[3px] border border-rose-500/25 bg-pine-800/80 px-4 py-3 text-sm text-ivory placeholder:text-sage-300/40 transition-colors focus:border-rose-400 focus:outline-none"
                  placeholder="Ulangi password baru"
                />
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  onClick={handleResetPassword}
                  className="inline-flex items-center gap-2 bg-rose-500 px-5 py-2.5 text-[10px] font-extrabold uppercase tracking-[0.18em] text-white transition-all hover:bg-rose-400"
                >
                  <IconCheck className="size-4" />
                  Reset Password
                </button>
                <button
                  onClick={() => {
                    setResetModal(null);
                    setResetPwd("");
                    setResetConfirmPwd("");
                  }}
                  className="border border-rose-500/30 px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.18em] text-sage-300 transition-colors hover:text-ivory"
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
