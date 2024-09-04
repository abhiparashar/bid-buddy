import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import GitHubProvider from "next-auth/providers/github";
import { database } from "@/app/db/database";

const handler = NextAuth({
  adapter: DrizzleAdapter(database),
  providers: [
    GitHubProvider({
      clientId: "Ov23liyUpezlkmuiMAZf",
      clientSecret: "e90a9110deb760a5ea6c5326548eb9defcb7822d",
    }),
  ],
});

export { handler as GET, handler as POST };
