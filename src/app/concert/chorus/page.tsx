import { BinderPage, BinderHeading } from "@/components/concert/BinderPage";
import { ChorusTVScreen } from "@/components/concert/ChorusTVScreen";

export default function ConcertChorusPage() {
  return (
    <BinderPage activeTab="chorus" pixelFontFamily="'Mulmaru', 'PFStarDust', monospace">
      <BinderHeading
        emoji="🎵"
        title="떼창곡"
        subtitle="SING-ALONG"
        accentColor="#00e5ff"
      />
      <ChorusTVScreen />
    </BinderPage>
  );
}
