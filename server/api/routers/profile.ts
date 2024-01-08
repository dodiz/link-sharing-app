import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../init";

let socials: {
  providerId: string;
  url: string;
}[] = [
  {
    providerId: "twitter",
    url: "https://twitter.com/dodiz",
  },
];
export const profileRouter = createTRPCRouter({
  getInfo: publicProcedure.query(() => {
    return {
      firstName: "",
      lastName: "",
      email: "",
      socials,
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
            action: z.enum(["add", "remove"]),
          })
        ),
      })
    )
    .mutation(
      ({ input: { firstName, lastName, email, socials: inputSocials } }) => {
        const newSocials = inputSocials.filter(
          (social) => social.action === "add"
        );
        const removedSocials = inputSocials.filter(
          (social) => social.action === "remove"
        );
        socials.push(...newSocials);
        socials = socials.filter(
          (social) =>
            !removedSocials.find((s) => s.providerId === social.providerId)
        );
      }
    ),
});
