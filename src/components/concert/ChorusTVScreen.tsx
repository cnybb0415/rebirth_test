"use client";

import { useState } from "react";

const ACCENT = "#00e5ff";

const PIXEL_FONT: React.CSSProperties = {
  fontFamily: "'Mulmaru', 'PFStarDust', monospace",
  WebkitFontSmoothing: "none",
};

const DAYS = [
  { label: "DAY 1", videoId: "fphhWhG-INs" },
  { label: "DAY 2", videoId: "5-UJytXbaaU" },
  { label: "DAY 3", videoId: "6SBvwaQKHXc" },
] as const;

type DayIdx = 0 | 1 | 2;

export function ChorusTVScreen() {
  const [selectedDay, setSelectedDay] = useState<DayIdx | null>(null);
  const [pressed, setPressed] = useState<DayIdx | null>(null);

  const embedUrl =
    selectedDay !== null
      ? `https://www.youtube.com/embed/${DAYS[selectedDay].videoId}?autoplay=1&rel=0`
      : null;

  return (
    <>
      {/* Keyframe for pulsing START text */}
      <style>{`
        @keyframes chorus-pulse {
          0%, 100% { opacity: 1; text-shadow: 0 0 20px ${ACCENT}, 0 0 40px ${ACCENT}88; }
          50% { opacity: 0.65; text-shadow: 0 0 8px ${ACCENT}66; }
        }
        @keyframes chorus-blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
      `}</style>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "14px",
          padding: "4px 0 8px",
        }}
      >
        {/* ══ TV Frame ══ */}
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "560px",
            background: "linear-gradient(160deg, #0d1220 0%, #080d18 100%)",
            border: `2.5px solid ${ACCENT}55`,
            borderRadius: "14px",
            boxShadow: `0 0 32px ${ACCENT}22, 0 12px 48px rgba(0,0,0,0.85), inset 0 1px 0 rgba(0,229,255,0.08)`,
            padding: "14px 14px 10px",
          }}
        >
          {/* Corner bracket decorations */}
          {(
            [
              { top: "7px", left: "7px", bT: true, bL: true },
              { top: "7px", right: "7px", bT: true, bR: true },
              { bottom: "7px", left: "7px", bB: true, bL: true },
              { bottom: "7px", right: "7px", bB: true, bR: true },
            ] as const
          ).map((pos, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                width: "8px",
                height: "8px",
                ...(pos.top !== undefined ? { top: pos.top } : {}),
                ...(pos.bottom !== undefined ? { bottom: pos.bottom } : {}),
                ...(pos.left !== undefined ? { left: pos.left } : {}),
                ...(pos.right !== undefined ? { right: pos.right } : {}),
                borderTop: pos.bT ? `2px solid ${ACCENT}` : "none",
                borderBottom: pos.bB ? `2px solid ${ACCENT}` : "none",
                borderLeft: pos.bL ? `2px solid ${ACCENT}` : "none",
                borderRight: pos.bR ? `2px solid ${ACCENT}` : "none",
              }}
            />
          ))}

          {/* Header bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <span
              style={{
                ...PIXEL_FONT,
                fontSize: "clamp(0.38rem, 1.1vw, 0.46rem)",
                letterSpacing: "0.28em",
                color: `${ACCENT}99`,
              }}
            >
              ■ SING-ALONG CH.
            </span>
            <span
              style={{
                ...PIXEL_FONT,
                fontSize: "clamp(0.32rem, 0.9vw, 0.4rem)",
                letterSpacing: "0.18em",
                color: `${ACCENT}44`,
              }}
            >
              EXhOrizon
            </span>
          </div>

          {/* ── Screen ── */}
          <div
            style={{
              position: "relative",
              width: "100%",
              paddingTop: "56.25%", // 16:9 aspect ratio
              background: "#030810",
              borderRadius: "6px",
              border: `2px solid ${ACCENT}33`,
              boxShadow: `inset 0 0 60px rgba(0,229,255,0.06), inset 0 0 2px ${ACCENT}22`,
              overflow: "hidden",
            }}
          >
            {/* Scanlines overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.1) 3px, rgba(0,0,0,0.1) 4px)",
                zIndex: 3,
                pointerEvents: "none",
              }}
            />

            {/* CRT vignette */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.55) 100%)",
                zIndex: 2,
                pointerEvents: "none",
              }}
            />

            {/* Content */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1,
              }}
            >
              {selectedDay === null ? (
                /* ── Idle / Start Screen ── */
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "clamp(6px, 1.5vw, 12px)",
                    padding: "16px",
                  }}
                >
                  <span
                    style={{
                      ...PIXEL_FONT,
                      fontSize: "clamp(0.9rem, 4vw, 1.7rem)",
                      fontWeight: 800,
                      color: ACCENT,
                      letterSpacing: "0.2em",
                      animation: "chorus-pulse 2.2s ease-in-out infinite",
                    }}
                  >
                    ▶&nbsp;START
                  </span>

                  <span
                    style={{
                      ...PIXEL_FONT,
                      fontSize: "clamp(0.42rem, 1.5vw, 0.62rem)",
                      letterSpacing: "0.22em",
                      color: `${ACCENT}cc`,
                    }}
                  >
                    ARE YOU READY?
                  </span>

                  <span
                    style={{
                      ...PIXEL_FONT,
                      fontSize: "clamp(0.32rem, 0.9vw, 0.42rem)",
                      letterSpacing: "0.14em",
                      color: `${ACCENT}44`,
                      marginTop: "6px",
                      animation: "chorus-blink 1.4s step-end infinite",
                    }}
                  >
                    SELECT DAY ↓
                  </span>
                </div>
              ) : (
                /* ── YouTube Embed ── */
                <iframe
                  key={selectedDay}
                  src={embedUrl!}
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    border: "none",
                  }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  title={`EXhOrizon ${DAYS[selectedDay].label} Sing-Along`}
                />
              )}
            </div>
          </div>

          {/* ── Bottom controls ── */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: "8px",
            }}
          >
            {/* Power indicator */}
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <div
                style={{
                  width: "5px",
                  height: "5px",
                  borderRadius: "50%",
                  backgroundColor:
                    selectedDay !== null ? ACCENT : `${ACCENT}33`,
                  boxShadow:
                    selectedDay !== null ? `0 0 5px ${ACCENT}` : "none",
                  transition: "background-color 0.3s, box-shadow 0.3s",
                }}
              />
              <span
                style={{
                  ...PIXEL_FONT,
                  fontSize: "0.35rem",
                  letterSpacing: "0.14em",
                  color: `${ACCENT}44`,
                }}
              >
                PWR
              </span>
            </div>

            {/* Back button */}
            {selectedDay !== null && (
              <button
                type="button"
                onClick={() => setSelectedDay(null)}
                style={{
                  background: "none",
                  border: `1px solid ${ACCENT}44`,
                  color: `${ACCENT}77`,
                  cursor: "pointer",
                  ...PIXEL_FONT,
                  fontSize: "0.36rem",
                  letterSpacing: "0.14em",
                  padding: "3px 8px",
                  borderRadius: "2px",
                  transition: "border-color 0.1s, color 0.1s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor =
                    ACCENT;
                  (e.currentTarget as HTMLButtonElement).style.color = ACCENT;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = `${ACCENT}44`;
                  (e.currentTarget as HTMLButtonElement).style.color = `${ACCENT}77`;
                }}
              >
                ◀ BACK
              </button>
            )}

            {/* Channel dots */}
            <div style={{ display: "flex", gap: "3px" }}>
              {DAYS.map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: "4px",
                    height: "4px",
                    borderRadius: "50%",
                    backgroundColor:
                      selectedDay === i ? ACCENT : `${ACCENT}22`,
                    boxShadow: selectedDay === i ? `0 0 4px ${ACCENT}` : "none",
                    transition: "background-color 0.2s",
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ══ DAY Selector Buttons ══ */}
        <div
          style={{
            display: "flex",
            gap: "clamp(6px, 2vw, 10px)",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {DAYS.map((day, i) => {
            const idx = i as DayIdx;
            const isActive = selectedDay === idx;
            const isPressed = pressed === idx;

            return (
              <button
                key={i}
                type="button"
                onPointerDown={() => setPressed(idx)}
                onPointerUp={() => {
                  setPressed(null);
                  setSelectedDay(idx);
                }}
                onPointerLeave={() => setPressed(null)}
                onPointerCancel={() => setPressed(null)}
                style={{
                  position: "relative",
                  display: "inline-flex",
                  flexDirection: "column",
                  alignItems: "stretch",
                  cursor: "pointer",
                  border: "none",
                  background: "none",
                  padding: 0,
                  paddingBottom: isPressed ? "1px" : "4px",
                  ...PIXEL_FONT,
                }}
              >
                {/* base shadow */}
                <span
                  aria-hidden
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: "2px",
                    right: "2px",
                    height: isPressed ? "1px" : "4px",
                    backgroundColor: isActive ? "#00808f" : "#003340",
                    borderRadius: "2px 2px 4px 4px",
                    transition: "height 0.07s ease",
                  }}
                />
                {/* face */}
                <span
                  style={{
                    position: "relative",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "clamp(4px, 1vw, 6px) clamp(10px, 3vw, 16px)",
                    minWidth: "clamp(52px, 15vw, 68px)",
                    backgroundColor: isActive ? ACCENT : "#081520",
                    border: `2px solid ${isActive ? ACCENT : ACCENT + "44"}`,
                    borderRadius: "4px",
                    boxShadow: isActive
                      ? `0 0 16px ${ACCENT}66, inset 0 2px 0 rgba(255,255,255,0.3), inset 2px 0 0 rgba(255,255,255,0.1)`
                      : "inset 0 2px 0 rgba(255,255,255,0.04)",
                    transform: isPressed ? "translateY(3px)" : "translateY(0)",
                    transition:
                      "transform 0.07s ease, background-color 0.15s, box-shadow 0.15s, border-color 0.15s",
                    fontSize: "clamp(0.46rem, 1.4vw, 0.58rem)",
                    fontWeight: 800,
                    letterSpacing: "0.1em",
                    color: isActive ? "#001a1f" : `${ACCENT}88`,
                    whiteSpace: "nowrap",
                  }}
                >
                  {day.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
