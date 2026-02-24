import Link from "next/link";

// ─────────────────────────────────────────────────────────
//  카테고리 정의 — 탭 순서·색상·링크 변경은 여기서
// ─────────────────────────────────────────────────────────
export const BINDER_CATEGORIES = [
  {
    id: "cheer",
    title: "응원법",
    emoji: "📣",
    href: "/concert/cheer",
    tabColor: "#ff4d8d",
    textColor: "#2a000e",
  },
  {
    id: "funding",
    title: "모금",
    emoji: "💰",
    href: "/concert/funding",
    tabColor: "#ffd700",
    textColor: "#1a1100",
  },
  {
    id: "chorus",
    title: "떼창곡",
    emoji: "🎵",
    href: "/concert/chorus",
    tabColor: "#00e5ff",
    textColor: "#001a1f",
  },
  {
    id: "helper",
    title: "헬퍼모집",
    emoji: "🛸",
    href: "/concert/helper",
    tabColor: "#c084fc",
    textColor: "#0d0020",
  },
] as const;

export type CategoryId = (typeof BINDER_CATEGORIES)[number]["id"];

interface BinderPageProps {
  children: React.ReactNode;
  /** 현재 활성 탭 ID — 없으면 메인 화면 */
  activeTab?: CategoryId;
}

const PIXEL_FONT: React.CSSProperties = {
  fontFamily: "'PFStarDust', monospace",
  WebkitFontSmoothing: "none",
};

/** 인덱스 탭 고정 높이 (px) */
const TAB_H = 80;

export function BinderPage({ children, activeTab }: BinderPageProps) {
  return (
    /* 바깥 여백 — 모바일에서 사방 숨쉬기 */
    <div
      className="px-4 pt-5 pb-6 flex justify-center"
      style={PIXEL_FONT}
    >
      <div className="flex w-full" style={{ maxWidth: "400px" }}>

        {/* ──────────── 바인더 본체 ──────────── */}
        <div
          className="flex-1 min-w-0 relative"
          style={{
            background:
              "linear-gradient(170deg, rgba(10,12,28,0.98) 0%, rgba(5,7,18,0.99) 100%)",
            border: "2.5px solid rgba(255,255,255,0.5)",
            borderRight: "none",
            boxShadow: [
              "inset 0 0 50px rgba(0,229,255,0.025)",
              "inset 1px 0 0 rgba(255,255,255,0.04)",
              "6px 0 20px rgba(0,0,0,0.6)",
            ].join(", "),
          }}
        >


          {/* 페이지 내용 */}
          <div className="relative z-10 pl-[25px] pr-4 min-w-0 overflow-hidden">{children}</div>
        </div>

        {/* ──────────── 인덱스 탭 컬럼 ──────────── */}
        <div
          className="flex flex-col"
          style={{
            width: "42px",
            border: "2.5px solid rgba(255,255,255,0.5)",
            borderLeft: "none",
            background: "rgba(5,7,18,0.98)",
          }}
        >
          {BINDER_CATEGORIES.map((cat, idx) => {
            const isActive = activeTab === cat.id;
            return (
              <Link
                key={cat.id}
                href={cat.href}
                className="group flex flex-col items-center select-none"
                style={{
                  flex: "none",               /* 고정 크기 — 절대 늘어나지 않음 */
                  height: `${TAB_H}px`,
                  paddingTop: "10px",
                  paddingBottom: "8px",
                  gap: "4px",
                  backgroundColor: cat.tabColor,
                  borderBottom:
                    idx < BINDER_CATEGORIES.length - 1
                      ? "2px solid rgba(0,0,0,0.3)"
                      : "none",
                  filter: isActive
                    ? "brightness(1.05) saturate(1.0)"
                    : "brightness(0.5) saturate(0.65)",
                  boxShadow: isActive
                    ? "inset -4px 0 0 rgba(255,255,255,0.65), inset 0 1px 0 rgba(255,255,255,0.2)"
                    : "none",
                  transition: "filter 0.15s, box-shadow 0.15s",
                }}
              >
                {/* 이모지 */}
                <span
                  className="leading-none transition-transform group-hover:scale-110"
                  style={{ fontSize: "0.95rem" }}
                >
                  {cat.emoji}
                </span>

                {/* 세로 텍스트 */}
                <span
                  className="flex-1 flex items-center justify-center"
                  style={{
                    writingMode: "vertical-rl",
                    ...PIXEL_FONT,
                    fontWeight: 800,
                    fontSize: "0.5rem",
                    letterSpacing: "0.12em",
                    color: cat.textColor,
                  }}
                >
                  {cat.title}
                </span>
              </Link>
            );
          })}

          {/* 탭 아래 빈 공간 */}
          <div className="flex-1" />
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
//  서브 페이지 공통 헤딩
// ─────────────────────────────────────────────────────────
export function BinderHeading({
  emoji,
  title,
  subtitle,
  accentColor,
}: {
  emoji: string;
  title: string;
  subtitle?: string;
  accentColor: string;
}) {
  return (
    <div className="pt-5 pb-4">
      <div className="flex items-center gap-2 mb-[2px]">
        <span style={{ fontSize: "1.3rem", lineHeight: 1 }}>{emoji}</span>
        <h1
          className="text-white leading-none"
          style={{
            fontWeight: 800,
            fontSize: "1.5rem",
            letterSpacing: "0.08em",
            textShadow: `2px 2px 0 ${accentColor}, 0 0 18px ${accentColor}55`,
          }}
        >
          {title}
        </h1>
      </div>
      {subtitle && (
        <p
          style={{
            fontSize: "0.55rem",
            letterSpacing: "0.28em",
            color: accentColor,
            fontWeight: 400,
            opacity: 0.8,
          }}
        >
          {subtitle}
        </p>
      )}
      {/* 픽셀 구분선 */}
      <div className="flex gap-[3px] mt-3">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            style={{
              width: "5px",
              height: "4px",
              backgroundColor: i % 2 === 0 ? accentColor : "transparent",
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
//  준비중 플레이스홀더
// ─────────────────────────────────────────────────────────
export function ComingSoon({ accentColor }: { accentColor: string }) {
  return (
    <div
      className="flex flex-col items-center justify-center py-14 gap-3"
      style={{ color: "rgba(255,255,255,0.25)" }}
    >
      <div style={{ fontSize: "2.2rem" }}>🔭</div>
      <div
        style={{
          fontSize: "0.62rem",
          letterSpacing: "0.28em",
          color: accentColor,
          fontWeight: 700,
          opacity: 0.85,
        }}
      >
        COMING SOON
      </div>
      <div style={{ fontSize: "0.55rem", letterSpacing: "0.18em", fontWeight: 400 }}>
        준비 중입니다
      </div>
    </div>
  );
}
