import {
  createUploadthing,
  type FileRouter as UploadThingFileRouter,
} from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { getServerAuthSession } from "@/server/auth";

const f = createUploadthing();

export const fileRouter = {
  imageUploader: f({ image: { maxFileSize: "64KB" } })
    .middleware(async ({ req }) => {
      const session = await getServerAuthSession();
      if (session === null) throw new UploadThingError("Unauthorized");
      return { user: session.user };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return { uploadedBy: metadata.user, image: file.url };
    }),
} satisfies UploadThingFileRouter;

export type FileRouter = typeof fileRouter;
