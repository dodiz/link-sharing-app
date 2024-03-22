import { z } from "zod";
import { db } from "@/server/db";
import { profile } from "@/server/db/schema";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "./core";
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
  getDeveloper: publicProcedure.input(z.string()).query(async ({ input }) => {
    const email = decodeURIComponent(input);
    const developer = await db.query.profile.findFirst({
      where: (profile, { eq }) => eq(profile.email, email),
    });
    if (!developer) {
      return null;
    }
    return {
      firstName: developer?.firstName || "",
      lastName: developer?.lastName || "",
      email: developer?.email || "",
      image: developer?.image || "",
      socials: (developer?.socials ?? []) as {
        url: string;
        providerId: string;
      }[],
    };
  }),
});
