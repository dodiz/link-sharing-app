import { drizzle } from "drizzle-orm/planetscale-serverless";
import { connect } from "@planetscale/database";
import * as schema from "./schema";
import { env } from "@/env";

const connection = connect({
  url: env.DATABASE_URI,
});

export const db = drizzle(connection, {
  schema,
});
