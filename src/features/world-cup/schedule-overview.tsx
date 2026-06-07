"use client";

import { Trophy } from "lucide-react";

import { AppProviders } from "@/components/providers/app-providers";
import { JsonLd } from "@/components/json-ld";
import { HeroCard } from "@/components/hero-card";
import { WCGamesPage } from "@/features/world-cup";
import type { WorldCupSchedulePayload } from "@/types/wc-match";

import { StyledPage, StyledStack } from "./styles";

type Props = {
  schedule: WorldCupSchedulePayload;
  websiteJsonLd: object;
};

export const WorldCupScheduleOverview = ({
  schedule,
  websiteJsonLd,
}: Props) => (
  <StyledPage>
    <JsonLd data={websiteJsonLd} />
    <StyledStack>
      <HeroCard
        badge={
          <>
            <Trophy aria-hidden="true" color="gold" />
            Fotbolls-VM 2026
          </>
        }
        title="Fotbolls-VM 2026 spelschema – matcher, tider och resultat"
        description="Se hela spelschemat för Fotbolls-VM 2026 med svenska tider"
      />

      <AppProviders>
        <WCGamesPage initialSchedule={schedule} heroTitleTag="h2" />
      </AppProviders>
    </StyledStack>
  </StyledPage>
);
