import { supabase, SUPABASE_ENABLED } from "./supabase";
import { removeSlugByUserId } from "./slug";

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
const LS_CONFIG = "demo-config-v1";

/** Dispatch event untuk notify perubahan auth state di mode demo */
function dispatchAuthEvent() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("demo-auth-change"));
  }
}

interface DemoUser {
  id: string;
  username: string;
  password: string;
  name: string | null;
}

interface DemoConfig {
  adminWA: string; // Nomor WhatsApp admin untuk minta akun
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

function loadDemoConfig(): DemoConfig {
  try {
    const raw = localStorage.getItem(LS_CONFIG);
    return raw ? JSON.parse(raw) : { adminWA: "6281234567890" };
  } catch {
    return { adminWA: "6281234567890" };
  }
}

function saveDemoConfig(config: DemoConfig) {
  localStorage.setItem(LS_CONFIG, JSON.stringify(config));
}

/** Pastikan super admin demo selalu ada di mode demo. */
function ensureDemoSuperAdmin(): void {
  if (SUPABASE_ENABLED) return;
  
  const users = loadDemoUsers();
  const profiles = loadDemoProfiles();
  const demoUsername = "superadmin";
  const demoPassword = "demo123";
  
  // Cari atau buat user superadmin
  let demoUser = users.find((u) => u.username === demoUsername);
  if (!demoUser) {
    demoUser = {
      id: "demo-super-" + Date.now(),
      username: demoUsername,
      password: demoPassword,
      name: "Super Admin (Demo)",
    };
    users.push(demoUser);
    saveDemoUsers(users);
  } else if (demoUser.password !== demoPassword) {
    // Update password jika berbeda (untuk reset ke default)
    demoUser.password = demoPassword;
    saveDemoUsers(users);
  }
  
  // Pastikan profile super_admin ada
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

export async function signIn(username: string, password: string) {
  if (SUPABASE_ENABLED) {
    // Coba login dengan format email yang diberikan, atau tambahkan @demo.local jika tidak ada domain
    const email = username.includes('@') ? username : username + "@demo.local";
    const { data, error } = await supabase.auth.signInWithPassword({ 
      email,
      password 
    });
    if (error) throw error;
    return data;
  }

  // Mode demo
  ensureDemoSuperAdmin();
  const users = loadDemoUsers();
  const user = users.find((u) => u.username === username && u.password === password);
  if (!user) throw new Error("Username atau password salah");
  const session = { user_id: user.id, username: user.username, name: user.name };
  sessionStorage.setItem(LS_SESSION, JSON.stringify(session));
  dispatchAuthEvent(); // Notify App.tsx bahwa user sudah login
  return { user: { id: user.id, username: user.username, name: user.name }, session };
}

export async function signOut() {
  if (SUPABASE_ENABLED) {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return;
  }
  sessionStorage.removeItem(LS_SESSION);
  dispatchAuthEvent(); // Notify App.tsx bahwa user sudah logout
}

export async function getSession(): Promise<{ user_id: string; username: string; name: string | null } | null> {
  if (SUPABASE_ENABLED) {
    const { data } = await supabase.auth.getSession();
    return data.session?.user
      ? { user_id: data.session.user.id, username: data.session.user.email?.split("@")[0] || "", name: null }
      : null;
  }
  try {
    const raw = sessionStorage.getItem(LS_SESSION);
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
    try {
      const { data, error } = await supabase
        .from("admin_profiles")
        .select("*")
        .eq("user_id", userId)
        .maybeSingle();
      
      if (error) {
        console.error("Error fetching admin profile:", error);
        return null;
      }
      
      if (!data) {
        console.log("No admin profile found for user:", userId);
        return null;
      }
      
      return data as AdminProfile;
    } catch (err) {
      console.error("Exception in getAdminProfile:", err);
      return null;
    }
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
  username: string,
  password: string,
  role: AdminRole,
  name: string | null
) {
  if (SUPABASE_ENABLED) {
    // Gunakan email yang diberikan, atau tambahkan @demo.local jika tidak ada domain
    const email = username.includes('@') ? username : username + "@demo.local";
    const { data: authData, error: authError } = await supabase.auth.signUp({ 
      email,
      password 
    });
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
  if (users.find((u) => u.username === username)) {
    throw new Error("Username sudah terdaftar");
  }
  const newUser: DemoUser = {
    id: "demo-" + Date.now() + "-" + Math.random().toString(36).slice(2, 6),
    username,
    password,
    name,
  };
  users.push(newUser);
  saveDemoUsers(users);

  const profiles = loadDemoProfiles();
  profiles.push({ user_id: newUser.id, role, name });
  saveDemoProfiles(profiles);

  return { id: newUser.id, username: newUser.username };
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
  
  // Hapus juga slug mapping
  removeSlugByUserId(userId);
}

export async function resetAdminPassword(userId: string, newPassword: string) {
  if (SUPABASE_ENABLED) {
    // Supabase tidak bisa reset password user lain tanpa service role key
    throw new Error("Reset password hanya tersedia di mode demo");
  }
  const users = loadDemoUsers();
  const idx = users.findIndex((u) => u.id === userId);
  if (idx === -1) throw new Error("User tidak ditemukan");
  users[idx].password = newPassword;
  saveDemoUsers(users);
}

export async function getAdminPassword(userId: string): Promise<string | null> {
  if (SUPABASE_ENABLED) {
    throw new Error("Lihat password hanya tersedia di mode demo");
  }
  const users = loadDemoUsers();
  const user = users.find((u) => u.id === userId);
  return user?.password || null;
}

export async function getAdminWA(): Promise<string> {
  if (SUPABASE_ENABLED) {
    return "6281234567890"; // Default
  }
  const config = loadDemoConfig();
  return config.adminWA;
}

export async function setAdminWA(wa: string) {
  if (SUPABASE_ENABLED) {
    throw new Error("Setting WA hanya tersedia di mode demo");
  }
  const config = loadDemoConfig();
  config.adminWA = wa;
  saveDemoConfig(config);
}

export function onAuthStateChange(callback: (user: any) => void): () => void {
  if (SUPABASE_ENABLED) {
    let callbackCalled = false;
    
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      callbackCalled = true;
      try {
        callback(session?.user || null);
      } catch (err) {
        console.error("Error in auth state callback:", err);
        callback(null);
      }
    });
    
    // Fallback: jika onAuthStateChange tidak memanggil callback dalam 3 detik,
    // cek session manual
    const fallbackTimer = setTimeout(async () => {
      if (!callbackCalled) {
        console.log("Auth state change not called, checking session manually...");
        try {
          const { data: sessionData } = await supabase.auth.getSession();
          callback(sessionData.session?.user || null);
        } catch (err) {
          console.error("Error checking session:", err);
          callback(null);
        }
      }
    }, 3000);
    
    return () => {
      clearTimeout(fallbackTimer);
      data.subscription.unsubscribe();
    };
  }

  // Mode demo — cek session saat ini dan subscribe ke event
  const checkSession = () => {
    try {
      const raw = sessionStorage.getItem(LS_SESSION);
      const session = raw ? JSON.parse(raw) : null;
      callback(session ? { id: session.user_id, username: session.username, name: session.name } : null);
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

/** Reset semua data demo (untuk debugging) */
export function resetDemoData() {
  if (SUPABASE_ENABLED) return;
  localStorage.removeItem(LS_USERS);
  localStorage.removeItem(LS_PROFILES);
  sessionStorage.removeItem(LS_SESSION);
  localStorage.removeItem(LS_CONFIG);
  // Reload halaman untuk apply perubahan
  window.location.reload();
}
