"use client";

import { FC } from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";

export const LoginProviders: FC = () => {
  return (
    <div className="flex flex-col gap-4">
      <button
        className="p-4 flex gap-2 items-center justify-center bg-black rounded-sm text-white"
        onClick={() => signIn("github")}
      >
        <Image alt="" width={20} height={20} src="/socials/github.svg" />
        Login in with Github
      </button>
    </div>
  );
};
