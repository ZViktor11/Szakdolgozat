import { Team } from './team';

export interface Match {
  id?: string;
  season: string;
  league: string;
  teamHomeId: string;
  teamAwayId: string;
  possessionHome: number;
  possessionAway: number;
  goalsHome: number;
  goalsAway: number;
  shotOnTargetHome?: number;
  shotOnTargetAway?: number;
  yellowCardsHome?: number;
  yellowCardsAway?: number;
  redCardsHome?: number;
  redCardsAway?: number;
  finished: boolean;
}
