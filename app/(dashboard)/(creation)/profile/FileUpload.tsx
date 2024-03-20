"use client";

import { FC } from "react";
import { toast } from "react-toastify";
import { useDropzone } from "react-dropzone";
import { UploadImageIcon } from "@/assets/UploadImageIcon";
import { Typography } from "@/ui";
import { cn } from "@/utils/cn";
import { env } from "@/env.js";

const MAX_SIZE = 1024 * 1024 * +env.NEXT_PUBLIC_AVATAR_SIZE_KB;

type FileUploadProps = {
  onDrop: (file: File) => void;
  onRemoveImage: () => void;
  error?: boolean;
  imageUrl?: string;
  isUploading?: boolean;
};

export const FileUpload: FC<FileUploadProps> = ({
  onDrop,
  error,
  imageUrl,
  onRemoveImage,
  isUploading = false,
}) => {
  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: {},
    maxFiles: 1,
    maxSize: MAX_SIZE,
    onDropAccepted: (acceptedFiles) => onDrop(acceptedFiles[0]!),
    onDropRejected: (rejectedFiles) => {
      const rejectedFile = rejectedFiles[0]!;
      rejectedFile.errors.forEach((error) => {
        if (error.code === "file-too-large") {
          toast.error(`La dimensione massima consentita è di ${MAX_SIZE} KB`);
        } else if (error.code === "too-many-files") {
          toast.error("E' possibile caricare un solo file");
        } else {
          toast.error("Errore durante il caricamento del file");
        }
      });
    },
  });

  return (
    <section className="flex h-72 w-72 items-center justify-center rounded-md bg-primary-100">
      {!!imageUrl ? (
        <div className="relative h-72 w-72" onClick={onRemoveImage}>
          <img
            src={imageUrl}
            alt="preview"
            className="absolute left-0 top-0 h-full w-full rounded-md object-cover"
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
              "flex items-center justify-center flex-col text-center gap-2",
              error && "styles.error",
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
    </section>
  );
};
