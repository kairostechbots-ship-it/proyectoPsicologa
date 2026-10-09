import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { eq } from "drizzle-orm";

import { getDb } from "../db";
import { users } from "../db/schema";
import { loginSchema } from "../validators";
import { consumeRateLimit } from "../rate-limit";

export const { auth, handlers } = NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 8 * 60 * 60,
  },

  pages: {
    signIn: "/admin/login",
  },

  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
        /*
         * =====================================================
         * 1. VALIDAR DATOS RECIBIDOS
         * =====================================================
         */

        const parsed = loginSchema.safeParse(credentials);

        if (!parsed.success) {
          return null;
        }

        /*
         * =====================================================
         * 2. RATE LIMIT
         * =====================================================
         *
         * Máximo:
         * 10 intentos cada 15 minutos por correo.
         *
         * consumeRateLimit está preparado para que un fallo
         * temporal del almacenamiento del rate limit no deje
         * bloqueado todo el sistema de autenticación.
         */

        await consumeRateLimit(
          "login:" + parsed.data.email,
          10,
          15 * 60,
        );

        /*
         * =====================================================
         * 3. BUSCAR USUARIO
         * =====================================================
         */

        const [user] = await getDb()
          .select()
          .from(users)
          .where(eq(users.email, parsed.data.email))
          .limit(1);

        /*
         * =====================================================
         * 4. VALIDAR CONTRASEÑA
         * =====================================================
         *
         * Si el usuario no existe, utilizamos un hash falso
         * para seguir ejecutando bcrypt y evitar diferencias
         * demasiado evidentes entre usuario existente/no
         * existente.
         */

        const valid = await compare(
          parsed.data.password,
          user?.passwordHash ??
            "$2b$12$R9h/cIPz0gi.URNNX3kh2OPST9/PgBkqquzi.Ss7KIUgO2t0jWMUW",
        );

        /*
         * =====================================================
         * 5. VALIDAR USUARIO
         * =====================================================
         */

        if (!user?.active || !valid) {
          return null;
        }

        /*
         * =====================================================
         * 6. CREAR INFORMACIÓN DEL JWT
         * =====================================================
         */

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          sessionVersion: user.sessionVersion,
        };
      },
    }),
  ],

  callbacks: {
    /*
     * =========================================================
     * JWT
     * =========================================================
     *
     * sessionVersion permite invalidar sesiones existentes
     * cuando sea necesario.
     */

    jwt({ token, user }) {
      if (user) {
        token.sessionVersion = (
          user as {
            sessionVersion?: number;
          }
        ).sessionVersion;
      }

      return token;
    },

    /*
     * =========================================================
     * SESSION
     * =========================================================
     */

    session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }

      (
        session as typeof session & {
          sessionVersion?: number;
        }
      ).sessionVersion = token.sessionVersion as number;

      return session;
    },
  },
});