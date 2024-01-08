import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { appRouter } from "@/server/api";

export type AppRouter = typeof appRouter;
export type ApiInputs = inferRouterInputs<AppRouter>;
export type ApiOutputs = inferRouterOutputs<AppRouter>;
