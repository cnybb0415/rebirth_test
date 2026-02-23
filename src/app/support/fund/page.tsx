import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { TossActionButton } from "@/components/AnnouncementDetailActions";

export default function SupportFundPage() {
  return (
    <div className="min-h-screen bg-transparent text-foreground">
      <main className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
        <h1 className="text-2xl font-bold">모금공지</h1>

        <div className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>모금 공지</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-hidden rounded-2xl border border-foreground/10 bg-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/support/fund/%EB%AA%A8%EA%B8%88%EA%B3%B5%EC%A7%80.png"
                  alt="모금공지"
                  className="h-auto w-full"
                  loading="lazy"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 flex flex-wrap gap-2 justify-between">
          <div className="flex gap-2">
            {/* TOSS Button */}
            <TossActionButton href="supertoss://send?bank=토스뱅크&accountNo=100159180057" label="TOSS" />
            {/* PAYPAL Button */}
            <a
              href="https://paypal.me/EXOREBIRTH"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-black px-4 py-2 text-xs font-semibold text-white transition hover:bg-black/90"
            >
              PAYPAL
            </a>
          </div>
          {/* 입금 폼 작성 Button */}
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSe5yBba1sPzJQsy2rBqOP5PU6BZDfw7XmmR-H3nrS7yhhopBw/viewform?usp=send_form"
            target="_blank"
            rel="noreferrer"
            className="rounded-2xl border border-foreground/15 bg-white px-5 py-2.5 text-sm font-semibold text-foreground shadow-sm hover:border-foreground/35 hover:shadow-md"
          >
            입금 폼 작성
          </a>
        </div>
      </main>
    </div>
  );
}
