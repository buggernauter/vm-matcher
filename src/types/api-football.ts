export type ApiFootballFixtureStatus = {
  short: string;
};

export type ApiFootballFixtureResponseItem = {
  fixture: {
    date: string;
    id: number;
    status: ApiFootballFixtureStatus;
  };
  goals: {
    away: number | null;
    home: number | null;
  };
  league: {
    id: number;
    name: string;
    round: string | null;
    season: number;
  };
  teams: {
    away: {
      id: number | null;
      name: string | null;
    };
    home: {
      id: number | null;
      name: string | null;
    };
  };
};

export type ApiFootballFixturesResponse = {
  response: ApiFootballFixtureResponseItem[];
};
