"use client";
import { Button } from "@/ui/Button";
import { signOut } from "next-auth/react";

export default function Home() {
  return (
    <main className="p-8 flex flex-col gap-2">
      <Button label="Button" onClick={() => signOut()} />
    </main>
  );
}
