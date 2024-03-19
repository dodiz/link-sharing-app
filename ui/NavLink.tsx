"use client";

import { FC, PropsWithChildren } from "react";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";

type NavLinkProps = LinkProps & PropsWithChildren;

export const NavLink: FC<NavLinkProps> = ({ children, ...props }) => {
  const pathname = usePathname();
  return (
    <Link
      className={`flex  cursor-pointer items-center gap-2 rounded-sm px-7 py-[1.1rem] font-semibold transition-all hover:text-primary-300 focus:outline-primary-300 ${
        pathname === props.href
          ? "bg-primary-100 text-primary-300"
          : "text-secondary-400"
      }`}
      {...props}
    >
      {children}
    </Link>
  );
};
