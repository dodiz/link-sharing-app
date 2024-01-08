import { text, mysqlTable, int } from "drizzle-orm/mysql-core";

export const profile = mysqlTable("profile", {
  id: int("id").primaryKey().autoincrement(),
  user: text("user").unique(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  email: text("email"),
});
