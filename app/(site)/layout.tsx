import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import IridescentBackground from "@/components/IridescentBackground";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteId = process.env.NEXT_PUBLIC_SITE_ID ?? "george";

export const metadata: Metadata = {
  title: {
    template: siteId === "defunct"
      ? "%s | —defunct context"
      : "%s | George Mahashe",
    default: siteId === "defunct"
      ? "—defunct context"
      : "George Mahashe",
  },
};

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`
        ${geistSans.variable}
        ${geistMono.variable}
        antialiased
        min-h-dvh
        relative
        isolate
        flex flex-col
      `}
    >
      <IridescentBackground opacity={0.35} />
      <div className="relative z-10 isolate flex flex-col flex-1">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </div>
  );
}