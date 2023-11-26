import { ReactNode } from "react";
import { Header } from "./_components/Header";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <main className="p-6 flex flex-col gap-6">
      <Header />
      {children}
    </main>
  );
}
