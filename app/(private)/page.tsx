"use client";
import { ComponentProps, FC, ReactNode, useState } from "react";
import { Button } from "@/ui/Button";
import { Input } from "@/ui/Input";
import { Select } from "@/ui/Select";
import { Tab } from "@/ui/Tab";
import { LinkIcon } from "@/ui/icons/LinkIcon";
import { ArrowDownIcon } from "@/ui/icons/ArrowDownIcon";
import { signOut } from "next-auth/react";

export default function Home() {
  const [selected, setSelected] = useState<{
    label: string;
    value: string;
    Icon: ReactNode;
  } | null>(null);
  const [active, setActive] = useState(false);
  return (
    <main className="p-8 flex flex-col gap-2">
      <Button label="Button" onClick={() => signOut()} />
    </main>
  );
}
