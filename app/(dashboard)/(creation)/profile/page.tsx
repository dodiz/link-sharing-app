"use client";

import { FileUpload } from "@/components/FileUpload";
import { useProfile } from "@/hooks/useProfile";
import { Button } from "@/ui/Button";
import { Input } from "@/ui/Input";
import { Typography } from "@/ui/Typography";

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
  } = useProfile();
  return (
    <>
      <div className="p-10">
        <Typography variant="heading-m" className="text-secondary-500">
          Profile Details
        </Typography>
        <Typography variant="body-m" className="text-secondary-400 mt-2">
          Add your details to create a personal touch to your profile.
        </Typography>
        <div className="flex items-center justify-between gap-4 mt-10 p-5 rounded-md bg-secondary-200">
          <Typography variant="body-m" className="text-secondary-400 w-[24rem]">
            Profile Picture
          </Typography>
          <div className="flex items-center gap-8">
            <FileUpload
              imageUrl={image}
              onDrop={(file) => {
                setImage(URL.createObjectURL(file));
              }}
              onRemoveImage={() => setImage("")}
            />
            <Typography variant="body-m" className="text-secondary-400 flex-1">
              Image must be below 1024x1024px. Use PNG or JPG format.
            </Typography>
          </div>
        </div>
        <div className="flex flex-col gap-3 mt-6 p-5 rounded-md bg-secondary-200">
          <div className="flex justify-between items-center gap-4">
            <Typography variant="body-m" className="w-96 text-secondary-400">
              First name*
            </Typography>
            <Input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="flex-1"
            />
          </div>
          <div className="flex justify-between items-center gap-4">
            <Typography variant="body-m" className="w-96 text-secondary-400">
              Last name*
            </Typography>
            <Input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="flex-1"
            />
          </div>
          <div className="flex justify-between items-center gap-4">
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
      <div className="px-10 py-6 rounded-b-md flex justify-end border-t-1 border-secondary-300">
        <Button label="Save" />
      </div>
    </>
  );
}
