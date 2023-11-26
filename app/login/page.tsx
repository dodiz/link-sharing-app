import { Typography } from "@/ui/Typography";
import { Logo } from "@/ui/Logo";
import { LoginProviders } from "./LoginProviders";

export default function Page() {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-13">
      <Logo />
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
