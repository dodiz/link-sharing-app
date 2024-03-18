import { FC } from "react";
import Link from "next/link";
import { LinkIcon } from "@/assets/LinkIcon";
import { LogoText } from "@/assets/LogoText";
import { LogoIcon } from "@/assets/LogoIcon";
import { AccountIcon } from "@/assets/AccountIcon";
import { Button } from "@/ui/Button";
import { NavLink } from "@/ui/NavLink";
import { PreviewIcon } from "@/assets/PreviewIcon";

export const Header: FC = () => {
  return (
    <header className="bg-secondary-50 px-6 py-3 flex items-center justify-between rounded-md">
      <div className="flex items-center gap-2">
        <LogoIcon />
        <LogoText className="hidden md:inline" />
      </div>
      <div className="flex gap-4">
        <NavLink href="/">
          <LinkIcon fill="currentColor" />
          <span className="hidden md:inline">Links</span>
        </NavLink>
        <NavLink href="/profile">
          <AccountIcon fill="currentColor" />
          <span className="hidden md:inline">Profile Details</span>
        </NavLink>
      </div>
      <Button
        as={Link}
        href="/preview"
        variant="secondary"
        className="flex gap-4"
      >
        <PreviewIcon className="md:hidden" />
        <span className="hidden md:inline">Preview</span>
      </Button>
    </header>
  );
};
