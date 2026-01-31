import Link from "next/link";
import { notFound } from "next/navigation";

import { GuideCategoryContent } from "@/components/GuideCategoryContent";
import { guideCategories, getGuideCategory } from "@/lib/guideCategories";

export default async function GuideCategoryPage({
  params,
}: {
  params: { category: string } | Promise<{ category: string }>;
}) {
  const resolvedParams = await params;
  const category = getGuideCategory(resolvedParams.category);
  if (!category) return notFound();

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="text-2xl font-bold">{category.label}</h1>
        <Link href="/guide" className="text-sm text-foreground/70 hover:text-foreground">
          가이드 목록으로
        </Link>
      </div>
      <p className="mt-2 text-sm text-foreground/70">{category.description}</p>

      <div className="mt-6">
        <GuideCategoryContent categoryId={category.id} />
      </div>
    </main>
  );
}

export function generateStaticParams() {
  return guideCategories.map((category) => ({ category: category.id }));
}
