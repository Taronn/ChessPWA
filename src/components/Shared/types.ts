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
  statistics: IStatistic[]
}

export interface IStatistic {
  id: string
  type: GameType
  rating: number
  gamesPlayed: number
  wins: number
  losses: number
  draws: number
}

export interface IPlayer {
  id: string;
  username: string
  color: Color | null,
  country: string
  statistics: IStatistic[]
}

export interface IInvite {
  fromId:string
  from: IPlayer
  toId:string
  to: IPlayer
  fromColor: Color
  toColor: Color
  timer: number
  timerIncrement: number
  message:string
}
