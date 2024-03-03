import { GameType } from './constants';

export interface Statistic {
  type: GameType
  rating: number
  gamesPlayed: number
  wins: number
  losses: number
  draws: number
}