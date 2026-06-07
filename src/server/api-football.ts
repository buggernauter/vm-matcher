import type { ApiFootballFixturesResponse } from "../types/api-football";

const API_FOOTBALL_BASE_URL = "https://v3.football.api-sports.io";
const WORLD_CUP_TIMEZONE = "Europe/Stockholm";

type ApiFootballPrimitive = boolean | number | string;
type ApiFootballQueryParams = Record<
  string,
  ApiFootballPrimitive | undefined
>;

// Add API_FOOTBALL_KEY to your local `.env` file.
// Add API_FOOTBALL_KEY in Vercel Project Settings > Environment Variables.
const getApiFootballKey = () => {
  const apiKey = process.env.API_FOOTBALL_KEY;

  if (!apiKey) {
    throw new Error(
      "Missing API_FOOTBALL_KEY. Add it locally and in Vercel environment variables.",
    );
  }

  return apiKey;
};

const buildApiFootballUrl = (
  pathname: string,
  queryParams: ApiFootballQueryParams,
) => {
  const url = new URL(pathname, API_FOOTBALL_BASE_URL);

  for (const [key, value] of Object.entries(queryParams)) {
    if (value === undefined) {
      continue;
    }

    url.searchParams.set(key, String(value));
  }

  return url;
};

const requestApiFootball = async <TResponse>(
  pathname: string,
  queryParams: ApiFootballQueryParams,
) => {
  const response = await fetch(buildApiFootballUrl(pathname, queryParams), {
    headers: {
      "x-apisports-key": getApiFootballKey(),
    },
  });

  if (!response.ok) {
    throw new Error(
      `API-FOOTBALL request failed with status ${response.status}.`,
    );
  }

  return (await response.json()) as TResponse;
};

export const fetchApiFootballFixturesByDate = async (date: string) =>
  requestApiFootball<ApiFootballFixturesResponse>("/fixtures", {
    date,
    timezone: WORLD_CUP_TIMEZONE,
  });

export const fetchApiFootballFixturesByCompetition = async (
  league: number,
  season: number,
  options?: {
    date?: string;
    from?: string;
    round?: string;
    to?: string;
  },
) =>
  requestApiFootball<ApiFootballFixturesResponse>("/fixtures", {
    date: options?.date,
    from: options?.from,
    league,
    round: options?.round,
    season,
    timezone: WORLD_CUP_TIMEZONE,
    to: options?.to,
  });
