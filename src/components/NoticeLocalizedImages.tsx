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
};

export function NoticeLocalizedImages({ itemId, sections, fallbackContent }: NoticeLocalizedImagesProps) {
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
            <p key={`${itemId}-${selectedIndex}-line-${idx}`} className={line.emphasis ? "font-semibold" : undefined}>
              {line.text}
            </p>
          );
        })}
      </div>
    </div>
  );
}
