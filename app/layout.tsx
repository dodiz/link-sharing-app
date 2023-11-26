import { ReactNode } from "react";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { Instrument_Sans } from "next/font/google";
import { SessionProvider } from "./SessionProvider";
import "./globals.css";

const instrumentSans = Instrument_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Link Sharing App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className={instrumentSans.className}>
        <SessionProvider session={session}>{children}</SessionProvider>
      </body>
    </html>
  );
}
