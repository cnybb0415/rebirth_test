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
  fontFamily: "'PFStarDust', monospace",
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
        <div className="flex flex-wrap gap-[6px] mb-4">
          {sections.map((section, idx) => (
            <button
              key={`${itemId}-tab-${section.label}`}
              type="button"
              onClick={() => setSelectedIndex(idx)}
              style={{
                ...PIXEL_FONT,
                fontSize: "0.5rem",
                fontWeight: 800,
                letterSpacing: "0.1em",
                padding: "4px 10px",
                border:
                  idx === selectedIndex
                    ? "1.5px solid #ffd700"
                    : "1.5px solid rgba(255,215,0,0.25)",
                backgroundColor:
                  idx === selectedIndex ? "#ffd700" : "transparent",
                color:
                  idx === selectedIndex
                    ? "#1a1100"
                    : "rgba(255,215,0,0.6)",
                cursor: "pointer",
                transition: "all 0.1s",
              }}
            >
              {section.label}
            </button>
          ))}
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
