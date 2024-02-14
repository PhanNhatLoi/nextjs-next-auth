import NextAuth from "next-auth";
import authConfig from "./auth.config";
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    //page
    signIn: "/auth/login",
    error: "/auth/error",
  },
  callbacks: {
    async session({ session, token }: { session: any; token: any }) {
      return session;
    },
    async jwt({ token }) {
      return token;
    },
    // async session({ session, token }: { session: any; token: any }) {
    //   if (session.user && token._user) {
    //     session.user.email = "test email";
    //   }
    //   return session;
    // },
    // async jwt({ token }) {
    //   //   if (token.sub) {
    //   //     const user = await Users.findById(token.sub);
    //   //     if (user) {
    //   //       token._user = user;
    //   //     }
    //   //   }
    //   return token;
    // },
  },
  session: {
    strategy: "jwt",
  },
  ...authConfig,
});
