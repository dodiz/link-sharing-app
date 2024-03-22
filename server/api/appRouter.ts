import { z } from "zod";
import { eq } from "drizzle-orm";
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
          input: { firstName, lastName, email, socials },
        }) => {
          const updatedProfile = await db
            .insert(profile)
            .values({
              user: user.email,
              email,
              firstName,
              lastName,
              socials,
            })
            .onConflictDoUpdate({
              target: profile.user,
              set: {
                email,
                firstName,
                lastName,
                socials,
              },
            });
          return updatedProfile;
        },
      ),
    updateImage: protectedProcedure
      .input(
        z.object({
          image: z.string().url(),
        }),
      )
      .mutation(
        async ({
          ctx: {
            session: { user },
          },
          input: { image },
        }) => {
          const updatedProfile = await db
            .update(profile)
            .set({
              image,
            })
            .where(eq(profile.user, user.email));
          return updatedProfile;
        },
      ),
  }),
});
