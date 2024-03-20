import { createTRPCRouter } from "./core";
import { profileRouter } from "./routers/profileRouter";

export const appRouter = createTRPCRouter({
  profile: profileRouter,
});
