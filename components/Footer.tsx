"use client";
import { usePathname } from "next/navigation";

const siteId = process.env.NEXT_PUBLIC_SITE_ID ?? "george";

const footerText: Record<string, string> = {
  george: "© George Mahashe 2026",
  defunct: "© —defunct context 2026",
};

export default function Footer() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <footer
      className={`
        w-full border-t py-6
        ${isHome
          ? "absolute bottom-0 left-0 z-10 bg-transparent border-white/20 text-white"
          : "border-gray-200 text-gray-500"
        }
      `}
    >
      <div className="max-w-5xl mx-auto px-6 text-center">
        {footerText[siteId] ?? footerText.george}
      </div>
    </footer>
  );
}