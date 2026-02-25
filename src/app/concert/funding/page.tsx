import { BinderPage, BinderHeading } from "@/components/concert/BinderPage";
import { PixelButton } from "@/components/concert/PixelButton";
import { FundingFormModal } from "@/components/concert/FundingFormModal";
import { NoticeLocalizedImages } from "@/components/NoticeLocalizedImages";
import { announcements } from "@/data/announcements";

const ACCENT = "#ffd700";

export default function ConcertFundingPage() {
  const notice = announcements.find((a) => a.id === "2");

  return (
    <BinderPage activeTab="funding">
      <BinderHeading
        emoji="💰"
        title="모금"
        subtitle="FUNDING"
        accentColor={ACCENT}
      />

      {notice ? (
        <div className="pb-6">
          {/* 날짜 */}
          <p
            style={{
              fontSize: "0.6rem",
              letterSpacing: "0.18em",
              color: `${ACCENT}bb`,
              marginBottom: "12px",
            }}
          >
            {notice.date}
          </p>

          {/* 로컬라이즈드 이미지 (언어별 탭) */}
          {notice.localizedImages && notice.localizedImages.length > 0 ? (
            <NoticeLocalizedImages
              itemId={notice.id}
              sections={notice.localizedImages}
              fallbackContent={notice.content}
              dark
            />
          ) : null}

          {/* 일반 이미지 (localizedImages 없을 때) */}
          {notice.images && notice.images.length > 0 && !notice.localizedImages?.length ? (
            <div className="space-y-3 mt-4">
              {notice.images.map((img, idx) => (
                <div
                  key={idx}
                  className="overflow-hidden"
                  style={{ border: `1.5px solid ${ACCENT}44` }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="h-auto w-full object-contain"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          ) : null}

          {/* TOSS / PAYPAL / 입금 폼 작성 — NoticeDetailPage처럼 */}
<div className="mt-5 flex flex-wrap items-end justify-between gap-3">
  <div className="flex flex-wrap gap-3">
    {notice.actions?.map((action, idx) => {
      if (action.label === "TOSS") {
        return (
          <PixelButton
            key={idx}
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
          key={idx}
          label={action.label}
          accentColor="#ffd700"
          shadowColor="#a37f00"
          textColor="#1a1100"
          href={action.href}
        />
      );
    })}
  </div>

  {/* 오른쪽 끝으로 */}
  <FundingFormModal />
</div>

          <div className="mt-6" style={{ borderTop: `1px solid ${ACCENT}22` }} />
        </div>
      ) : (
        <p
          style={{
            fontSize: "0.65rem",
            color: "rgba(255,255,255,0.3)",
            letterSpacing: "0.2em",
            paddingTop: "16px",
          }}
        >
          등록된 공지가 없습니다
        </p>
      )}
    </BinderPage>
  );
}
