import { int, text, mysqlTable } from "drizzle-orm/mysql-core";

export const profile = mysqlTable("profile", {
  id: int("id").primaryKey().autoincrement(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  email: text("email"),
  user: text("user"),
});
