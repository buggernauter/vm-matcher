import { useQuery } from "@tanstack/react-query";

import {
  staticWcGroupTeamsByLabel,
  staticWcMatchDays,
} from "../dev-api/dev-wc";
import { fetchWorldCupSchedule } from "../lib/world-cup-api";
import type { WorldCupSchedulePayload } from "../types/wc-match";

const FALLBACK_SCHEDULE: WorldCupSchedulePayload = {
  groupTeamsByLabel: staticWcGroupTeamsByLabel,
  matchDays: staticWcMatchDays,
  source: "static",
  syncedAt: "",
};

export const worldCupFallbackSchedule = FALLBACK_SCHEDULE;

export const worldCupScheduleQueryKey = ["world-cup", "schedule"] as const;

const fetchWorldCupScheduleWithFallback = async () => {
  try {
    return await fetchWorldCupSchedule();
  } catch {
    return FALLBACK_SCHEDULE;
  }
};

export const useWorldCupSchedule = (initialData?: WorldCupSchedulePayload) =>
  useQuery({
    queryKey: worldCupScheduleQueryKey,
    queryFn: fetchWorldCupScheduleWithFallback,
    initialData,
    placeholderData: FALLBACK_SCHEDULE,
  });
