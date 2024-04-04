import {
  createUploadthing,
  type FileRouter as UploadThingFileRouter,
} from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { getServerAuthSession } from "@/server/auth";
import { UTApi } from "uploadthing/server";
import { env } from "@/env";
import { db } from "@/server/db";

const utApi = new UTApi({ apiKey: env.UPLOADTHING_SECRET });

const f = createUploadthing();

export const fileRouter = {
  imageUploader: f({ image: { maxFileSize: "64KB", maxFileCount: 1 } })
    .middleware(async () => {
      const session = await getServerAuthSession();
      if (session === null) throw new UploadThingError("Unauthorized");
      const user = await db.query.profile.findFirst({
        where: (profile, { eq }) => eq(profile.user, session.user.email!),
      });
      if (!user) throw new UploadThingError("User not found");
      /**
       * Delete the old image if it exists
       */
      if (user.image) {
        const imageId = user.image.split("/").pop();
        if (imageId) {
          await utApi.deleteFiles(imageId);
        }
      }
      return { user: session.user };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return { uploadedBy: metadata.user, image: file.url };
    }),
} satisfies UploadThingFileRouter;

export type FileRouter = typeof fileRouter;
