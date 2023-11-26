import { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Header } from "./Header";

//@ts-ignore
export default async function Layout({ children }: { children: ReactNode }) {
  const session = await getServerSession();
  if (!session) return redirect("/login");

  return (
    <main className="p-6 flex flex-col gap-6">
      <Header />
      {children}
    </main>
  );
}
