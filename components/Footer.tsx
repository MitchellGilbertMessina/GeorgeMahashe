"use client";

import { usePathname } from "next/navigation";

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
        © George Mahashe 2026
      </div>
    </footer>
  );
}