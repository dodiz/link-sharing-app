import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/server/db";
import { profile } from "@/server/db/schema";
import { createTRPCRouter, publicProcedure } from "../init";

export const profileRouter = createTRPCRouter({
  getInfo: publicProcedure.query(async () => {
    const profile = await db.query.profile.findFirst();
    return {
      ...profile,
      socials: [] as {
        url: string;
        providerId: string;
      }[],
    };
  }),
  update: publicProcedure
    .input(
      z.object({
        firstName: z.string(),
        lastName: z.string(),
        email: z.string().email(),
        socials: z.array(
          z.object({
            url: z.string().url(),
            providerId: z.string(),
          })
        ),
      })
    )
    .mutation(
      async ({
        input: { firstName, lastName, email, socials: inputSocials },
      }) => {
        const updatedProfile = await db
          .update(profile)
          .set({
            email,
            firstName,
            lastName,
          })
          .where(eq(profile.id, 1));
        return updatedProfile;
      }
    ),
});
