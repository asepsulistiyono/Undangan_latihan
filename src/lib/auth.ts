import { supabase, SUPABASE_ENABLED } from "./supabase";

export type AdminRole = "admin" | "super_admin";

export interface AdminProfile {
  user_id: string;
  role: AdminRole;
  name: string | null;
}

/**
 * Login admin dengan email + password.
 */
export async function signIn(email: string, password: string) {
  if (!SUPABASE_ENABLED) {
    throw new Error("Supabase belum dikonfigurasi");
  }
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

/**
 * Logout admin.
 */
export async function signOut() {
  if (!SUPABASE_ENABLED) return;
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

/**
 * Ganti password admin yang sedang login.
 */
export async function changePassword(newPassword: string) {
  if (!SUPABASE_ENABLED) throw new Error("Supabase belum dikonfigurasi");
  const { error } = await supabase.auth.updateUser({ password: newPassword });
  if (error) throw error;
}

/**
 * Ambil profil admin dari tabel admin_profiles.
 */
export async function getAdminProfile(userId: string): Promise<AdminProfile | null> {
  if (!SUPABASE_ENABLED) return null;
  const { data, error } = await supabase
    .from("admin_profiles")
    .select("*")
    .eq("user_id", userId)
    .single();
  if (error || !data) return null;
  return data as AdminProfile;
}

/**
 * Daftar semua admin (hanya super_admin yang boleh).
 */
export async function listAdmins(): Promise<AdminProfile[]> {
  if (!SUPABASE_ENABLED) return [];
  const { data, error } = await supabase
    .from("admin_profiles")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data as AdminProfile[]) || [];
}

/**
 * Tambah admin baru (hanya super_admin yang boleh).
 */
export async function createAdmin(
  email: string,
  password: string,
  role: AdminRole,
  name: string | null
) {
  if (!SUPABASE_ENABLED) throw new Error("Supabase belum dikonfigurasi");

  // 1. Buat user auth
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });
  if (authError) throw authError;
  if (!authData.user) throw new Error("Gagal membuat user");

  // 2. Buat profil admin
  const { error: profileError } = await supabase.from("admin_profiles").insert({
    user_id: authData.user.id,
    role,
    name,
  });
  if (profileError) throw profileError;

  return authData.user;
}

/**
 * Hapus admin (hanya super_admin yang boleh).
 */
export async function deleteAdmin(userId: string) {
  if (!SUPABASE_ENABLED) throw new Error("Supabase belum dikonfigurasi");

  // 1. Hapus profil
  const { error: profileError } = await supabase
    .from("admin_profiles")
    .delete()
    .eq("user_id", userId);
  if (profileError) throw profileError;

  // 2. Hapus user auth (butuh service role key — biasanya dilakukan via Edge Function)
  // Untuk sekarang, kita hanya hapus profil. User auth tetap ada tapi tidak bisa login sebagai admin.
}

/**
 * Subscribe ke perubahan auth state.
 */
export function onAuthStateChange(callback: (user: any) => void): () => void {
  if (!SUPABASE_ENABLED) return () => {};
  const { data } = supabase.auth.onAuthStateChange((event, session) => {
    callback(session?.user || null);
  });
  return () => {
    data.subscription.unsubscribe();
  };
}
