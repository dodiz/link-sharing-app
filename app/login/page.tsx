import { LogoText } from "@/assets/LogoText";
import { LogoIcon } from "@/assets/LogoIcon";
import { Typography } from "@/ui/Typography";
import { LoginProviders } from "./LoginProviders";

export default function Page() {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-13">
      <div className="flex items-center gap-2">
        <LogoIcon />
        <LogoText />
      </div>
      <div className="p-10 w-[48rem] rounded-md flex flex-col gap-10 bg-secondary-100">
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
