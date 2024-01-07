"use client";

import { useSocials } from "@/hooks/useSocials";
import { Button } from "@/ui/Button";
import { SocialForm } from "./SocialForm";

export const Customize = () => {
  const { userSocials, add } = useSocials();

  return (
    <div className="flex flex-col gap-6 mt-10">
      <Button variant="secondary" label="Add new link" onClick={add} />
      {userSocials.map((social, i) => (
        <SocialForm
          key={social.id}
          id={social.id}
          initialUrl={social.url}
          initialPlatformId={social.providerId}
        />
      ))}
    </div>
  );
};
