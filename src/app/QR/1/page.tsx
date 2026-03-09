import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "오프닝 떼창 - 월광 | EXO RE:BIRTH",
};

export default function QR1Page() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="mx-auto w-full max-w-2xl px-4 py-10 sm:px-6">
        <div className="rounded-2xl border border-foreground/10 bg-white p-6 shadow-sm">
          <div className="mb-5 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-foreground/40">오프닝 떼창</p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-foreground">월광</h1>
          </div>
          <div className="overflow-hidden rounded-xl border border-foreground/10">
            <Image
              src="/images/QR/월광.png"
              alt="오프닝 떼창 월광 안내"
              width={800}
              height={1200}
              className="w-full h-auto"
              priority
            />
          </div>
        </div>
      </main>
    </div>
  );
}
