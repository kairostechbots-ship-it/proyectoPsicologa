import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { eq } from "drizzle-orm";
import { getDb } from "../db";
import { users } from "../db/schema";
import { loginSchema } from "../validators";
import { consumeRateLimit } from "../rate-limit";

export const { auth, handlers } = NextAuth({
  session: { strategy: "jwt", maxAge: 8 * 60 * 60 },
  pages: { signIn: "/admin/login" },
  providers: [
    Credentials({
      credentials: { email: {}, password: {} },
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) return null;
        await consumeRateLimit("login:" + parsed.data.email, 10, 15 * 60);
        const [user] = await getDb()
          .select()
          .from(users)
          .where(eq(users.email, parsed.data.email))
          .limit(1);
        const valid = await compare(
          parsed.data.password,
          user?.passwordHash ??
            "$2b$12$R9h/cIPz0gi.URNNX3kh2OPST9/PgBkqquzi.Ss7KIUgO2t0jWMUW",
        );
        if (!user?.active || !valid) return null;
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
    jwt({ token, user }) {
      if (user)
        token.sessionVersion = (
          user as { sessionVersion?: number }
        ).sessionVersion;
      return token;
    },
    session({ session, token }) {
      if (session.user && token.sub) session.user.id = token.sub;
      (session as typeof session & { sessionVersion?: number }).sessionVersion =
        token.sessionVersion as number;
      return session;
    },
  },
});
