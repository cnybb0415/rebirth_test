import Link from "next/link";
import { BinderPage, BinderHeading } from "@/components/concert/BinderPage";
import { getCheeringSongs } from "@/lib/cheering";

const ACCENT = "#ff4d8d";

export default async function ConertCheerPage() {
  const songs = await getCheeringSongs();

  return (
    <BinderPage activeTab="cheer" pixelFontFamily="'Mulmaru', 'PFStarDust', monospace">
      <BinderHeading
        emoji="📣"
        title="응원법"
        subtitle="CHEER GUIDE"
        accentColor={ACCENT}
      />

      <div className="pb-6 space-y-[2px]">
        {songs.map((song) => {
          const disabled = !song.hasGuide;

          const inner = (
            <div
              className="flex items-center gap-3 py-[10px] border-b"
              style={{ borderColor: "rgba(255,255,255,0.08)" }}
            >
              {/* 앨범아트 */}
              <div
                className="shrink-0 overflow-hidden"
                style={{
                  width: "38px",
                  height: "38px",
                  border: `2px solid ${disabled ? "rgba(255,255,255,0.1)" : ACCENT + "66"}`,
                }}
              >
                {song.coverSrc ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={song.coverSrc}
                    alt={song.label}
                    className="w-full h-full object-cover"
                    style={{ opacity: disabled ? 0.35 : 0.85 }}
                    loading="lazy"
                  />
                ) : (
                  <div
                    className="w-full h-full"
                    style={{ background: "rgba(255,77,141,0.08)" }}
                  />
                )}
              </div>

              {/* 곡명 */}
              <span
                className="flex-1 min-w-0 truncate"
                style={{
                  fontSize: "0.75rem",
                  fontWeight: disabled ? 400 : 700,
                  color: disabled ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.9)",
                  letterSpacing: "0.04em",
                }}
              >
                {song.label}
              </span>

              {/* 상태 */}
              {disabled ? (
                <span
                  style={{
                    fontSize: "0.5rem",
                    color: "rgba(255,255,255,0.25)",
                    letterSpacing: "0.15em",
                    fontWeight: 400,
                    flexShrink: 0,
                  }}
                >
                  준비중
                </span>
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  style={{ width: "12px", height: "12px", flexShrink: 0, color: ACCENT }}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
          );

          if (disabled) {
            return (
              <div key={song.id} aria-disabled="true">
                {inner}
              </div>
            );
          }

          return (
            <Link key={song.id} href={`/cheer/${encodeURIComponent(song.slug)}`}>
              {inner}
            </Link>
          );
        })}
      </div>
    </BinderPage>
  );
}
