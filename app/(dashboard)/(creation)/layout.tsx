import { ReactNode } from "react";
import { Header } from "@/components/Header";
import { Preview } from "@/components/Preview";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <main className="md:p-6 flex flex-col gap-6">
      <Header />
      <div className="flex gap-4 justify-center items-start">
        <Preview />
        <div className="flex-1 rounded-md bg-secondary-100 max-w-[90rem]">
          {children}
        </div>
      </div>
    </main>
  );
}
