import { createTRPCRouter } from "./init";
import { profileRouter } from "./routers/profileRouter";

export const appRouter = createTRPCRouter({
  profile: profileRouter,
});
