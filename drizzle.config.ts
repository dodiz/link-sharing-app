import type { Config } from "drizzle-kit";
import "dotenv/config";

if (!process.env.DATABASE_HOST) throw new Error("DATABASE_HOST not set");
if (!process.env.DATABASE_USERNAME)
  throw new Error("DATABASE_USERNAME not set");
if (!process.env.DATABASE_PASSWORD)
  throw new Error("DATABASE_PASSWORD not set");

const config = {
  schema: "./server/db/schema.ts",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: "",
  },
} satisfies Config;

export default config;
