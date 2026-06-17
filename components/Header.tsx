import Link from "next/link";

const siteId = process.env.NEXT_PUBLIC_SITE_ID ?? "george";

const siteConfig = {
  george: {
    nameLines: ["George", "Mahashe"],
    nav: [
      { label: "Projects", href: "/projects" },
      { label: "Exhibitions", href: "/exhibitions" },
      { label: "About", href: "/about" },
      { label: "Archive", href: "/archive" },
    ],
  },
  defunct: {
    nameLines: ["—defunct context"],
    nav: [
      { label: "Projects", href: "/projects" },
      { label: "Exhibitions", href: "/exhibitions" },
      { label: "About", href: "/about" },
      { label: "Archive", href: "/archive" },
    ],
  },
};

export default function Header() {
  const config = siteConfig[siteId as keyof typeof siteConfig] ?? siteConfig.george;

  return (
    <header className="w-full border-b border-gray-200 py-6">
      <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <Link
          href="/"
          className="font-metana text-2xl sm:text-4xl leading-tight self-start"
        >
          {config.nameLines.map((line) => (
            <span key={line} className="block">{line}</span>
          ))}
        </Link>
        <nav className="flex gap-6 text-lg sm:text-xl font-metana sm:ml-auto self-start sm:self-auto">
          {config.nav.map(({ label, href }) => (
            <Link key={href} href={href} className="hover:opacity-60 transition">
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}