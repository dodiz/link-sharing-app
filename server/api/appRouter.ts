import { z } from "zod";
import { db } from "@/server/db";
import { profile } from "@/server/db/schema";
import { createTRPCRouter, protectedProcedure } from "./core";
import { socials } from "@/data/socials";

export const appRouter = createTRPCRouter({
  profile: createTRPCRouter({
    get: protectedProcedure.query(
      async ({
        ctx: {
          session: { user },
        },
      }) => {
        const profile = await db.query.profile.findFirst({
          where: (profile, { eq }) => eq(profile.user, user.email),
        });
        return {
          firstName: profile?.firstName || user.name || "",
          lastName: profile?.lastName || "",
          email: profile?.email || user.email || "",
          image: profile?.image || user.image || "",
          socials: (profile?.socials ?? []) as {
            url: string;
            providerId: string;
          }[],
        };
      },
    ),
    update: protectedProcedure
      .input(
        z.object({
          firstName: z.string(),
          lastName: z.string(),
          email: z.string().email(),
          image: z.string().url().optional(),
          socials: z.array(
            z.object({
              url: z.string().url(),
              //@ts-ignore
              providerId: z.enum(socials.map((s) => s.providerId)),
            }),
          ),
        }),
      )
      .mutation(
        async ({
          ctx: {
            session: { user },
          },
          input: { firstName, lastName, email, socials, image },
        }) => {
          const updatedProfile = await db
            .insert(profile)
            .values({
              user: user.email,
              email,
              firstName,
              lastName,
              socials,
              image,
            })
            .onConflictDoUpdate({
              target: profile.user,
              set: {
                email,
                firstName,
                lastName,
                socials,
                image,
              },
            });
          return updatedProfile;
        },
      ),
  }),
});
