import { eq } from "drizzle-orm";
import { generate } from "randomstring";
import { z } from "zod";
import { db } from "@/server/db";
import { profile } from "@/server/db/schema";
import { socials } from "@/data/socials";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "./core";

export const appRouter = createTRPCRouter({
  profile: createTRPCRouter({
    get: protectedProcedure.query(
      async ({
        ctx: {
          session: { user },
        },
      }) => {
        const userProfile = await db.query.profile.findFirst({
          where: (profile, { eq }) => eq(profile.user, user.email),
        });
        if (userProfile) {
          return {
            slug: userProfile.slug!,
            firstName: userProfile.firstName!,
            lastName: userProfile.lastName!,
            email: userProfile.email!,
            image: userProfile.image!,
            socials: userProfile.socials as {
              url: string;
              providerId: string;
            }[],
          };
        }
        await db.insert(profile).values({
          user: user.email,
          email: user.email,
          firstName: user.name,
          lastName: "",
          socials: [],
          slug: generate({
            charset: "hex",
            length: 10,
          }),
          image: user.image,
        });
        return {
          slug: "",
          firstName: user.name,
          lastName: "",
          email: user.email,
          image: user.image,
          socials: [] as {
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
            .update(profile)
            .set({
              user: user.email,
              email,
              firstName,
              lastName,
              socials,
              image,
            })
            .where(eq(profile.user, user.email))
            .returning();
          return updatedProfile;
        },
      ),
  }),
  getDeveloperBySlug: publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
      const developer = await db.query.profile.findFirst({
        where: (profile, { eq }) => eq(profile.slug, input),
      });
      if (!developer) {
        return null;
      }
      return {
        firstName: developer.firstName || "",
        lastName: developer.lastName || "",
        email: developer.email || "",
        image: developer.image || "",
        socials: (developer.socials ?? []) as {
          url: string;
          providerId: string;
        }[],
      };
    }),
});
