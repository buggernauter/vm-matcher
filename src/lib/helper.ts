const MIN_ROUND_VALUE = 0;

export const clampValue = (value: number, max: number) =>
  Math.max(MIN_ROUND_VALUE, Math.min(max, value));

export const getSwedishDateKey = () =>
  new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Europe/Stockholm",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());

export const normalizeTeamName = (value: string) =>
  value
    .normalize("NFKD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim();
