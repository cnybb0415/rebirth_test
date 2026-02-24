import { BinderPage } from "@/components/concert/BinderPage";

// ─────────────────────────────────────────────────────────
//  콘서트 정보 — 여기서 수정하세요 (README 참고)
// ─────────────────────────────────────────────────────────
const CONCERT = {
  /** 아티스트명 */
  artist: "ARTIST: EXO",
  /** 콘서트 타이틀 (큰 글씨) */
  title: "EXO PLANET #6 - EXhOrizon",
  /** 부제목 / 투어명 */
  subtitle: "in SEOUL",
  /** 날짜 */
  date: "2026. 04. 10(금) - 12(일)",
  /** 요일 */
  day:"",
  /** 시간 */
  time:"",
  /** 공연장 */
  venue: "KSPO DOME",
  /** 공연장 상세 (선택) */
  venueDetail: "",
  /**
   * 단체사진 파일명
   * public/images/concert/design/ 폴더에 이미지를 넣고 파일명을 입력하세요.
   * 없으면 null → 플레이스홀더 표시
   * 예: "main-photo.jpg"
   */
  photo: "diary_main.png" as string | null,
};

// 장식용 스티커 이모지 (위치: 사진 주변)
const STICKERS = ["✨", "★", "💫", "★", "✨", "⭐", "★", "💫"];

export default function ConcertPage() {
  return (
    <BinderPage>
      <div className="pt-5 pb-8">

        {/* ── 아티스트명 ── */}
        <p
          className="text-white/50 mb-1"
          style={{ fontSize: "0.65rem", fontWeight: 400, letterSpacing: "0.2em" }}
        >
          {CONCERT.artist}
        </p>

        {/* ── 콘서트 타이틀 ── */}
        <h1
          className="text-white leading-[1.05] mb-1 whitespace-pre-line"
          style={{
            fontWeight: 800,
            fontSize: "2.5rem",
            letterSpacing: "0.06em",
            textShadow:
              "2px 2px 0 #00e5ff, 4px 4px 0 rgba(0,229,255,0.2), 0 0 28px rgba(0,229,255,0.4)",
          }}
        >
          {CONCERT.title}
        </h1>

        {/* ── 부제목 ── */}
        <div
          className="inline-block mb-4 px-3 py-[3px]"
          style={{
            border: "2px solid rgba(0,229,255,0.5)",
            fontSize: "0.75rem",
            fontWeight: 700,
            letterSpacing: "0.25em",
            color: "#00e5ff",
          }}
        >
          {CONCERT.subtitle}
        </div>

        {/* ── 픽셀 구분선 ── */}
        <div className="flex gap-[4px] mb-5">
          {Array.from({ length: 16 }).map((_, i) => (
            <div
              key={i}
              style={{
                width: "6px",
                height: "6px",
                backgroundColor: i % 2 === 0 ? "#00e5ff" : "transparent",
              }}
            />
          ))}
        </div>

        {/* ── 인포 카드 2열 ── */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          {/* DATE 카드 */}
          <div
            style={{
              border: "3px solid #00e5ff",
              background: "rgba(0,0,0,0.5)",
              padding: "8px 10px",
            }}
          >
            <div
              style={{
                fontSize: "0.5rem",
                fontWeight: 700,
                letterSpacing: "0.35em",
                color: "#00e5ff",
                marginBottom: "5px",
              }}
            >
              DATE
            </div>
            <div className="text-white" style={{ fontSize: "0.78rem", fontWeight: 400 }}>
              {CONCERT.date}
            </div>
            <div
              className="text-white/70"
              style={{ fontSize: "0.65rem", fontWeight: 400, marginTop: "2px" }}
            >
              {CONCERT.day}&nbsp;&nbsp;{CONCERT.time}
            </div>
          </div>

          {/* VENUE 카드 */}
          <div
            style={{
              border: "3px solid #ffd700",
              background: "rgba(0,0,0,0.5)",
              padding: "8px 10px",
            }}
          >
            <div
              style={{
                fontSize: "0.5rem",
                fontWeight: 700,
                letterSpacing: "0.35em",
                color: "#ffd700",
                marginBottom: "5px",
              }}
            >
              VENUE
            </div>
            <div className="text-white" style={{ fontSize: "0.78rem", fontWeight: 400 }}>
              {CONCERT.venue}
            </div>
            {CONCERT.venueDetail && (
              <div
                className="text-white/60"
                style={{ fontSize: "0.6rem", fontWeight: 400, marginTop: "2px" }}
              >
                {CONCERT.venueDetail}
              </div>
            )}
          </div>
        </div>

        {/* ── 사진 영역 ── */}
        <div
          className="relative w-full overflow-hidden mb-4"
          style={{ height: "185px" }}
        >
          {/* 코너 브래킷 */}
          {(
            [
              { top: 0, left: 0, borderTop: "3px solid #00e5ff", borderLeft: "3px solid #00e5ff" },
              { top: 0, right: 0, borderTop: "3px solid #00e5ff", borderRight: "3px solid #00e5ff" },
              { bottom: 0, left: 0, borderBottom: "3px solid #00e5ff", borderLeft: "3px solid #00e5ff" },
              { bottom: 0, right: 0, borderBottom: "3px solid #00e5ff", borderRight: "3px solid #00e5ff" },
            ] as React.CSSProperties[]
          ).map((style, i) => (
            <div
              key={i}
              aria-hidden
              className="absolute z-10"
              style={{ ...style, width: "18px", height: "18px" }}
            />
          ))}

          {CONCERT.photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={`/images/concert/design/${CONCERT.photo}`}
              alt="Concert photo"
              className="w-full h-full object-cover"
            />
          ) : (
            /* 플레이스홀더 */
            <div
              className="w-full h-full flex flex-col items-center justify-center gap-2"
              style={{
                border: "2px dashed rgba(255,255,255,0.15)",
                background: "rgba(0,229,255,0.03)",
              }}
            >
              <span style={{ fontSize: "2rem", opacity: 0.35 }}>📸</span>
              <span
                style={{
                  fontSize: "0.55rem",
                  letterSpacing: "0.3em",
                  color: "rgba(255,255,255,0.25)",
                  fontWeight: 400,
                }}
              >
                PHOTO HERE
              </span>
              <span
                style={{
                  fontSize: "0.5rem",
                  letterSpacing: "0.1em",
                  color: "rgba(255,255,255,0.15)",
                  fontWeight: 400,
                }}
              >
                README 참고
              </span>
            </div>
          )}
        </div>

        {/* ── 픽셀 스티커 줄 ── */}
        <div
          className="flex justify-center gap-2 mb-5"
          style={{ fontSize: "0.85rem" }}
          aria-hidden
        >
          {STICKERS.map((s, i) => (
            <span key={i} style={{ opacity: i % 2 === 0 ? 0.9 : 0.5 }}>
              {s}
            </span>
          ))}
        </div>

        {/* ── 하단 장식 ── */}
        <div
          className="mt-8 text-center"
          style={{
            fontSize: "0.6rem",
            letterSpacing: "0.4em",
            color: "rgba(255,255,255,0.18)",
            fontWeight: 400,
          }}
        >
          ★ · · · · · · ★
        </div>
      </div>
    </BinderPage>
  );
}
