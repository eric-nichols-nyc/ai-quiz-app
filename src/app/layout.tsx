import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import localFont from "next/font/local";
import StickyHeader from "../components/StickyHeader";
import TanstackProvider from "@/providers/tanstack-provider";

import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "AI Flashcards",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gradient-to-r from-blue-100 to-purple-100`}>
        <TanstackProvider>

          <StickyHeader />
          <div className="flex flex-col items-center rounded-lg p-4">
          {children}
            </div>
          </TanstackProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
