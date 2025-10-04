import { defineConfig } from "drizzle-kit";

if (!process.env.SUPABASE_DB_URL) {
  throw new Error("SUPABASE_DB_URL must be set in Secrets");
}

export default defineConfig({
  out: "./migrations",
  schema: "./shared/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.SUPABASE_DB_URL,
  },
});
