import { z } from "zod";
import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { createTRPCRouter, publicProcedure } from "./init";

let socials: {
  id: string;
  url: string;
}[] = [
  {
    id: "twitter",
    url: "https://twitter.com/dodiz",
  },
];

export const appRouter = createTRPCRouter({
  socials: createTRPCRouter({
    getAll: publicProcedure.query(() => {
      return socials;
    }),
    update: publicProcedure
      .input(
        z.array(
          z.object({
            url: z.string().url(),
            id: z.string(),
            action: z.enum(["add", "remove"]),
          })
        )
      )
      .mutation(({ input }) => {
        const newSocials = input.filter((social) => social.action === "add");
        const removedSocials = input.filter(
          (social) => social.action === "remove"
        );
        socials.push(...newSocials);
        socials = socials.filter(
          (social) => !removedSocials.find((s) => s.id === social.id)
        );
      }),
  }),
});

export type AppRouter = typeof appRouter;
export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>;
