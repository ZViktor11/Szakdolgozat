import { Player } from './player';

export interface Team {
  id?: string;
  name: string;
  address: string;
  points: number;
  league: string;
  season: string;
  players?: Player[];
}
