import { createRouteHandler } from "uploadthing/next";
import { fileRouter } from "@/server/api/upload";
import { env } from "@/env";

export const { GET, POST } = createRouteHandler({
  router: fileRouter,
  config: {
    uploadthingId: env.UPLOADTHING_APP_ID,
    uploadthingSecret: env.UPLOADTHING_SECRET,
  },
});
