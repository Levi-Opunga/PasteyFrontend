import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppWrapper } from "@/app/AppContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pastey",
  description: "A simple pastebin for code snippets.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="dark  " lang="en">
        <body className={inter.className + " dark:bg-[#0B132B] "}>
        <AppWrapper>

        {children}
        </AppWrapper>

        </body>
    </html>
  );
}
