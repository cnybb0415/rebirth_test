import Link from "next/link";
import { notFound } from "next/navigation";
import { BinderPage, BinderHeading } from "@/components/concert/BinderPage";
import { CheerMiniPlayer } from "@/components/CheerMiniPlayer";
import { getCheeringSongById } from "@/lib/cheering";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function toYouTubeEmbedUrl(input: string): string {
  try {
    const url = new URL(input);

    if (url.hostname.includes("youtu.be")) {
      const id = url.pathname.replace(/^\//, "").split("/")[0];
      if (id) return `https://www.youtube.com/embed/${id}`;
    }

    if (url.hostname.includes("youtube.com")) {
      const id = url.searchParams.get("v");
      if (id) return `https://www.youtube.com/embed/${id}`;
    }
  } catch {
    return input;
  }

  return input;
}

const ACCENT = "#ff4d8d";

export default async function CheerDetailPage({
  params,
}: {
  params: Promise<{ songId: string }>;
}) {
  const { songId } = await params;
  const song = await getCheeringSongById(songId);
  if (!song) notFound();

  const hasAssets = song.guideAssets.length > 0;
  const embedUrl = song.youtubeUrl ? toYouTubeEmbedUrl(song.youtubeUrl) : null;

  return (
    <BinderPage activeTab="cheer">
      <div className="pt-1 pb-6">
        <BinderHeading
          emoji="📣"
          title={song.label}
          subtitle="CHEER GUIDE"
          accentColor={ACCENT}
        />

        <Link
          href="/concert/cheer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "4px",
            fontSize: "0.55rem",
            letterSpacing: "0.2em",
            color: "rgba(255,77,141,0.7)",
            fontWeight: 700,
            marginBottom: "14px",
          }}
        >
          ← 목록
        </Link>

        <div className="space-y-3">
          {hasAssets ? (
            song.guideAssets.map((asset, idx) => (
              <div
                key={`img-${idx}`}
                className="overflow-hidden"
                style={{ border: `1.5px solid ${ACCENT}55` }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={asset.src}
                  alt={asset.alt ?? `${song.label} 이미지 ${idx + 1}`}
                  className="h-auto w-full"
                  loading="lazy"
                />
              </div>
            ))
          ) : (
            <div
              style={{
                padding: "24px",
                border: `1.5px dashed ${ACCENT}44`,
                textAlign: "center",
                fontSize: "0.6rem",
                letterSpacing: "0.25em",
                color: "rgba(255,255,255,0.3)",
                fontWeight: 700,
              }}
            >
              COMING SOON
            </div>
          )}
        </div>

        {embedUrl && <CheerMiniPlayer songLabel={song.label} embedUrl={embedUrl} />}
      </div>
    </BinderPage>
  );
}
