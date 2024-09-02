import { defineConfig } from "drizzle-kit";
import { env } from "./app/env";

export default defineConfig({
  schema: "./app/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url:
      env.DATABASE_URL ||
      "postgres://postgres:password@localhost:5433/mydatabase",
  },
  verbose: true,
  strict: true,
});
