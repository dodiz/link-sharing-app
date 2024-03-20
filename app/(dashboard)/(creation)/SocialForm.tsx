"use client";

import { FC, useMemo, useState } from "react";
import Image from "next/image";
import { useFormik } from "formik";
import { z } from "zod";
import { DragIcon } from "@/assets/DragIcon";
import { LinkIcon } from "@/assets/LinkIcon";
import { socials } from "@/data/socials";
import { useProfile } from "@/hooks/useProfile";
import { Select, Input } from "@/ui";
import { cn } from "@/utils/cn";

type SocialFormProps = {
  id: string;
  initialUrl?: string;
  initialProviderId?: string;
  label: string;
};

const validationSchema = z.object({
  url: z.string().url(),
});

export const SocialForm: FC<SocialFormProps> = ({
  id,
  label,
  initialUrl = "",
  initialProviderId = "",
}) => {
  const { update, remove, swap, userSocials } = useProfile();
  const [isDragOver, setIsDragOver] = useState(false);

  const formik = useFormik({
    initialValues: {
      url: initialUrl,
      providerId: initialProviderId,
    },
    validate: (values) => {
      const result = validationSchema.safeParse(values);
      if (result.success) return {};
      return {
        url: result.error.errors[0]?.message,
      };
    },
    onSubmit: () => {},
  });
  /**
   * Options filtered to prevent duplicate socials
   */
  const options = useMemo(
    () =>
      socials
        .filter(
          (social) =>
            social.providerId === formik.values.providerId ||
            !userSocials.find((s) => s.providerId === social.providerId),
        )
        .map((s) => ({
          label: (
            <div className="flex items-center gap-3">
              <Image
                alt={s.label}
                width={20}
                height={20}
                src={s.iconGrayPath}
              />
              {s.label}
            </div>
          ),
          value: s.providerId,
        })),
    [userSocials, formik.values.providerId],
  );

  return (
    <div
      className={cn(
        "flex flex-col gap-3 rounded-md bg-secondary-200 p-5",
        isDragOver &&
          "border-b-2 border-primary-300 shadow-accent transition-all",
      )}
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("socialId", id);
      }}
      onDragOver={(e) => {
        e.preventDefault();
        const socialId = e.dataTransfer.getData("socialId");
        if (socialId !== id) setIsDragOver(true);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        setIsDragOver(false);
      }}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragOver(false);
        const socialId = e.dataTransfer.getData("socialId");
        swap(socialId, id);
      }}
    >
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <DragIcon />
          <p className="font-bold text-secondary-400">{label}</p>
        </div>
        <p
          className="cursor-pointer text-secondary-400 hover:text-error"
          onClick={() => remove(id)}
        >
          Remove
        </p>
      </div>
      <Select
        label="Platform"
        onChange={(value) => {
          formik.setFieldValue("providerId", value);
          update(id, { providerId: value });
        }}
        options={options}
        value={formik.values.providerId}
        placeholder={
          <div className="flex items-center gap-3">
            <LinkIcon fill="currentColor" />
            Select a platform
          </div>
        }
      />
      <Input
        label="Link"
        name="url"
        value={formik.values.url}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        Icon={<LinkIcon />}
        placeholder="e.g. https://www.github.com/johnappleseed"
        error={formik.touched.url ? formik.errors.url : ""}
      />
    </div>
  );
};
