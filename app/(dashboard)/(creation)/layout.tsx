import { ReactNode } from "react";
import { SocialsProvider } from "@/context/SocialsProvider";
import { api } from "@/utils/apiServer";
import { Header } from "../../components/Header";
import { Preview } from "../../components/Preview";

export default async function Layout({ children }: { children: ReactNode }) {
  const socials = await api.socials.getAll.query();
  return (
    <main className="p-6 flex flex-col gap-6">
      <Header />
      <SocialsProvider initialSocials={socials}>
        <div className="flex gap-4">
          <Preview />
          <div className="flex-1 p-10 rounded-md bg-secondary-100">
            {children}
          </div>
        </div>
      </SocialsProvider>
    </main>
  );
}
