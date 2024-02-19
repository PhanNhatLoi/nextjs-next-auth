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
    async session({ session, token }: { session: any; token: any }) {
      if (session.user) {
        session.user = { ...token };
      }
      return session;
    },
    async jwt({ token }) {
      if (token.sub) {
        const user = await Users.findById(token.sub);
        const { email, password, _id } = user;
        token.email = email;
        (token.password = password), (token._id = _id);
      }
      return token;
    },
  },

  session: { strategy: "jwt" },

  ...authConfig,
});
