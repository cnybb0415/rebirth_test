import { BinderPage, BinderHeading, ComingSoon } from "@/components/concert/BinderPage";

export default function ConcertHelperPage() {
  return (
    <BinderPage activeTab="helper">
      <BinderHeading
        emoji="🛸"
        title="헬퍼모집"
        subtitle="HELPER RECRUIT"
        accentColor="#b97fff"
      />
      <ComingSoon accentColor="#b97fff" />
    </BinderPage>
  );
}
