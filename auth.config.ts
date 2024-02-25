import type { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
const base_url =
  process.env.NODE_ENV !== "production"
    ? `http://localhost:${process.env.PORT}`
    : process.env.VERCEL_URL;

export default {
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (credentials.email && credentials.password) {
          const response = await fetch(`${base_url}/api/auth/login`, {
            method: "POST",
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });
          if (response.ok) {
            const { user } = await response.json();
            return user;
          }
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
