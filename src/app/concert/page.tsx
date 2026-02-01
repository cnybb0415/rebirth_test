import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export default function ConcertPage() {
  return (
    <div className="min-h-screen bg-transparent text-foreground">
      <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="flex items-end justify-between gap-4">
          <div className="min-w-0">
            <h1 className="text-2xl font-bold">콘서트</h1>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <Link href="/cheer" className="block">
            <Card className="transition hover:shadow-md">
              <CardContent className="flex items-center justify-between gap-3 p-4">
                <div className="text-sm font-semibold">응원법</div>
                <span className="text-foreground/60" aria-hidden>
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </CardContent>
            </Card>
          </Link>
          <Link href="/notice" className="block">
            <Card className="transition hover:shadow-md">
              <CardContent className="flex items-center justify-between gap-3 p-4">
                <div className="text-sm font-semibold">공지사항</div>
                <span className="text-foreground/60" aria-hidden>
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </CardContent>
            </Card>
          </Link>
        </div>
      </main>
    </div>
  );
}
