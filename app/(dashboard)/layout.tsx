import { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ProfileProvider } from "@/context/ProfileProvider";
import { api } from "@/utils/apiServer";

export default async function Layout({ children }: { children: ReactNode }) {
  const session = await getServerSession();
  if (!session) return redirect("/login");
  const { socials, email, firstName, lastName, image } =
    await api.profile.get.query();

  return (
    <ProfileProvider
      initialEmail={email || ""}
      initialFirstName={firstName || ""}
      initialLastName={lastName || ""}
      initialImage={image || ""}
      initialSocials={socials}
    >
      {children}
    </ProfileProvider>
  );
}
