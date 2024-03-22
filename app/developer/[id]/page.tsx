import Image from "next/image";
import Link from "next/link";
import { ArrowRightLongIcon } from "@/assets/ArrowRightLongIcon";
import { api } from "@/utils/apiServer";
import { socials } from "@/data/socials";
import { Button, Typography } from "@/ui";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const developer = await api.getDeveloper.query(params.id);
  if (!developer) {
    return notFound();
  }
  const socialsWithIcons = developer.socials
    .map((social) => ({
      ...social,
      ...socials.find((s) => s.providerId === social.providerId)!,
    }))
    .filter((social) => !!social.providerId);

  return (
    <>
      <div className="md:h-[35rem] md:rounded-b-3xl md:bg-primary-300 md:p-6">
        <div className="flex items-center justify-between rounded-md bg-secondary-100 px-6 py-4">
          <Button variant="secondary" as={Link} href="/">
            Go to app
          </Button>
        </div>
      </div>
      <div className="flex w-full flex-col gap-5 bg-secondary-100 px-14 py-12 md:mx-auto md:w-[35rem] md:-translate-y-1/4 md:rounded-md">
        <div className="mt-13 flex w-full flex-col items-center gap-6">
          <img
            src={developer.image}
            className="h-26 w-26 rounded-full border-4 border-primary-300 object-cover"
          />
          <div className="flex w-full flex-col items-center gap-2">
            <Typography variant="heading-m" className="text-secondary-500">
              {developer.firstName} {developer.lastName}
            </Typography>
            <Typography variant="body-s" className="text-secondary-400">
              {developer.email}
            </Typography>
          </div>
        </div>
        <div className="mb-6 flex w-full flex-1 flex-col gap-5 px-2">
          {socialsWithIcons.map((social) => (
            <Link
              href={social.url}
              key={social.providerId}
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
