"use client";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import { LinkIcon } from "@/assets/LinkIcon";
import { ArrowRightLongIcon } from "@/assets/ArrowRightLongIcon";
import { socials } from "@/data/socials";
import { useProfile } from "@/hooks/useProfile";
import { Button, Typography } from "@/ui";

export default function Page() {
  const { userSocials, firstName, lastName, email, image, slug } = useProfile();
  const socialsWithIcons = userSocials
    .map((social) => ({
      ...social,
      ...socials.find((s) => s.providerId === social.providerId)!,
    }))
    .filter((social) => !!social.providerId);

  const handleCopy = async () => {
    const protocol = window.location.protocol;
    const host = window.location.host;
    await navigator.clipboard.writeText(
      `${protocol}//${host}/developer/${slug}`,
    );
    toast(
      <div className="flex items-center gap-2">
        <LinkIcon width={20} height={20} />
        The link has been copied to your clipboard!
      </div>,
    );
  };

  return (
    <>
      <div className="md:h-[35rem] md:rounded-b-3xl md:bg-primary-300 md:p-6">
        <div className="flex items-center justify-between rounded-md bg-secondary-100 px-6 py-4">
          <Button variant="secondary" as={Link} href="/">
            Back to Editor
          </Button>
          <Button onClick={handleCopy}>Share Link</Button>
        </div>
      </div>
      <div className="flex w-full flex-col gap-5 bg-secondary-100 px-14 py-12 md:mx-auto md:w-[35rem] md:-translate-y-1/4 md:rounded-md">
        <div className="mt-13 flex w-full flex-col items-center gap-6">
          {image ? (
            <img
              src={image}
              className="h-26 w-26 rounded-full border-4 border-primary-300 object-cover"
            />
          ) : (
            <div className="h-24 w-24 rounded-full bg-secondary-100" />
          )}
          <div className="flex w-full flex-col items-center gap-2">
            {firstName || lastName ? (
              <Typography variant="heading-m" className="text-secondary-500">
                {firstName} {lastName}
              </Typography>
            ) : (
              <div className="h-4 w-40 rounded-md bg-secondary-100" />
            )}
            <Typography variant="body-s" className="text-secondary-400">
              {email}
            </Typography>
          </div>
        </div>
        <div className="mb-6 flex w-full flex-1 flex-col gap-5 px-2">
          {socialsWithIcons.map((social) => (
            <Link
              target="_blank"
              key={social.providerId}
              href={social.url}
              className="flex cursor-pointer items-center gap-2 rounded-sm p-4"
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
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
