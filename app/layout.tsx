import { ReactNode } from "react";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";
import { Instrument_Sans } from "next/font/google";
import { ToastContainer } from "react-toastify";
import { SessionProvider } from "@/context/SessionProvider";
import { TRPCReactProvider } from "@/context/TRPCProvider";
import { cn } from "@/utils/cn";
import "react-toastify/dist/ReactToastify.css";
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
      <body className={cn(instrumentSans.className, "bg-secondary-200")}>
        <ToastContainer
          position="bottom-center"
          autoClose={3000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <TRPCReactProvider cookies={cookies().toString()}>
          <SessionProvider session={session}>{children}</SessionProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
