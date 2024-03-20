import { ReactNode } from "react";
import { Preview } from "./Preview";
import { Header } from "./Header";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <main className="flex flex-col gap-6 md:p-6">
      <Header />
      <div className="flex items-start justify-center gap-4">
        <Preview />
        <div className="max-w-[90rem] flex-1 rounded-md bg-secondary-50">
          {children}
        </div>
      </div>
    </main>
  );
}
