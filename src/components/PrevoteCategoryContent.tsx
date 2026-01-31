"use client";

import { voteGuides, type GuideAsset } from "@/data/guides";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { VoteTabsWithSidebar } from "@/components/GuideTabs";
import { type PrevoteCategoryId } from "@/lib/prevoteCategories";

function EmptyState({ title, lines }: { title: string; lines: string[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-sm text-foreground/80">아직 업로드된 가이드가 없어요.</p>
        <div className="rounded-xl border border-foreground/10 bg-white p-3 text-xs text-foreground/80 shadow-sm">
          <div className="font-semibold">업로드 방법</div>
          <div className="mt-1 space-y-1">
            {lines.map((line, idx) => (
              <div key={idx}>{line}</div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function Assets({ title, idKey, assets, emptyLines }: { title: string; idKey: string; assets: GuideAsset[]; emptyLines: string[] }) {
  if (!assets.length) return <EmptyState title={title} lines={emptyLines} />;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {assets.map((asset, idx) => {
          if (asset.type === "pdf") {
            return (
              <a
                key={`${idKey}-pdf-${idx}`}
                href={asset.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between rounded-lg border border-foreground/10 bg-white px-4 py-2 text-sm font-medium text-foreground shadow-sm"
                >
                  <span>{asset.label ?? "PDF 열기"}</span>
                  <span className="text-xs text-foreground/70">새 탭</span>
                </button>
              </a>
            );
          }

          return (
            <div
              key={`${idKey}-img-${idx}`}
              className="overflow-hidden rounded-2xl border border-foreground/10 bg-white"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={asset.src} alt={asset.alt ?? `${title} 이미지 ${idx + 1}`} className="h-auto w-full" />
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

function getCommonAssets() {
  const common = voteGuides.find((guide) => guide.id === "common");
  return common?.assets ?? [];
}

function pickByKeyword(assets: GuideAsset[], keyword: string) {
  return assets.filter((asset) => asset.type === "image" && asset.src.includes(keyword));
}

export function PrevoteCategoryContent({ categoryId }: { categoryId: PrevoteCategoryId }) {
  if (categoryId === "guide") {
    const filteredGuides = voteGuides.filter((guide) => guide.id !== "common");
    return <VoteTabsWithSidebar guides={filteredGuides} />;
  }

  const assets = getCommonAssets();

  if (categoryId === "schedule") {
    const scheduleAssets = pickByKeyword(assets, "사전투표");
    return (
      <Assets
        title="사전투표 일정"
        idKey="prevote-schedule"
        assets={scheduleAssets}
        emptyLines={[
          "1) 파일을 public/images/vote/공통/guide/ 아래에 넣기",
          "2) src/data/guides.ts 의 voteGuides > 공통 assets에 경로 추가",
        ]}
      />
    );
  }

  const ratioAssets = pickByKeyword(assets, "반영비율");
  return (
    <Assets
      title="음악방송 반영 비율 안내"
      idKey="prevote-ratio"
      assets={ratioAssets}
      emptyLines={[
        "1) 파일을 public/images/vote/공통/guide/ 아래에 넣기",
        "2) src/data/guides.ts 의 voteGuides > 공통 assets에 경로 추가",
      ]}
    />
  );
}
