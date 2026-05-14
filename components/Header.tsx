import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full border-b border-gray-200 py-6">
      <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">

        {/* LEFT: Name stacked */}
        <Link
          href="/"
          className="
            font-metana
            text-2xl sm:text-4xl
            leading-tight
            self-start
          "
        >
          <span className="block">George</span>
          <span className="block">Mahashe</span>
        </Link>

        {/* RIGHT: Nav */}
        <nav
          className="
            flex gap-6
            text-lg sm:text-xl
            font-metana
            sm:ml-auto
            self-start sm:self-auto
          "
        >
          <Link href="/projects" className="hover:opacity-60 transition">
            Projects
          </Link>
          <Link href="/about" className="hover:opacity-60 transition">
            About
          </Link>
          <Link href="/archive" className="hover:opacity-60 transition">
            Archive
          </Link>
        </nav>

      </div>
    </header>
  );
}