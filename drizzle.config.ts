import type { Config } from "drizzle-kit";
import "dotenv/config";

if (!process.env.DATABASE_URI) throw new Error("DB_URL not set");

const config = {
  schema: "./server/db/schema.ts",
  out: "./drizzle",
  driver: "mysql2",
  dbCredentials: {
    uri: process.env.DATABASE_URI,
  },
} satisfies Config;

export default config;
