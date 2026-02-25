import { BinderPage, BinderHeading, ComingSoon } from "@/components/concert/BinderPage";

export default function ConcertChorusPage() {
  return (
    <BinderPage activeTab="chorus">
      <BinderHeading
        emoji="🎵"
        title="??????"
        subtitle="??????"
        accentColor="#00e5ff"
      />
      <ComingSoon accentColor="#00e5ff" />
    </BinderPage>
  );
}
