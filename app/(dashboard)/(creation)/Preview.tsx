"use client";

import { FC } from "react";
import Image from "next/image";
import { ArrowRightLongIcon } from "@/assets/ArrowRightLongIcon";
import { socials } from "@/data/socials";
import { useProfile } from "@/hooks/useProfile";
import { Typography } from "@/ui";

export const Preview: FC = () => {
  const { userSocials, swap, firstName, lastName, email, image } = useProfile();

  const socialsWithIcons = userSocials
    .map((social) => ({
      ...social,
      ...socials.find((s) => s.providerId === social.providerId)!,
    }))
    .filter((social) => !!social.providerId);

  const skeletons = Array.from(
    { length: 5 - socialsWithIcons.length },
    (_, i) => i,
  );

  return (
    <div className="sticky top-2 hidden w-[32rem] justify-center rounded-md bg-secondary-50 py-6 lg:flex xl:w-[56rem]">
      <div className="relative h-[63rem] w-[30rem] px-6 py-[1.8rem]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 308 632"
          stroke="#737373"
          className="pointer-events-none absolute left-0 top-0 h-full w-full"
          strokeLinejoin="bevel"
          fill="white"
        >
          <path d="M 12 55.5 C 12 30.9233 31.9233 11 56.5 11 H 80.5 C 86.8513 11 92 16.1487 92 22.5 C 92 30.5081 98.4919 37 106.5 37 H 201.5 C 209.508 37 216 30.5081 216 22.5 C 216 16.1487 221.149 11 227.5 11 H 251.5 C 276.077 11 296 30.9233 296 55.5 V 576.5 C 296 601.077 276.077 621 251.5 621 H 56.5 C 31.9233 621 12 601.077 12 576.5 V 55 H 1 V 577 C 1 607 25 631 56 631 H 253 C 283 631 307 607 307 576 V 57 C 305 26 283 1 251 1 H 57 C 25 1 1 25 1 55" />
          <rect x="1.5" y="54" width="10" height="2" strokeWidth={0} />
        </svg>
        <div className="flex h-full w-full flex-col gap-5 overflow-auto">
          <div className="mt-13 flex w-full flex-col items-center gap-6">
            {image ? (
              <img
                src={image}
                className="rounded-full border-4 h-24 w-24 border-primary-300 object-cover"
              />
            ) : (
              <div className="rounded-full h-24 w-24 bg-secondary-100" />
            )}
            <div className="flex w-full flex-col items-center gap-2">
              {firstName || lastName ? (
                <Typography variant="heading-s" className="text-secondary-500">
                  {firstName} {lastName}
                </Typography>
              ) : (
                <div className="h-4 w-40 rounded-md bg-secondary-100" />
              )}
              {email ? (
                <Typography variant="body-s" className="text-secondary-400">
                  {email}
                </Typography>
              ) : (
                <div className="h-2 w-18 rounded-md bg-secondary-100" />
              )}
            </div>
          </div>
          <div className="mb-6 flex w-full flex-1 flex-col gap-5 px-2">
            {socialsWithIcons
              .filter((social) => !!social.providerId)
              .map((social) => (
                <div
                  className="flex cursor-pointer items-center gap-2 rounded-sm p-4"
                  key={social.providerId}
                  style={{
                    backgroundColor: social.bgColor,
                    color: social.textColor,
                    border:
                      social.borderColor && "1px solid " + social.borderColor,
                  }}
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.setData("socialId", social.providerId);
                  }}
                  onDragOver={(e) => {
                    e.preventDefault();
                  }}
                  onDragLeave={(e) => {
                    e.preventDefault();
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    const socialId = e.dataTransfer.getData("socialId");
                    swap(socialId, social.providerId);
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
            {skeletons.map((_, i) => (
              <div
                className="h-12 w-full shrink-0 rounded-sm bg-secondary-100"
                key={i}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
