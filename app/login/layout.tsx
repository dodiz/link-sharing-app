import { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

//@ts-ignore
export default async function Layout({ children }: { children: ReactNode }) {
  const session = await getServerSession();
  if (session) return redirect("/");

  return children;
}
