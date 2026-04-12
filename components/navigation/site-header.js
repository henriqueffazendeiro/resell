import Image from "next/image";

export function SiteHeader() {
  return (
    <header className="relative z-50 h-20 w-full px-5 md:fixed md:top-0 md:left-0 md:px-8">
      <div className="header-blur-layer pointer-events-none absolute inset-x-0 top-0 -z-10 h-[4.75rem] w-full md:fixed md:inset-0 md:h-[11.75rem] md:backdrop-blur-lg" />

      <div className="flex h-full items-center justify-center md:justify-between">
        <Image
          src="/logo.png"
          alt="Logo"
          width={112}
          height={32}
          className="h-auto w-28 md:w-32"
          priority
        />
      </div>
    </header>
  );
}
