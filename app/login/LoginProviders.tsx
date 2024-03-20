"use client";

import { FC } from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";

export const LoginProviders: FC = () => {
  return (
    <div className="flex flex-col gap-4">
      <button
        className="bg-black flex items-center justify-center gap-2 rounded-sm p-4 text-secondary-50"
        onClick={() => signIn("github")}
      >
        <Image alt="" width={20} height={20} src="/socials/github.svg" />
        Login in with Github
      </button>
    </div>
  );
};
