// lib/admin-api.ts  (sirf browser me chalta hai)
// Admin login ke baad Laravel ek token deta hai, wo localStorage me rakhte hain.
import { ApiError, request } from "./api";

const KEY = "glancetechy_admin_token";

export const getToken = () => (typeof window === "undefined" ? null : window.localStorage.getItem(KEY));
export const setToken = (t: string) => window.localStorage.setItem(KEY, t);
export const clearToken = () => window.localStorage.removeItem(KEY);

export async function adminRequest<T>(path: string, init: RequestInit = {}): Promise<T> {
  const headers = new Headers(init.headers);
  const token = getToken();
  if (token) headers.set("Authorization", `Bearer ${token}`);
  try {
    return await request<T>(`/admin${path}`, { ...init, headers });
  } catch (e) {
    if (e instanceof ApiError && e.status === 401) {
      clearToken();
      if (!window.location.pathname.startsWith("/admin/login")) window.location.replace("/admin/login/");
    }
    throw e;
  }
}

export async function login(email: string, password: string) {
  const out = await request<{ token: string }>("/admin/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  setToken(out.token);
}

export async function logout() {
  try {
    await adminRequest("/logout", { method: "POST" });
  } finally {
    clearToken();
  }
}
