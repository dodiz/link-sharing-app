"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightLongIcon } from "@/assets/ArrowRightLongIcon";
import { socials } from "@/data/socials";
import { useProfile } from "@/hooks/useProfile";
import { Button } from "@/ui/Button";
import { Typography } from "@/ui/Typography";

export default function Page() {
  const { userSocials, firstName, lastName, email, image } = useProfile();
  const socialsWithIcons = userSocials
    .map((social) => ({
      ...social,
      ...socials.find((s) => s.providerId === social.providerId)!,
    }))
    .filter((social) => !!social.providerId);
  return (
    <>
      <div className="rounded-b-3xl h-[35rem] bg-primary-300 p-6">
        <div className="flex justify-between items-center bg-secondary-100 py-4 px-6 rounded-md">
          <Button variant="secondary" as={Link} href="/">
            Back to Editor
          </Button>
          <Button>Share Link</Button>
        </div>
      </div>
      <div className="mx-auto px-14 py-12 w-[35rem] flex flex-col gap-5 rounded-md -translate-y-1/4 bg-secondary-100">
        <div className="flex flex-col w-full items-center gap-6 mt-13">
          {image ? (
            <img
              src={image}
              className="rounded-full w-26 h-26 object-cover border-4 border-primary-300"
            />
          ) : (
            <div className="bg-[#EEE] w-24 h-24 rounded-full" />
          )}
          <div className="flex flex-col gap-2 w-full items-center">
            {firstName || lastName ? (
              <Typography variant="heading-m" className="text-secondary-500">
                {firstName} {lastName}
              </Typography>
            ) : (
              <div className="bg-[#EEE] w-40 h-4 rounded-md" />
            )}
            <Typography variant="body-s" className="text-secondary-400">
              {email}
            </Typography>
          </div>
        </div>
        <div className="flex flex-col gap-5 w-full px-2 flex-1 mb-6">
          {socialsWithIcons.map((social) => (
            <div
              className="flex gap-2 items-center rounded-sm p-4 cursor-pointer"
              key={social.id}
              style={{
                backgroundColor: social.bgColor,
                color: social.textColor,
                border: social.borderColor && "1px solid " + social.borderColor,
              }}
            >
              <Image
                width={20}
                height={20}
                src={social.iconPath}
                alt={social.label}
              />
              <Typography variant="body-s">{social.label}</Typography>
              <ArrowRightLongIcon
                className="ml-auto"
                style={{
                  fill: social.arrowColor,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
