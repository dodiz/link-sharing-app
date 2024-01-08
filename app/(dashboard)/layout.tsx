import { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ProfileProvider } from "@/context/ProfileProvider";
import { api } from "@/utils/apiServer";

//@ts-ignore
export default async function Layout({ children }: { children: ReactNode }) {
  const session = await getServerSession();
  if (!session) return redirect("/login");
  const { socials, email, firstName, lastName } =
    await api.profile.getInfo.query();

  return (
    <ProfileProvider
      initialEmail={email || ""}
      initialFirstName={firstName || ""}
      initialLastName={lastName || ""}
      initialSocials={socials}
    >
      {children}
    </ProfileProvider>
  );
}
