import Link from "next/link";
import { LogoText } from "@/assets/LogoText";
import { LogoIcon } from "@/assets/LogoIcon";
import { Typography } from "@/ui";
import { LoginProviders } from "./LoginProviders";

export default function Page() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-13">
      <div className="flex items-center gap-2">
        <LogoIcon />
        <LogoText />
      </div>
      <div className="mx-2 rounded-md bg-secondary-50 p-10">
        <Typography variant="heading-m">Login</Typography>
        <Typography variant="body-m" className="mt-2">
          Use one of the providers below to login
        </Typography>
        <div className="mt-10">
          <LoginProviders />
        </div>
        <div className="text-sm mt-10">
          <div>
            App made for <b>portfolio purposes</b>. Code available on{" "}
            <Link
              className="font-semibold text-primary-300"
              href="https://github.com/dodiz/link-sharing-app"
            >
              Github
            </Link>
            .
          </div>
          <div>
            Huge thanks to{" "}
            <Link
              className="font-semibold text-primary-300"
              href="https://www.frontendmentor.io/challenges/linksharing-app-Fbt7yweGsT"
            >
              Frontendmentor
            </Link>{" "}
            for providing the challenge
          </div>
        </div>
      </div>
    </div>
  );
}
