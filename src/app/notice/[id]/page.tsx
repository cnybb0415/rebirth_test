import { notFound } from "next/navigation";
import { announcements } from "@/data/announcements";
import { AnnouncementDetailActions } from "@/components/AnnouncementDetailActions";
import { NoticeLocalizedImages } from "@/components/NoticeLocalizedImages";
import { BinderPage, BinderHeading } from "@/components/concert/BinderPage";
import { PixelButton } from "@/components/concert/PixelButton";
import { FundingFormModal } from "@/components/concert/FundingFormModal";
import Link from "next/link";

const ACCENT = "#ffd700";

export default async function NoticeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = announcements.find((entry) => entry.id === id);

  if (!item) {
    notFound();
  }

  return (
    <BinderPage activeTab="notice">
      <div className="pt-1 pb-6">
        <BinderHeading
          emoji="📋"
          title={item.title}
          subtitle={item.date}
          accentColor={ACCENT}
          showEmoji={false}
        />

        <Link
          href="/concert/notice"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "4px",
            fontSize: "0.55rem",
            letterSpacing: "0.2em",
            color: "rgba(255,215,0,0.7)",
            fontWeight: 700,
            marginBottom: "16px",
          }}
        >
          ← 목록
        </Link>

        {/* 로컬라이즈드 이미지 */}
        {item.localizedImages && item.localizedImages.length > 0 ? (
          <NoticeLocalizedImages
            itemId={item.id}
            sections={item.localizedImages}
            fallbackContent={item.content}
            dark
          />
        ) : null}

        {/* 일반 이미지 */}
        {item.images && item.images.length > 0 ? (
          <div className="mt-4 space-y-3">
            {item.images.map((image, idx) => (
              <div
                key={`${item.id}-image-${idx}`}
                className="overflow-hidden"
                style={{ border: `1.5px solid ${ACCENT}44` }}
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
        ) : null}

        {/* 텍스트 본문 (localizedImages 없을 때) */}
        {(!item.localizedImages || item.localizedImages.length === 0) ? (
          <div
            className="space-y-2"
            style={{ fontSize: "0.72rem", lineHeight: 1.9, color: "rgba(255,255,255,0.9)" }}
          >
            {item.content.map((line, idx) => {
              if (typeof line === "string") {
                return line.trim().length === 0 ? (
                  <div key={`${item.id}-spacer-${idx}`} className="h-2" aria-hidden />
                ) : (
                  <p key={`${item.id}-line-${idx}`}>{line}</p>
                );
              }
              return line.text.trim().length === 0 ? (
                <div key={`${item.id}-spacer-${idx}`} className="h-2" aria-hidden />
              ) : (
                <p
                  key={`${item.id}-line-${idx}`}
                  style={{
                    fontWeight: line.emphasis ? 700 : 400,
                    color: line.emphasis ? ACCENT : "rgba(255,255,255,0.9)",
                  }}
                >
                  {line.text}
                </p>
              );
            })}
          </div>
        ) : null}

        {/* 액션 버튼 (TOSS / PAYPAL 픽셀 버튼) */}
        {item.actions && item.actions.length > 0 ? (
          <div className="mt-5 flex flex-wrap items-end justify-between gap-3">
            <div className="flex flex-wrap gap-3">
              {item.actions.map((action, idx) => {
                if (action.label === "TOSS") {
                  return (
                    <PixelButton
                      key={`${item.id}-action-${idx}`}
                      label="TOSS"
                      accentColor="#00c4db"
                      shadowColor="#008899"
                      textColor="#001a1f"
                      href={action.href}
                      isToss
                    />
                  );
                }
                return (
                  <PixelButton
                    key={`${item.id}-action-${idx}`}
                    label={action.label}
                    accentColor="#ffd700"
                    shadowColor="#a37f00"
                    textColor="#1a1100"
                    href={action.href}
                  />
                );
              })}
            </div>
            <FundingFormModal />
          </div>
        ) : null}

        {/* 티켓 링크 */}
        {item.ticketLinks ? (
          <div className="mt-4 flex justify-end">
            <PixelButton
              label="멜론티켓 바로가기"
              accentColor="#00e5ff"
              shadowColor="#008899"
              textColor="#001a1f"
              href={item.ticketLinks.mobile}
            />
          </div>
        ) : null}

        <div
          className="mt-5"
          style={{ borderTop: `1px solid ${ACCENT}22`, paddingTop: "4px" }}
        >
          <AnnouncementDetailActions />
        </div>
      </div>
    </BinderPage>
  );
}
