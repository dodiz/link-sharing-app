import { createTRPCRouter } from "./init";
import { profileRouter } from "./routers/profile";

export const appRouter = createTRPCRouter({
  profile: profileRouter,
});
