"use client";

import { GetStartedImage } from "@/assets/GetStartedImage";
import { useSocials } from "@/hooks/useSocials";
import { SocialForm } from "@/components/SocialForm";
import { Button } from "@/ui/Button";
import { Typography } from "@/ui/Typography";

export const Customize = () => {
  const { userSocials, add } = useSocials();

  return (
    <div className="flex flex-col gap-6 mt-10">
      <Button variant="secondary" label="Add new link" onClick={add} />
      {userSocials.length > 0 ? (
        userSocials.map((social, i) => (
          <SocialForm
            key={social.id}
            id={social.id}
            initialUrl={social.url}
            initialPlatformId={social.providerId}
          />
        ))
      ) : (
        <div className="flex flex-col justify-center items-center px-5 py-15 rounded-md bg-secondary-200">
          <GetStartedImage />
          <Typography className="mt-10" variant="heading-m">
            Let's get you started
          </Typography>
          <Typography
            className="mt-6 text-center max-w-3xl text-secondary-400"
            variant="body-m"
          >
            Use the “Add new link” button to get started. Once you have more
            than one link, you can reorder and edit them. We're here to help you
            share your profiles with everyone!
          </Typography>
        </div>
      )}
    </div>
  );
};
