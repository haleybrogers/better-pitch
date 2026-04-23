import { EcosystemTimeline } from "@/components/EcosystemTimeline";
import { PortalDemo } from "@/components/PortalDemo";
import { CompetitorDM } from "@/components/CompetitorDM";

export default function HomePage() {
  return (
    <>
      <EcosystemTimeline />
      <PortalDemo />
      <CompetitorDM />
    </>
  );
}
