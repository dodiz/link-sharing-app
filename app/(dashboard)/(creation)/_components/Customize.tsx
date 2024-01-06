"use client";

import { Button } from "@/ui/Button";
import { SocialForm } from "./SocialForm";
import { useSocials } from "@/hooks/useSocials";

export const Customize = () => {
  const { socials } = useSocials();

  return (
    <div className="flex flex-col gap-6 mt-10">
      <Button variant="secondary" label="Add new link" />
      <SocialForm />
      {socials.map((link, i) => (
        <SocialForm key={i} initialUrl={link.url} initialPlatformId={link.id} />
      ))}
    </div>
  );
};
