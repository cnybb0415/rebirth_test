import { BinderPage, BinderHeading, ComingSoon } from "@/components/concert/BinderPage";

export default function ConcertChorusPage() {
  return (
    <BinderPage activeTab="chorus">
      <BinderHeading
        emoji="🎵"
        title="떼창곡"
        subtitle="GROUP CHORUS"
        accentColor="#00e5ff"
      />
      <ComingSoon accentColor="#00e5ff" />
    </BinderPage>
  );
}
