"use client";

import { FC } from "react";
import Image from "next/image";
import { ArrowRightLongIcon } from "@/assets/ArrowRightLongIcon";
import { socials } from "@/data/socials";
import { useSocials } from "@/hooks/useSocials";
import { Typography } from "@/ui/Typography";

export const Preview: FC = () => {
  const { userSocials, swap, firstName, lastName, email } = useSocials();
  const socialsWithIcons = userSocials
    .map((social) => ({
      ...social,
      ...socials.find((s) => s.providerId === social.providerId)!,
    }))
    .filter((social) => !!social.providerId);
  const skeletons = Array.from(
    { length: 5 - socialsWithIcons.length },
    (_, i) => i
  );

  return (
    <div className="w-[56rem] bg-secondary-100 py-6 flex justify-center rounded-md sticky top-2">
      <div className="w-[30rem] h-[63rem] relative py-[1.8rem] px-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 308 632"
          stroke="#737373"
          className="absolute w-full h-full top-0 left-0 pointer-events-none"
          strokeLinejoin="bevel"
          fill="white"
        >
          <path d="M 12 55.5 C 12 30.9233 31.9233 11 56.5 11 H 80.5 C 86.8513 11 92 16.1487 92 22.5 C 92 30.5081 98.4919 37 106.5 37 H 201.5 C 209.508 37 216 30.5081 216 22.5 C 216 16.1487 221.149 11 227.5 11 H 251.5 C 276.077 11 296 30.9233 296 55.5 V 576.5 C 296 601.077 276.077 621 251.5 621 H 56.5 C 31.9233 621 12 601.077 12 576.5 V 55 H 1 V 577 C 1 607 25 631 56 631 H 253 C 283 631 307 607 307 576 V 57 C 305 26 283 1 251 1 H 57 C 25 1 1 25 1 55" />
          <rect x="1.5" y="54" width="10" height="2" strokeWidth={0} />
        </svg>
        <div className="flex flex-col gap-5 w-full h-full overflow-auto">
          <div className="flex flex-col w-full items-center gap-6 mt-13">
            <div className="bg-[#EEE] w-24 h-24 rounded-full" />
            <div className="flex flex-col gap-2 w-full items-center">
              {firstName || lastName ? (
                <Typography variant="heading-s" className="text-secondary-500">
                  {firstName} {lastName}
                </Typography>
              ) : (
                <div className="bg-[#EEE] w-40 h-4 rounded-md" />
              )}
              {email ? (
                <Typography variant="body-s" className="text-secondary-400">
                  {email}
                </Typography>
              ) : (
                <div className="bg-[#EEE] w-18 h-2 rounded-md" />
              )}
            </div>
          </div>
          <div className="flex flex-col gap-5 w-full px-2 flex-1 mb-6">
            {socialsWithIcons
              .filter((social) => !!social.id)
              .map((social) => (
                <div
                  className="flex gap-2 items-center rounded-sm p-4 cursor-pointer"
                  key={social.id}
                  style={{
                    backgroundColor: social.bgColor,
                    color: social.textColor,
                    border:
                      social.borderColor && "1px solid " + social.borderColor,
                  }}
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.setData("socialId", social.id);
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
                    swap(socialId, social.id);
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
                className="w-full h-12 shrink-0 rounded-sm bg-[#EEE]"
                key={i}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
