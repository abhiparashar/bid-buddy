import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth from "next-auth";
import { database } from "@/app/db/database";
import GitHubProvider from "next-auth/providers/github";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(database),
  providers: [
    GitHubProvider({
      clientId: "Ov23liyUpezlkmuiMAZf",
      clientSecret: "e90a9110deb760a5ea6c5326548eb9defcb7822d",
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token, user }) {
      return session;
    },
  },
});
