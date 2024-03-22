"use client";

import { FC, useState } from "react";
import { toast } from "react-toastify";
import { useDropzone } from "react-dropzone";
import { UploadImageIcon } from "@/assets/UploadImageIcon";
import { useUpload } from "@/hooks/useUpload";
import { useProfile } from "@/hooks/useProfile";
import { Typography } from "@/ui";
import { cn } from "@/utils/cn";
import { env } from "@/env.js";
import { api } from "@/utils/api";

const MAX_SIZE = 1024 * +env.NEXT_PUBLIC_AVATAR_SIZE_KB;

export const UploadZone: FC = () => {
  const { image, setImage } = useProfile();
  const [initialImage, setInitialImage] = useState(image);

  const { mutate } = api.profile.updateImage.useMutation({
    onSuccess: () => toast("Upload Completed"),
  });

  const { startUpload, isUploading } = useUpload("imageUploader", {
    onUploadError: (error: Error) => toast.error(`ERROR! ${error.message}`),
    onClientUploadComplete: (res) => {
      const uploadedImage = res![0]!.url;
      setImage(uploadedImage);
      setInitialImage(uploadedImage);
      mutate({ image: uploadedImage });
    },
  });

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: {
      "image/*": [".jpg", ".jpeg"],
    },
    maxFiles: 1,
    maxSize: MAX_SIZE,
    onDropAccepted: (acceptedFiles) => startUpload([acceptedFiles[0]!]),
    onDropRejected: (rejectedFiles) => {
      const rejectedFile = rejectedFiles[0]!;
      rejectedFile.errors.forEach((error) => {
        if (error.code === "file-too-large") {
          toast.error(
            `La dimensione massima consentita è di ${env.NEXT_PUBLIC_AVATAR_SIZE_KB} KB`,
          );
        } else if (error.code === "too-many-files") {
          toast.error("E' possibile caricare un solo file");
        } else if (error.code === "file-invalid-type") {
          toast.error("Formato file non valido");
        } else {
          toast.error("Errore durante il caricamento del file");
        }
      });
    },
  });
  return (
    <>
      {!!initialImage ? (
        <div
          className="relative h-72 w-72 cursor-pointer rounded-md bg-primary-100"
          onClick={() => setInitialImage("")}
        >
          <img
            src={initialImage}
            alt="preview"
            className="absolute left-0 top-0 h-full w-full rounded-md object-cover brightness-50"
          />
          <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center gap-2">
            <UploadImageIcon className="text-secondary-50" />
            <Typography variant="heading-s" className="text-secondary-50">
              Change Image
            </Typography>
          </div>
        </div>
      ) : isUploading ? (
        <>Loading ...</>
      ) : (
        <div
          {...getRootProps({
            className: cn(
              "cursor-pointer relative h-72 w-72 rounded-md bg-primary-100 flex items-center justify-center flex-col text-center gap-2",
            ),
          })}
        >
          <input {...getInputProps()} />
          <UploadImageIcon />
          <Typography variant="heading-s" className="text-primary-300">
            + Upload Image
          </Typography>
        </div>
      )}
    </>
  );
};