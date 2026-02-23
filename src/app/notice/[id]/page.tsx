import { notFound } from "next/navigation";
import { announcements } from "@/data/announcements";
import { AnnouncementDetailActions } from "@/components/AnnouncementDetailActions";
import { TossActionButton } from "@/components/AnnouncementDetailActions";
import { NoticeLocalizedImages } from "@/components/NoticeLocalizedImages";

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
    <div className="min-h-screen bg-transparent text-foreground relative">
      <main className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">{item.title}</h1>
            <div className="mt-2 text-sm text-foreground/60">{item.date}</div>
          </div>
        </div>

        <section className="mt-6 rounded-2xl border border-foreground/10 bg-white p-6 shadow-sm">
          {item.localizedImages && item.localizedImages.length > 0 ? (
            <NoticeLocalizedImages itemId={item.id} sections={item.localizedImages} fallbackContent={item.content} />
          ) : null}
          {item.images && item.images.length > 0 ? (
            <div className="mt-6 grid gap-4">
              {item.images.map((image, idx) => (
                <div key={`${item.id}-image-${idx}`} className="overflow-hidden rounded-xl">
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
          {!item.localizedImages || item.localizedImages.length === 0 ? (
            <div className="mt-6 space-y-3 text-sm text-foreground/80">
              {item.content.map((line, idx) => {
                if (typeof line === "string") {
                  return line.trim().length === 0 ? (
                    <div key={`${item.id}-spacer-${idx}`} className="h-3" aria-hidden />
                  ) : (
                    <p key={`${item.id}-line-${idx}`}>{line}</p>
                  );
                }

                return line.text.trim().length === 0 ? (
                  <div key={`${item.id}-spacer-${idx}`} className="h-3" aria-hidden />
                ) : (
                  <p key={`${item.id}-line-${idx}`} className={line.emphasis ? "font-semibold" : undefined}>
                    {line.text}
                  </p>
                );
              })}
            </div>
          ) : null}
          {item.actions && item.actions.length > 0 ? (
            <div className="mt-6 flex flex-wrap gap-2">
              {item.actions.map((action, idx) => {
                if (action.label === "TOSS") {
                  return (
                    <TossActionButton key={`${item.id}-action-${idx}`} href={action.href} label={action.label} />
                  );
                }
                return (
                  <a
                    key={`${item.id}-action-${idx}`}
                    href={action.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-full bg-black px-4 py-2 text-xs font-semibold text-white transition hover:bg-black/90"
                  >
                    {action.label}
                  </a>
                );
              })}
            </div>
          ) : null}
        </section>

        {item.ticketLinks ? (
          <div className="mt-6 flex justify-end">
            <a
              href={item.ticketLinks.mobile}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-black px-4 py-2 text-xs font-semibold text-white transition hover:bg-black/90 sm:hidden"
            >
              멜론티켓 바로가기
            </a>
            <a
              href={item.ticketLinks.desktop}
              target="_blank"
              rel="noreferrer"
              className="hidden items-center justify-center rounded-full bg-black px-4 py-2 text-xs font-semibold text-white transition hover:bg-black/90 sm:inline-flex"
            >
              멜론티켓 바로가기
            </a>
          </div>
        ) : null}

        <AnnouncementDetailActions />
      {/* 입금 폼 작성 버튼 fixed at bottom right */}
      <a
        href="https://docs.google.com/forms/d/e/1FAIpQLSe5yBba1sPzJQsy2rBqOP5PU6BZDfw7XmmR-H3nrS7yhhopBw/viewform?usp=send_form"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 rounded-2xl border border-foreground/15 bg-white px-5 py-2.5 text-sm font-semibold text-foreground shadow-lg hover:border-foreground/35 hover:shadow-xl"
      >
        입금 폼 작성
      </a>
    </main>
    </div>
  );
}
