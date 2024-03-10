import { Color, GameType } from './constants';

export interface IStatistic {
  type: GameType
  rating: number
  gamesPlayed?: number
  wins?: number
  losses?: number
  draws?: number
}

export interface IPlayer {
  username: string
  country: string
  statistics: IStatistic[]
}

export interface IInvite {
  from: IPlayer
  fromColor: Color
  to: IPlayer
  toColor: Color
  initialTime: number
  bonusTime: number
}