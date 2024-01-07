import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "./init";

let socials: {
  providerId: string;
  url: string;
}[] = [
  {
    providerId: "twitter",
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
            providerId: z.string(),
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
          (social) =>
            !removedSocials.find((s) => s.providerId === social.providerId)
        );
      }),
  }),
});
