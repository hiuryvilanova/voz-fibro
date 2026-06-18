"use client";

import { usePathname, useRouter } from "next/navigation";

export function PageReturn() {
  const pathname = usePathname();
  const router = useRouter();
  if (pathname === "/") return null;

  function handleBack() {
    if (window.history.length > 1) {
      router.back();
      return;
    }
    router.push("/");
  }

  return (
    <div className="border-b border-border bg-white">
      <div className="mx-auto max-w-7xl px-5 py-2.5 sm:px-8 lg:px-10">
        <button type="button" onClick={handleBack} className="inline-flex min-h-11 items-center rounded-md bg-primary px-5 py-2 text-sm font-bold text-white shadow-sm transition-colors hover:bg-primary-dark focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-primary">
          Voltar
        </button>
      </div>
    </div>
  );
}
