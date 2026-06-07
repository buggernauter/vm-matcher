import type { WorldCupSchedulePayload } from "../types/wc-match";

export const fetchWorldCupSchedule = async () => {
  const response = await fetch("/api/world-cup/fixtures", {
    cache: "no-store",
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`World Cup schedule request failed: ${response.status}`);
  }

  return (await response.json()) as WorldCupSchedulePayload;
};
