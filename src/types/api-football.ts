export type ApiFixtureStatus = {
  short: string;
};

export type ApiFixtureResponseItem = {
  fixture: {
    date: string;
    id: number;
    status: ApiFixtureStatus;
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

export type ApiFixturesResponse = {
  response: ApiFixtureResponseItem[];
};
