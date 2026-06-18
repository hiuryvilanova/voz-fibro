import Link from "next/link";
import { getSession } from "@/lib/auth";
import { HeaderNav, MobileNav } from "./HeaderNav";

export async function Header() {
  const user = await getSession();

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border bg-surface/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Link href="/" className="group flex items-center gap-2.5">
            <span
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-sm font-bold text-white"
              aria-hidden
            >
              VF
            </span>
            <div className="leading-tight">
              <span className="block text-sm font-semibold text-foreground group-hover:text-primary">
                Voz da Fibro
              </span>
              <span className="hidden text-xs text-muted sm:block">
                Comunidade, Cuidado e Direitos
              </span>
            </div>
          </Link>
          <HeaderNav user={user} />
        </div>
      </header>
      <MobileNav />
    </>
  );
}
