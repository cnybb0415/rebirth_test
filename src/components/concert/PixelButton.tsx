"use client";

import { useState } from "react";

const PIXEL_FONT: React.CSSProperties = {
  fontFamily: "'PFStarDust', monospace",
  WebkitFontSmoothing: "none",
};

interface PixelButtonProps {
  label: string;
  /** 버튼 면(face) 색상 */
  accentColor: string;
  /** 버튼 아래 그림자(base) 색상 — accentColor보다 어둡게 */
  shadowColor: string;
  textColor?: string;
  /** 일반 링크 */
  href?: string;
  /** Toss 딥링크 특수 처리 */
  isToss?: boolean;
  /** 링크 대신 클릭 핸들러 */
  onClick?: () => void;
}

export function PixelButton({
  label,
  accentColor,
  shadowColor,
  textColor = "#ffffff",
  href,
  isToss = false,
  onClick,
}: PixelButtonProps) {
  const [pressed, setPressed] = useState(false);

  const handleAction = () => {
    if (isToss && href) {
      try {
        window.location.href = href;
        setTimeout(() => {
          window.location.href = "supertoss://send?";
        }, 2000);
      } catch {
        window.location.href = "supertoss://send?";
      }
    } else if (href) {
      window.open(href, "_blank", "noreferrer");
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <button
      type="button"
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => {
        setPressed(false);
        handleAction();
      }}
      onPointerLeave={() => setPressed(false)}
      onPointerCancel={() => setPressed(false)}
      style={{
        position: "relative",
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "stretch",
        cursor: "pointer",
        userSelect: "none",
        border: "none",
        background: "none",
        padding: 0,
        /* 버튼 base 높이만큼 아래 여백 확보 */
        paddingBottom: "5px",
        ...PIXEL_FONT,
      }}
    >
      {/* ── base (3D 받침대) ── */}
      <span
        aria-hidden
        style={{
          position: "absolute",
          bottom: 0,
          left: "2px",
          right: "2px",
          height: pressed ? "2px" : "5px",
          backgroundColor: shadowColor,
          borderRadius: "3px 3px 4px 4px",
          transition: "height 0.07s ease",
        }}
      />

      {/* ── 버튼 face ── */}
      <span
        style={{
          position: "relative",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "7px 18px",
          minWidth: "64px",
          backgroundColor: accentColor,
          border: "2px solid rgba(0,0,0,0.35)",
          borderRadius: "4px",
          /* 위쪽 하이라이트 + 왼쪽 하이라이트 (pixel art 3D) */
          boxShadow:
            "inset 0 2px 0 rgba(255,255,255,0.35), inset 2px 0 0 rgba(255,255,255,0.15), inset 0 -1px 0 rgba(0,0,0,0.2)",
          transform: pressed ? "translateY(3px)" : "translateY(0px)",
          transition: "transform 0.07s ease",
          fontSize: "0.6rem",
          fontWeight: 800,
          letterSpacing: "0.12em",
          color: textColor,
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </span>
    </button>
  );
}
