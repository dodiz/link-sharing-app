import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { createTRPCRouter, publicProcedure } from "./init";

export const appRouter = createTRPCRouter({
  greetings: createTRPCRouter({
    hello: publicProcedure.query(() => {
      return "Hello";
    }),
  }),
});

export type AppRouter = typeof appRouter;
export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>;
