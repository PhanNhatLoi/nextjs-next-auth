import type { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Users from "./src/models/userModel";
import { compareSync } from "bcrypt-ts";

export default {
  providers: [
    // login with username and password
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (credentials.email && credentials.password) {
          const user = await Users.findOne({ email: credentials.email });
          if (!user) {
            return null;
          }
          const isMatch = compareSync(
            credentials?.password.toString(),
            user.password
          );
          if (isMatch) return user;
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
