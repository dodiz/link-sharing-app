"use client";

import { FC, useMemo, useState } from "react";
import Image from "next/image";
import { DragIcon } from "@/assets/DragIcon";
import { LinkIcon } from "@/assets/LinkIcon";
import { socials } from "@/data/socials";
import { Input } from "@/ui/Input";
import { Select } from "@/ui/Select";

type SocialFormProps = {
  initialUrl?: string;
  initialPlatformId?: string;
  onUpdate: (data: { id?: string; url?: string }) => void;
  onRemove: () => void;
};
export const SocialForm: FC<SocialFormProps> = ({
  initialUrl = "",
  initialPlatformId = "",
  onUpdate,
  onRemove,
}) => {
  const [url, setUrl] = useState(initialUrl);
  const [platformId, setPlatformId] = useState(initialPlatformId);

  const options = useMemo(
    () =>
      socials.map((s) => ({
        label: (
          <div className="flex gap-3 items-center">
            <Image alt={s.label} width={20} height={20} src={s.iconGrayPath} />{" "}
            {s.label}
          </div>
        ),
        value: s.id,
      })),
    []
  );

  return (
    <div className="rounded-md p-5 bg-secondary-200 flex flex-col gap-3">
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <DragIcon />
          <p className="font-bold text-secondary-400">Link #1</p>
        </div>
        <p
          className="text-secondary-400 cursor-pointer hover:text-error"
          onClick={onRemove}
        >
          Remove
        </p>
      </div>
      <Select
        label="Platform"
        onChange={(value) => {
          setPlatformId(value);
          onUpdate({ id: value });
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
        onBlur={() => onUpdate({ url })}
        value={url}
        Icon={LinkIcon}
        placeholder="e.g. https://www.github.com/johnappleseed"
      />
    </div>
  );
};