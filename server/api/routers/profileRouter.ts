import { z } from "zod";
import { db } from "@/server/db";
import { profile } from "@/server/db/schema";
import { createTRPCRouter, protectedProcedure } from "../init";

export const profileRouter = createTRPCRouter({
  getInfo: protectedProcedure.query(
    async ({
      ctx: {
        session: { user },
      },
    }) => {
      const profile = await db.query.profile.findFirst({
        where: (profile, { eq }) => eq(profile.user, user.email),
      });
      return {
        ...profile,
        socials: [] as {
          url: string;
          providerId: string;
        }[],
      };
    }
  ),
  update: protectedProcedure
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
        ctx: {
          session: { user },
        },
        input: { firstName, lastName, email },
      }) => {
        const updatedProfile = await db.insert(profile).values({
          email,
          firstName,
          lastName,
          user: user.email,
        });
        return updatedProfile;
      }
    ),
});
