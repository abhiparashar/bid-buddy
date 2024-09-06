import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";
export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    NODE_ENV: z.string().min(1),
    GITHUB_ID: z.string().min(1),
    GITHUB_SECRET: z.string().min(1),
    AUTH_DRIZZLE_URL: z.string().min(1),
    AUTH_SECRET: z.string().min(1),
    CLOUDFLARE_ACCOUNT_ID: z.string().min(1),
    CLOUDFLARE_ACCESS_ID: z.string().min(1),
    CLOUDFLARE_SECRET_KEY_ID: z.string().min(1),
  },
  client: {},
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV || "development",
    DATABASE_URL:
      process.env.DATABASE_URL ||
      "postgres://postgres:password@localhost:5433/mydatabase",
    GITHUB_ID: "Ov23liyUpezlkmuiMAZf",
    GITHUB_SECRET: "e90a9110deb760a5ea6c5326548eb9defcb7822d",
    AUTH_DRIZZLE_URL: "postgres://postgres:password@localhost:5433/mydatabase",
    AUTH_SECRET: "LdyJhBTDMIudVu6ZzmBHJij8nsortrc0JZuS7BUtXfY=",
    CLOUDFLARE_ACCOUNT_ID: "a082bd0b370bc24b29e85834b159959e",
    CLOUDFLARE_ACCESS_ID: "4820d0754cf5a4ffac80fbc4a2704474",
    CLOUDFLARE_SECRET_KEY_ID:
      "db57ab0d6404a523ff1054c01baeebe3a3ac08a5e9a2743f120490e9aca69991",
  },
});
