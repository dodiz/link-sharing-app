"use client";

import { useSocials } from "@/hooks/useSocials";
import { Button } from "@/ui/Button";
import { SocialForm } from "./SocialForm";

export const Customize = () => {
  const { userSocials, addSocial, updateSocial, removeSocial } = useSocials();

  return (
    <div className="flex flex-col gap-6 mt-10">
      <Button variant="secondary" label="Add new link" onClick={addSocial} />
      {userSocials.map((social, i) => (
        <SocialForm
          key={i + social.id}
          initialUrl={social.url}
          initialPlatformId={social.id}
          onUpdate={(data) => updateSocial(i, data)}
          onRemove={() => removeSocial(i)}
        />
      ))}
    </div>
  );
};
