"use client";

import { GetStartedImage } from "@/assets/GetStartedImage";
import { SocialForm } from "@/components/SocialForm";
import { useProfile } from "@/hooks/useProfile";
import { Button } from "@/ui/Button";
import { Typography } from "@/ui/Typography";

export default function Page() {
  const { userSocials, add, save } = useProfile();
  return (
    <>
      <div className="p-10">
        <Typography variant="heading-m">Customize your links</Typography>
        <Typography variant="body-m" className="text-secondary-400">
          Add/edit/remove links below and then share all your profiles with the
          world!
        </Typography>
        <div className="flex flex-col gap-6 mt-10">
          <Button variant="secondary" onClick={add}>
            Add new link
          </Button>
          {userSocials.length > 0 ? (
            userSocials.map((social, index) => (
              <SocialForm
                key={social.id}
                label={`Link #${index + 1}`}
                id={social.id}
                initialUrl={social.url}
                initialProviderId={social.providerId}
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
                than one link, you can reorder and edit them. We're here to help
                you share your profiles with everyone!
              </Typography>
            </div>
          )}
        </div>
      </div>
      <div className="p-4 md:px-10 md:py-6 rounded-b-md flex md:justify-end border-t-1 border-secondary-300">
        <Button disabled onClick={() => save()} className="w-full md:w-max">
          Save
        </Button>
      </div>
    </>
  );
}
