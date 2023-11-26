import NextAuth, { AuthOptions } from "next-auth";

import GitHubProvider from "next-auth/providers/github";

export const authOptions: AuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.NEXTAUTH_GITHUB_CLIENT_ID!,
      clientSecret: process.env.NEXTAUTH_GITHUB_CLIENT_SECRET!,
    }),
  ],
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
