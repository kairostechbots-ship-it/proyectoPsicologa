import type {
  LoginCredentials,
  LoginResponse,
} from '@/types/auth';

/**
 * Servicio de autenticación.
 *
 * Este archivo centraliza la comunicación con el backend
 * para evitar que los componentes dependan directamente
 * de la implementación de la API.
 */

export async function login(
  credentials: LoginCredentials,
): Promise<LoginResponse> {
  /*
   * TODO: conectar con el endpoint real del backend.
   *
   * Ejemplo futuro:
   *
   * const response = await fetch(
   *   `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
   *   {
   *     method: 'POST',
   *     headers: {
   *       'Content-Type': 'application/json',
   *     },
   *     credentials: 'include',
   *     body: JSON.stringify(credentials),
   *   },
   * );
   *
   * if (!response.ok) {
   *   throw new Error('Credenciales incorrectas');
   * }
   *
   * return response.json();
   */

  void credentials;

  throw new Error(
    'AUTH_SERVICE_NOT_CONNECTED',
  );
}

export async function logout(): Promise<void> {
  /*
   * TODO: conectar con el endpoint real.
   *
   * Ejemplo futuro:
   *
   * await fetch(
   *   `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
   *   {
   *     method: 'POST',
   *     credentials: 'include',
   *   },
   * );
   */
}

export async function getCurrentUser() {
  /*
   * TODO: consultar la sesión actual.
   *
   * Ejemplo futuro:
   *
   * const response = await fetch(
   *   `${process.env.NEXT_PUBLIC_API_URL}/auth/me`,
   *   {
   *     credentials: 'include',
   *   },
   * );
   *
   * if (!response.ok) {
   *   return null;
   * }
   *
   * return response.json();
   */

  return null;
}