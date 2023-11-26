"use client";

import { Button } from "@/ui/Button";
import { Typography } from "@/ui/Typography";
import { Logo } from "@/ui/Logo";
import { signIn } from "next-auth/react";

export default function Page() {
  return (
    <div className="h-screen bg-secondary-200 flex flex-col items-center justify-center gap-13">
      <Logo />
      <div className="p-10 rounded-md flex flex-col gap-10 bg-secondary-100">
        <div className="flex flex-col gap-2">
          <Typography variant="heading-m">Login</Typography>
          <Typography variant="body-m">
            Use one of the providers below to login
          </Typography>
        </div>
        <div className="flex flex-col gap-4">
          <Button variant="primary" label="Google" />
          <Button
            variant="primary"
            onClick={() => signIn("github")}
            label="Github"
          />
        </div>
      </div>
    </div>
  );
}
