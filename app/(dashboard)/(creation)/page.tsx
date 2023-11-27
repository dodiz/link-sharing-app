"use client";

import { ReactNode, useState } from "react";
import { LinkIcon } from "@/assets/LinkIcon";
import { socials } from "@/data/socials";
import { Button } from "@/ui/Button";
import { Input } from "@/ui/Input";
import { Select } from "@/ui/Select";
import { Typography } from "@/ui/Typography";

export default function Page() {
  const [link, setLink] = useState("");
  const [selected, setSelected] = useState<{
    Icon: ReactNode;
    label: string;
    value: string;
  } | null>(null);
  return (
    <>
      <Typography variant="heading-m">Customize your links</Typography>
      <Typography variant="body-m" className="text-secondary-400">
        Add/edit/remove links below and then share all your profiles with the
        world!
      </Typography>
      <div className="flex flex-col gap-6 mt-10">
        <Button variant="secondary" label="Add new link" />
        <div className="rounded-md p-5 bg-secondary-200 flex flex-col gap-3">
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <svg
                width="12"
                height="6"
                viewBox="0 0 12 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="12" height="1" fill="#737373" />
                <rect y="5" width="12" height="1" fill="#737373" />
              </svg>
              <p className="font-bold text-secondary-400">Link #1</p>
            </div>
            <p className="text-secondary-400 cursor-pointer hover:text-error">
              Remove
            </p>
          </div>
          <Select
            label="Platform"
            placeholder="Select a platform"
            onChange={setSelected}
            selected={selected}
            options={socials.map((s) => ({
              Icon: <s.Icon fill="#737373" />,
              label: s.label,
              value: s.id,
            }))}
          />
          <Input
            label="Link"
            onChange={({ target }) => setLink(target.value)}
            value={link}
            Icon={LinkIcon}
            placeholder="e.g. https://www.github.com/johnappleseed"
          />
        </div>
      </div>
    </>
  );
}
