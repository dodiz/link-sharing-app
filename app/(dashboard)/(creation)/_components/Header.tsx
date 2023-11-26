import { FC } from "react";
import { Button } from "@/ui/Button";
import { Logo } from "@/ui/Logo";
import { NavLink } from "@/ui/NavLink";
import { LinkIcon } from "@/ui/icons/LinkIcon";
import { AccountIcon } from "@/ui/icons/AccountIcon";

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
      <Button variant="secondary" label="Preview" />
    </header>
  );
};
