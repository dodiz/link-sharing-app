import type { Config } from "drizzle-kit";
import "dotenv/config";

if (!process.env.DATABASE_URI) throw new Error("DATABASE_URI not set");

const config = {
  schema: "./server/db/schema.ts",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URI,
  },
} satisfies Config;

export default config;
