import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

//@ts-expect-error
export default async function Layout({ children }: { children: ReactNode }) {
  const session = await getServerSession();
  if (session) return redirect("/");

  return children;
}
