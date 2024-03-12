import { Color, GameType } from './constants';

export interface IUser {
  username: string,
  email: string,
  firstName: string,
  lastName: string,
  picture: string,
  country: string,
  gender: string,
  lastLogin: Date,
  createdAt: Date,
  updatedAt: Date,
}

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
  color: Color | null,
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