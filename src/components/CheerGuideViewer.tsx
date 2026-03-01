"use client";

import { useState } from "react";
import type { LangKey, CheeringSongAsset } from "@/lib/cheering-types";
import { LANG_LABELS } from "@/lib/cheering-types";

const ACCENT = "#ff4d8d";

const PIXEL_FONT: React.CSSProperties = {
  fontFamily: "'Mulmaru', 'PFStarDust', monospace",
  WebkitFontSmoothing: "none",
};

interface Props {
  guideByLang: Record<LangKey, CheeringSongAsset[]>;
  songLabel: string;
}

const LANG_ORDER: LangKey[] = ["ko", "en", "cn", "jp"];

export function CheerGuideViewer({ guideByLang, songLabel }: Props) {
  // 파일이 있는 언어만 추출
  const availableLangs = LANG_ORDER.filter((l) => guideByLang[l].length > 0);

  const [activeLang, setActiveLang] = useState<LangKey>(
    availableLangs[0] ?? "ko"
  );

  if (availableLangs.length === 0) {
    return (
      <div
        style={{
          padding: "24px",
          border: `1.5px dashed ${ACCENT}44`,
          textAlign: "center",
          fontSize: "0.6rem",
          letterSpacing: "0.25em",
          color: "rgba(255,255,255,0.3)",
          fontWeight: 700,
          ...PIXEL_FONT,
        }}
      >
        COMING SOON
      </div>
    );
  }

  const assets = guideByLang[activeLang];

  return (
    <div>
      {/* ── 언어 탭 버튼 ── */}
      {availableLangs.length > 1 && (
        <div
          style={{
            display: "flex",
            gap: "4px",
            marginBottom: "12px",
            flexWrap: "wrap",
          }}
        >
          {availableLangs.map((lang) => {
            const isActive = activeLang === lang;
            return (
              <button
                key={lang}
                type="button"
                onClick={() => setActiveLang(lang)}
                style={{
                  position: "relative",
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                  padding: 0,
                  paddingBottom: isActive ? "2px" : "4px",
                  ...PIXEL_FONT,
                }}
              >
                {/* 버튼 그림자 */}
                <span
                  aria-hidden
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: "2px",
                    right: "2px",
                    height: isActive ? "2px" : "4px",
                    backgroundColor: isActive ? "#8b1a3a" : "#3a0818",
                    borderRadius: "1px 1px 3px 3px",
                    transition: "height 0.07s ease",
                  }}
                />
                {/* 버튼 면 */}
                <span
                  style={{
                    position: "relative",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "4px 10px",
                    backgroundColor: isActive ? ACCENT : "rgba(255,77,141,0.08)",
                    border: `1.5px solid ${isActive ? ACCENT : ACCENT + "44"}`,
                    borderRadius: "3px",
                    fontSize: "0.52rem",
                    fontWeight: 800,
                    letterSpacing: "0.1em",
                    color: isActive ? "#1a0010" : `${ACCENT}88`,
                    boxShadow: isActive
                      ? `0 0 10px ${ACCENT}55, inset 0 1px 0 rgba(255,255,255,0.25)`
                      : "none",
                    transform: isActive ? "translateY(2px)" : "translateY(0)",
                    transition:
                      "transform 0.07s ease, background-color 0.15s, border-color 0.15s, color 0.15s, box-shadow 0.15s",
                    whiteSpace: "nowrap",
                  }}
                >
                  {LANG_LABELS[lang]}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* ── 가이드 이미지 ── */}
      <div className="space-y-3">
        {assets.map((asset, idx) => (
          <div
            key={`${activeLang}-${idx}`}
            className="overflow-hidden"
            style={{ border: `1.5px solid ${ACCENT}55` }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={asset.src}
              alt={asset.alt ?? `${songLabel} 응원법`}
              className="h-auto w-full"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
