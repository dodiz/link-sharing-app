import { LogoText } from "@/assets/LogoText";
import { LogoIcon } from "@/assets/LogoIcon";
import { Typography } from "@/ui/Typography";
import { LoginProviders } from "./LoginProviders";

export default function Page() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-13">
      <div className="flex items-center gap-2">
        <LogoIcon />
        <LogoText />
      </div>
      <div className="flex w-[48rem] flex-col gap-10 rounded-md bg-secondary-50 p-10">
        <div className="flex flex-col gap-2">
          <Typography variant="heading-m">Login</Typography>
          <Typography variant="body-m">
            Use one of the providers below to login
          </Typography>
        </div>
        <LoginProviders />
      </div>
    </div>
  );
}
