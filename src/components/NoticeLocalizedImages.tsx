"use client";

import { useState } from "react";
import type { AnnouncementContentLine } from "@/data/announcements";

type NoticeLocalizedImagesProps = {
  itemId: string;
  sections: Array<{
    label: string;
    images: Array<{ src: string; alt: string }>;
    content?: AnnouncementContentLine[];
  }>;
  fallbackContent: AnnouncementContentLine[];
  /** 콘서트 다크 테마 (기본값: false = 라이트) */
  dark?: boolean;
};

const PIXEL_FONT: React.CSSProperties = {
  fontFamily: "'Mulmaru', 'PFStarDust', monospace",
  WebkitFontSmoothing: "none",
};

export function NoticeLocalizedImages({
  itemId,
  sections,
  fallbackContent,
  dark = false,
}: NoticeLocalizedImagesProps) {
  const defaultIndex = Math.max(
    0,
    sections.findIndex((section) => section.label === "한국어")
  );
  const [selectedIndex, setSelectedIndex] = useState(defaultIndex);
  const current = sections[selectedIndex];
  const currentContent = current.content ?? fallbackContent;

  if (!current) {
    return null;
  }

  if (dark) {
    /* ── 다크 테마 (콘서트 바인더용) ── */
    return (
      <div>
        {/* 언어 탭 */}
        <div style={{ display: "flex", gap: "4px", marginBottom: "12px", flexWrap: "wrap" }}>
          {sections.map((section, idx) => {
            const isActive = idx === selectedIndex;
            return (
              <button
                key={`${itemId}-tab-${section.label}`}
                type="button"
                onClick={() => setSelectedIndex(idx)}
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
                    backgroundColor: isActive ? "#8b7200" : "#3a2e00",
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
                    backgroundColor: isActive ? "#ffd700" : "rgba(255,215,0,0.08)",
                    border: `1.5px solid ${isActive ? "#ffd700" : "rgba(255,215,0,0.25)"}`,
                    borderRadius: "3px",
                    fontSize: "0.52rem",
                    fontWeight: 800,
                    letterSpacing: "0.1em",
                    color: isActive ? "#1a1100" : "rgba(255,215,0,0.55)",
                    boxShadow: isActive
                      ? "0 0 10px rgba(255,215,0,0.35), inset 0 1px 0 rgba(255,255,255,0.25)"
                      : "none",
                    transform: isActive ? "translateY(2px)" : "translateY(0)",
                    transition:
                      "transform 0.07s ease, background-color 0.15s, border-color 0.15s, color 0.15s, box-shadow 0.15s",
                    whiteSpace: "nowrap",
                  }}
                >
                  {section.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* 이미지 */}
        <div className="space-y-3">
          {current.images.map((image, idx) => (
            <div
              key={`${itemId}-${selectedIndex}-image-${idx}`}
              className="overflow-hidden"
              style={{ border: "1.5px solid rgba(255,215,0,0.3)" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image.src}
                alt={image.alt}
                className="h-auto w-full object-contain"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* 텍스트 */}
        <div
          className="mt-4 space-y-2"
          style={{
            fontSize: "0.68rem",
            lineHeight: 1.8,
            color: "rgba(255,255,255,0.9)",
          }}
        >
          {currentContent.map((line, idx) => {
            if (typeof line === "string") {
              return line.trim().length === 0 ? (
                <div key={`${itemId}-${selectedIndex}-spacer-${idx}`} className="h-2" aria-hidden />
              ) : (
                <p key={`${itemId}-${selectedIndex}-line-${idx}`}>{line}</p>
              );
            }
            return line.text.trim().length === 0 ? (
              <div key={`${itemId}-${selectedIndex}-spacer-${idx}`} className="h-2" aria-hidden />
            ) : (
              <p
                key={`${itemId}-${selectedIndex}-line-${idx}`}
                style={{
                  fontWeight: line.emphasis ? 700 : 400,
                  color: line.emphasis ? "#ffd700" : "rgba(255,255,255,0.9)",
                }}
              >
                {line.text}
              </p>
            );
          })}
        </div>
      </div>
    );
  }

  /* ── 라이트 테마 (기존 동작 유지) ── */
  return (
    <div className="mt-6">
      <div className="flex flex-wrap gap-2">
        {sections.map((section, idx) => (
          <button
            key={`${itemId}-tab-${section.label}`}
            type="button"
            onClick={() => setSelectedIndex(idx)}
            className={
              idx === selectedIndex
                ? "inline-flex items-center justify-center rounded-full bg-black px-4 py-2 text-xs font-semibold text-white"
                : "inline-flex items-center justify-center rounded-full border border-foreground/20 px-4 py-2 text-xs font-semibold text-foreground/70"
            }
          >
            {section.label}
          </button>
        ))}
      </div>

      <div className="mt-4 grid gap-4">
        {current.images.map((image, idx) => (
          <div key={`${itemId}-${selectedIndex}-image-${idx}`} className="overflow-hidden rounded-xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={image.src} alt={image.alt} className="h-auto w-full object-contain" loading="lazy" />
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-3 text-sm text-foreground/80">
        {currentContent.map((line, idx) => {
          if (typeof line === "string") {
            return line.trim().length === 0 ? (
              <div key={`${itemId}-${selectedIndex}-spacer-${idx}`} className="h-3" aria-hidden />
            ) : (
              <p key={`${itemId}-${selectedIndex}-line-${idx}`}>{line}</p>
            );
          }

          return line.text.trim().length === 0 ? (
            <div key={`${itemId}-${selectedIndex}-spacer-${idx}`} className="h-3" aria-hidden />
          ) : (
            <p
              key={`${itemId}-${selectedIndex}-line-${idx}`}
              className={line.emphasis ? "font-semibold" : undefined}
            >
              {line.text}
            </p>
          );
        })}
      </div>
    </div>
  );
}
