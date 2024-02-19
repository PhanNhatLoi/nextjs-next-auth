import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import Users from "./src/models/userModel";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  callbacks: {
    async jwt({ token }) {
      if (token.sub) {
        // to do query row and add custom params
      }
      return token;
    },
    async session({ session }) {
      // add params after use token.sub
      return session;
    },
  },

  session: { strategy: "jwt" },

  ...authConfig,
});
