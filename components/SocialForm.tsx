"use client";

import { FC, useMemo, useState } from "react";
import Image from "next/image";
import { DragIcon } from "@/assets/DragIcon";
import { LinkIcon } from "@/assets/LinkIcon";
import { socials } from "@/data/socials";
import { useProfile } from "@/hooks/useProfile";
import { Input } from "@/ui/Input";
import { Select } from "@/ui/Select";
import { cn } from "@/utils/cn";

type SocialFormProps = {
  id: string;
  initialUrl?: string;
  initialProviderId?: string;
  label: string;
};
export const SocialForm: FC<SocialFormProps> = ({
  id,
  label,
  initialUrl = "",
  initialProviderId = "",
}) => {
  const { update, remove, swap } = useProfile();
  const [url, setUrl] = useState(initialUrl);
  const [platformId, setPlatformId] = useState(initialProviderId);
  const [isDragOver, setIsDragOver] = useState(false);

  const options = useMemo(
    () =>
      socials.map((s) => ({
        label: (
          <div className="flex gap-3 items-center">
            <Image alt={s.label} width={20} height={20} src={s.iconGrayPath} />{" "}
            {s.label}
          </div>
        ),
        value: s.providerId,
      })),
    []
  );

  return (
    <div
      className={cn(
        "rounded-md p-5 bg-secondary-200 flex flex-col gap-3",
        isDragOver &&
          "border-b-2 border-primary-300 shadow-accent transition-all"
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
          className="text-secondary-400 cursor-pointer hover:text-error"
          onClick={() => remove(id)}
        >
          Remove
        </p>
      </div>
      <Select
        label="Platform"
        onChange={(value) => {
          setPlatformId(value);
          update(id, { providerId: value });
        }}
        options={options}
        value={platformId}
        placeholder={
          <div className="flex items-center gap-3">
            <LinkIcon fill="currentColor" />
            Select a platform
          </div>
        }
      />
      <Input
        label="Link"
        onChange={({ target }) => setUrl(target.value)}
        onBlur={() => update(id, { url })}
        value={url}
        Icon={LinkIcon}
        placeholder="e.g. https://www.github.com/johnappleseed"
      />
    </div>
  );
};
