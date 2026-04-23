import { EcosystemTimeline } from "@/components/EcosystemTimeline";
import { StaticsGallery } from "@/components/StaticsGallery";
import { PortalDemo } from "@/components/PortalDemo";

export default function HomePage() {
  return (
    <>
      <EcosystemTimeline />
      <StaticsGallery />
      <PortalDemo />
    </>
  );
}
