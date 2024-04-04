import { pgTable, serial, varchar, json } from "drizzle-orm/pg-core";

export const profile = pgTable("profile", {
  id: serial("id").primaryKey(),
  user: varchar("user").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  email: varchar("email"),
  socials: json("socials"),
  image: varchar("image"),
  slug: varchar("slug"),
});
