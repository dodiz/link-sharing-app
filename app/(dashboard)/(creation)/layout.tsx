import { ReactNode } from "react";
import { Header } from "@/components/Header";
import { Preview } from "@/components/Preview";
import { ProfileProvider } from "@/context/ProfileProvider";
import { api } from "@/utils/apiServer";

export default async function Layout({ children }: { children: ReactNode }) {
  const { socials, email, firstName, lastName } =
    await api.profile.getInfo.query();
  return (
    <main className="p-6 flex flex-col gap-6">
      <Header />
      <ProfileProvider
        initialEmail={email}
        initialFirstName={firstName}
        initialLastName={lastName}
        initialSocials={socials}
      >
        <div className="flex gap-4 justify-center items-start">
          <Preview />
          <div className="flex-1 rounded-md bg-secondary-100 max-w-[90rem]">
            {children}
          </div>
        </div>
      </ProfileProvider>
    </main>
  );
}
