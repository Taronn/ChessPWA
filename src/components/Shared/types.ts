import { Color, GameType } from './constants';

export interface IUser {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  picture: string;
  country: string;
  gender: string;
  lastLogin: Date;
  createdAt: Date;
  updatedAt: Date;
  statistics: IStatistic[];
}

export interface IStatistic {
  id: string;
  type: GameType;
  rating: number;
  gamesPlayed: number;
  wins: number;
  losses: number;
  draws: number;
}

export interface IPlayer {
  id: string;
  username: string;
  color: Color;
  country: string;
  statistics: IStatistic[];
}

export interface IInvite {
  fromId: string;
  from: IPlayer;
  toId: string;
  to: IPlayer;
  fromColor: Color;
  toColor: Color;
  timer: number;
  timerIncrement: number;
  message: string;
}

export interface IGame {
  whitePlayer: IPlayer;
  blackPlayer: IPlayer;
  pgn: string;
  initialTime: number;
}
