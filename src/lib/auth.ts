import { supabase, SUPABASE_ENABLED } from "./supabase";

export type AdminRole = "admin" | "super_admin";

export interface AdminProfile {
  user_id: string;
  role: AdminRole;
  name: string | null;
}

/* ============================================================
 * MODE DEMO (tanpa Supabase)
 * Data disimpan di localStorage. Berguna untuk uji coba
 * sebelum Supabase dikonfigurasi.
 * ============================================================ */

const LS_USERS = "demo-users-v1";
const LS_PROFILES = "demo-profiles-v1";
const LS_SESSION = "demo-session-v1";

/** Dispatch event untuk notify perubahan auth state di mode demo */
function dispatchAuthEvent() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("demo-auth-change"));
  }
}

interface DemoUser {
  id: string;
  email: string;
  password: string;
}

function loadDemoUsers(): DemoUser[] {
  try {
    const raw = localStorage.getItem(LS_USERS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveDemoUsers(users: DemoUser[]) {
  localStorage.setItem(LS_USERS, JSON.stringify(users));
}

function loadDemoProfiles(): AdminProfile[] {
  try {
    const raw = localStorage.getItem(LS_PROFILES);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveDemoProfiles(profiles: AdminProfile[]) {
  localStorage.setItem(LS_PROFILES, JSON.stringify(profiles));
}

/** Pastikan super admin demo selalu ada di mode demo. */
function ensureDemoSuperAdmin(): void {
  if (SUPABASE_ENABLED) return;
  const profiles = loadDemoProfiles();
  const hasSuper = profiles.some((p) => p.role === "super_admin");
  if (hasSuper) return;

  const users = loadDemoUsers();
  const demoEmail = "superadmin@demo.com";
  let demoUser = users.find((u) => u.email === demoEmail);
  if (!demoUser) {
    demoUser = {
      id: "demo-super-" + Date.now(),
      email: demoEmail,
      password: "demo123",
    };
    users.push(demoUser);
    saveDemoUsers(users);
  }
  if (!profiles.find((p) => p.user_id === demoUser.id)) {
    profiles.push({
      user_id: demoUser.id,
      role: "super_admin",
      name: "Super Admin (Demo)",
    });
    saveDemoProfiles(profiles);
  }
}

/* ============================================================
 * AUTH FUNCTIONS — bekerja baik dengan Supabase maupun mode demo
 * ============================================================ */

export async function signIn(email: string, password: string) {
  if (SUPABASE_ENABLED) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  }

  // Mode demo
  ensureDemoSuperAdmin();
  const users = loadDemoUsers();
  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) throw new Error("Email atau password salah");
  const session = { user_id: user.id, email: user.email };
  localStorage.setItem(LS_SESSION, JSON.stringify(session));
  dispatchAuthEvent(); // Notify App.tsx bahwa user sudah login
  return { user: { id: user.id, email: user.email }, session };
}

export async function signOut() {
  if (SUPABASE_ENABLED) {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return;
  }
  localStorage.removeItem(LS_SESSION);
  dispatchAuthEvent(); // Notify App.tsx bahwa user sudah logout
}

export async function getSession(): Promise<{ user_id: string; email: string } | null> {
  if (SUPABASE_ENABLED) {
    const { data } = await supabase.auth.getSession();
    return data.session?.user
      ? { user_id: data.session.user.id, email: data.session.user.email || "" }
      : null;
  }
  try {
    const raw = localStorage.getItem(LS_SESSION);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export async function changePassword(newPassword: string) {
  if (SUPABASE_ENABLED) {
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) throw error;
    return;
  }
  const session = await getSession();
  if (!session) throw new Error("Belum login");
  const users = loadDemoUsers();
  const idx = users.findIndex((u) => u.id === session.user_id);
  if (idx === -1) throw new Error("User tidak ditemukan");
  users[idx].password = newPassword;
  saveDemoUsers(users);
}

export async function getAdminProfile(userId: string): Promise<AdminProfile | null> {
  if (SUPABASE_ENABLED) {
    const { data, error } = await supabase
      .from("admin_profiles")
      .select("*")
      .eq("user_id", userId)
      .single();
    if (error || !data) return null;
    return data as AdminProfile;
  }
  ensureDemoSuperAdmin();
  const profiles = loadDemoProfiles();
  return profiles.find((p) => p.user_id === userId) || null;
}

export async function listAdmins(): Promise<AdminProfile[]> {
  if (SUPABASE_ENABLED) {
    const { data, error } = await supabase
      .from("admin_profiles")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return (data as AdminProfile[]) || [];
  }
  ensureDemoSuperAdmin();
  return loadDemoProfiles();
}

export async function createAdmin(
  email: string,
  password: string,
  role: AdminRole,
  name: string | null
) {
  if (SUPABASE_ENABLED) {
    const { data: authData, error: authError } = await supabase.auth.signUp({ email, password });
    if (authError) throw authError;
    if (!authData.user) throw new Error("Gagal membuat user");
    const { error: profileError } = await supabase.from("admin_profiles").insert({
      user_id: authData.user.id,
      role,
      name,
    });
    if (profileError) throw profileError;
    return authData.user;
  }

  // Mode demo
  const users = loadDemoUsers();
  if (users.find((u) => u.email === email)) {
    throw new Error("Email sudah terdaftar");
  }
  const newUser: DemoUser = {
    id: "demo-" + Date.now() + "-" + Math.random().toString(36).slice(2, 6),
    email,
    password,
  };
  users.push(newUser);
  saveDemoUsers(users);

  const profiles = loadDemoProfiles();
  profiles.push({ user_id: newUser.id, role, name });
  saveDemoProfiles(profiles);

  return { id: newUser.id, email: newUser.email };
}

export async function deleteAdmin(userId: string) {
  if (SUPABASE_ENABLED) {
    const { error } = await supabase.from("admin_profiles").delete().eq("user_id", userId);
    if (error) throw error;
    return;
  }
  const profiles = loadDemoProfiles();
  saveDemoProfiles(profiles.filter((p) => p.user_id !== userId));
  const users = loadDemoUsers();
  saveDemoUsers(users.filter((u) => u.id !== userId));
}

export function onAuthStateChange(callback: (user: any) => void): () => void {
  if (SUPABASE_ENABLED) {
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      callback(session?.user || null);
    });
    return () => data.subscription.unsubscribe();
  }

  // Mode demo — cek session saat ini dan subscribe ke event
  const checkSession = () => {
    try {
      const raw = localStorage.getItem(LS_SESSION);
      const session = raw ? JSON.parse(raw) : null;
      callback(session ? { id: session.user_id, email: session.email } : null);
    } catch {
      callback(null);
    }
  };

  // Panggil sekali untuk initial state
  checkSession();

  // Subscribe ke event demo-auth-change
  const handler = () => checkSession();
  window.addEventListener("demo-auth-change", handler);

  return () => {
    window.removeEventListener("demo-auth-change", handler);
  };
}
