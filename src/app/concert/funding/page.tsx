import Link from "next/link";
import { BinderPage, BinderHeading } from "@/components/concert/BinderPage";
import { announcements } from "@/data/announcements";

const ACCENT = "#ffd700";

export default function ConcertFundingPage() {
  return (
    <BinderPage activeTab="funding">
      <BinderHeading
        emoji="💰"
        title="모금"
        subtitle="FUNDING"
        accentColor={ACCENT}
      />

      <div className="pb-6 space-y-3">
        {announcements.length === 0 ? (
          <p
            style={{
              fontSize: "0.65rem",
              color: "rgba(255,255,255,0.3)",
              letterSpacing: "0.2em",
              fontWeight: 400,
              paddingTop: "16px",
            }}
          >
            등록된 공지가 없습니다
          </p>
        ) : (
          announcements.map((item) => (
            <Link key={item.id} href={`/notice/${item.id}`} className="block group">
              <div
                className="py-3 px-0 border-b transition-all duration-150"
                style={{ borderColor: "rgba(255,215,0,0.2)" }}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p
                      className="truncate leading-snug"
                      style={{
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        color: "rgba(255,255,255,0.88)",
                        letterSpacing: "0.03em",
                      }}
                    >
                      {item.title}
                    </p>
                    <p
                      className="mt-1"
                      style={{
                        fontSize: "0.55rem",
                        color: ACCENT,
                        letterSpacing: "0.15em",
                        fontWeight: 400,
                      }}
                    >
                      {item.date}
                    </p>
                  </div>
                  <svg
                    viewBox="0 0 24 24"
                    style={{
                      width: "12px",
                      height: "12px",
                      flexShrink: 0,
                      marginTop: "3px",
                      color: ACCENT,
                      opacity: 0.5,
                    }}
                    className="group-hover:opacity-100 transition-opacity"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>

      {/* 노트 라인 */}
      <div className="space-y-[30px] pb-8">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="border-b border-white/8" style={{ minHeight: "20px" }} />
        ))}
      </div>
    </BinderPage>
  );
}
