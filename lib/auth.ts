import { signIn, signOut } from "next-auth/react";
import { apiFetch } from "./http";
import type { LoginCredentials, LoginResponse, AuthUser } from "@/types/auth";
export async function login(
  credentials: LoginCredentials,
): Promise<LoginResponse> {
  const result = await signIn("credentials", {
    ...credentials,
    redirect: false,
  });
  if (result?.error) throw new Error("Credenciales incorrectas.");
  return { user: await apiFetch<AuthUser>("/api/auth/me") };
}
export async function logout() {
  await signOut({ redirect: false });
}
export async function getCurrentUser(): Promise<AuthUser | null> {
  try {
    return await apiFetch<AuthUser>("/api/auth/me");
  } catch {
    return null;
  }
}
