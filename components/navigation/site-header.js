import Link from "next/link";
import { Container } from "@/components/ui/container";

export function SiteHeader() {
  return (
    <header className="border-b border-line bg-page">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="text-sm font-semibold tracking-[0.2em] text-brand uppercase">
          Katching
        </Link>
        <nav aria-label="Navegacao principal">
          <ul className="flex items-center gap-6 text-sm text-muted">
            <li>Placeholder</li>
          </ul>
        </nav>
      </Container>
    </header>
  );
}
