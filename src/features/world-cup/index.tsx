import { Trophy } from "lucide-react";

import { AppProviders } from "@/components/providers/app-providers";
import { JsonLd } from "@/components/json-ld";
import { HeroCard } from "@/components/hero-card";
import { WorldCupSchedule } from "@/features/world-cup/world-cup-schedule";
import type { WorldCupSchedulePayload } from "@/types/wc-match";

type Props = {
  schedule: WorldCupSchedulePayload;
  websiteJsonLd: object;
};

export const WorldCupScheduleContainer = ({
  schedule,
  websiteJsonLd,
}: Props) => (
  <>
    <JsonLd data={websiteJsonLd} />
    <HeroCard
      badge={
        <>
          <Trophy aria-hidden="true" color="gold" />
          Fotbolls-VM 2026
        </>
      }
      title="Fotbolls-VM 2026 spelschema – matcher och tider"
      description="Se hela spelschemat för Fotbolls-VM 2026 med svenska tider"
    />

    <AppProviders>
      <WorldCupSchedule initialSchedule={schedule} heroTitleTag="h2" />
    </AppProviders>
  </>
);
