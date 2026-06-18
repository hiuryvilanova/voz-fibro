import type { Metadata } from "next";
import { GrupoApp } from "@/components/GrupoApp";
import { Disclaimer } from "@/components/Disclaimer";
import { prisma } from "@/lib/prisma";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const group = await prisma.group.findUnique({ where: { slug } });
  return {
    title: group?.name ?? "Grupo",
    description: group?.description,
  };
}

export default async function GrupoPage({ params }: PageProps) {
  const { slug } = await params;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <Disclaimer variant="compact" className="mb-6" />
      <GrupoApp slug={slug} />
    </div>
  );
}
