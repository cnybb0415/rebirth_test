"use client";

import { usePathname } from "next/navigation";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooterNav } from "@/components/SiteFooterNav";

export function ShellWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isQR = pathname.startsWith("/QR");

  if (isQR) {
    return <>{children}</>;
  }

  return (
    <>
      <SiteHeader />
      <div className="pb-24">{children}</div>
      <SiteFooterNav />
    </>
  );
}
