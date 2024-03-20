"use client";

import { useProfile } from "@/hooks/useProfile";
import { Button, Input, Typography } from "@/ui";
import { FileUpload } from "./FileUpload";

export default function Page() {
  const {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    setImage,
    image,
    save,
    isSaving,
  } = useProfile();
  return (
    <>
      <div className="p-10">
        <Typography variant="heading-m" className="text-secondary-500">
          Profile Details
        </Typography>
        <Typography variant="body-m" className="mt-2 text-secondary-400">
          Add your details to create a personal touch to your profile.
        </Typography>
        <div className="mt-10 flex flex-col justify-between gap-4 rounded-md bg-secondary-200 p-5 md:flex-row md:items-center">
          <Typography variant="body-m" className="w-[24rem] text-secondary-400">
            Profile Picture
          </Typography>
          <div className="flex flex-col gap-8 md:flex-row md:items-center">
            <FileUpload
              imageUrl={image}
              onDrop={(file) => {
                setImage(URL.createObjectURL(file));
              }}
              onRemoveImage={() => setImage("")}
            />
            <Typography variant="body-m" className="flex-1 text-secondary-400">
              Image must be below 1024x1024px. Use PNG or JPG format.
            </Typography>
          </div>
        </div>
        <div className="mt-6 flex flex-col gap-3 rounded-md bg-secondary-200 p-5">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <Typography variant="body-m" className="w-96 text-secondary-400">
              First name*
            </Typography>
            <Input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="flex-1"
            />
          </div>
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <Typography variant="body-m" className="w-96 text-secondary-400">
              Last name*
            </Typography>
            <Input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="flex-1"
            />
          </div>
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <Typography variant="body-m" className="w-96 text-secondary-400">
              Email
            </Typography>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1"
            />
          </div>
        </div>
      </div>
      <div className="flex rounded-b-md border-t-1 border-secondary-300 p-4 md:justify-end md:px-10 md:py-6">
        <Button
          loading={isSaving}
          onClick={() => save()}
          className="w-full md:w-max"
        >
          Save
        </Button>
      </div>
    </>
  );
}
