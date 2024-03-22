"use client";

import type { FileRouter } from "@/server/api/upload";
import { generateReactHelpers } from "@uploadthing/react";

const helpers = generateReactHelpers<FileRouter>({
  url: "/api/upload",
});

export const useUpload = helpers.useUploadThing;
