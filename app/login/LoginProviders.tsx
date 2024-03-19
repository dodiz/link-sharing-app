"use client";

import { FC } from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";

export const LoginProviders: FC = () => {
  return (
    <div className="flex flex-col gap-4">
      <button
        className="flex items-center justify-center gap-2 rounded-sm bg-black p-4 text-white"
        onClick={() => signIn("github")}
      >
        <Image alt="" width={20} height={20} src="/socials/github.svg" />
        Login in with Github
      </button>
    </div>
  );
};
