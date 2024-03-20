"use client";

import { GetStartedImage } from "@/assets/GetStartedImage";
import { useProfile } from "@/hooks/useProfile";
import { Button, Typography } from "@/ui";
import { SocialForm } from "./SocialForm";

export default function Page() {
  const { userSocials, add, save, isSaving } = useProfile();

  const isValid = userSocials.every(
    (social) => social.url !== "" && social.providerId !== "",
  );
  return (
    <>
      <div className="p-10">
        <Typography variant="heading-m">Customize your links</Typography>
        <Typography variant="body-m" className="text-secondary-400">
          Add/edit/remove links below and then share all your profiles with the
          world!
        </Typography>
        <div className="mt-10 flex flex-col gap-6">
          <Button variant="secondary" onClick={add}>
            Add new link
          </Button>
          {userSocials.length > 0 ? (
            userSocials.map((social, index) => (
              <SocialForm
                key={social.providerId}
                label={`Link #${index + 1}`}
                initialUrl={social.url}
                initialProviderId={social.providerId}
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center rounded-md bg-secondary-200 px-5 py-15">
              <GetStartedImage />
              <Typography className="mt-10" variant="heading-m">
                Let's get you started
              </Typography>
              <Typography
                className="mt-6 max-w-3xl text-center text-secondary-400"
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
      <div className="flex rounded-b-md border-t-1 border-secondary-300 p-4 md:justify-end md:px-10 md:py-6">
        <Button
          loading={isSaving}
          disabled={!isValid}
          onClick={() => save()}
          className="w-full md:w-max"
        >
          Save
        </Button>
      </div>
    </>
  );
}
