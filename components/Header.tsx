import { FC } from "react";
import Link from "next/link";
import { LinkIcon } from "@/assets/LinkIcon";
import { AccountIcon } from "@/assets/AccountIcon";
import { Button } from "@/ui/Button";
import { Logo } from "@/ui/Logo";
import { NavLink } from "@/ui/NavLink";

export const Header: FC = () => {
  return (
    <header className="bg-secondary-100 px-6 py-3 flex items-center justify-between rounded-md">
      <Logo />
      <div className="flex gap-4">
        <NavLink href="/">
          <LinkIcon fill="currentColor" />
          Links
        </NavLink>
        <NavLink href="/profile">
          <AccountIcon fill="currentColor" />
          Profile Details
        </NavLink>
      </div>
      <Button as={Link} href="/preview" variant="secondary" label="Preview" />
    </header>
  );
};
