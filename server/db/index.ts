import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { env } from "@/env";
import * as schema from "./schema";

const client = neon(env.DATABASE_URI);
/**
 * @todo remove ts-ignore once drizzle fixes this
 */
//@ts-ignore
export const db = drizzle(client, {
  schema,
});
