import type { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Users from "./src/models/userModel";
import { compareSync } from "bcrypt-ts";

export default {
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (credentials.email && credentials.password) {
          const user = await Users.findOne({ email: credentials?.email || "" });
          const password = credentials.password || "";
          const isMatch = await compareSync(password.toString(), user.password);
          if (isMatch) {
            return user;
          }
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
