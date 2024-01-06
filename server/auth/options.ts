import { AuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { env } from "@/env";

export const authOptions: AuthOptions = {
  providers: [
    GitHubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),
  ],
};
