import Link from "next/link";
import Image from "next/image";
import { getSession, getUserFromDb } from "@/lib/auth";
import { HeaderNav } from "./HeaderNav";

export async function Header() {
  const user = await getSession();
  const profile = user ? await getUserFromDb(user.id) : null;

  return (
      <header className="sticky top-0 z-50 border-b border-t-4 border-b-border border-t-primary bg-surface/95 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6">
          <div className="flex items-center justify-between gap-4">
            <Link href="/" className="group">
              <div className="flex items-center gap-3">
                <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-white sm:h-12 sm:w-12">
                  <Image src="/images/voz.png" alt="Símbolo Voz da Fibro" fill priority sizes="48px" className="object-cover" />
                </div>
                <div>
                  <h1 className="text-lg font-extrabold leading-none text-foreground sm:text-xl">
                    Voz da Fibro
                  </h1>
                  <p className="mt-1 hidden text-xs font-medium text-muted min-[360px]:block sm:text-sm">
                    Comunidade, Cuidado e Direitos
                  </p>
                </div>
              </div>
            </Link>
            <HeaderNav user={user ? { ...user, avatarUrl: profile?.avatarUrl ?? null } : null} />
          </div>
        </div>
      </header>
  );
}
