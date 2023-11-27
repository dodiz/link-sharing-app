import { ReactNode } from "react";
import { Header } from "./_components/Header";
import { Preview } from "./_components/Preview";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <main className="p-6 flex flex-col gap-6">
      <Header />
      <div className="flex gap-4">
        <Preview />
        <div className="flex-1 p-10 rounded-md bg-secondary-100">
          {children}
        </div>
      </div>
    </main>
  );
}
