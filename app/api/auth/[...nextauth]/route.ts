import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import GitHubProvider from "next-auth/providers/github";
import { Adapter } from "next-auth/adapters";

const handler = NextAuth({
  providers: [
    GitHubProvider({
      clientId: "Ov23liyUpezlkmuiMAZf",
      clientSecret: "e90a9110deb760a5ea6c5326548eb9defcb7822d",
    }),
  ],
});

export { handler as GET, handler as POST };
