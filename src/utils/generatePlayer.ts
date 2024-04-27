import { IPlayer } from '../components/Shared/types';
import { Color, GameType } from '../components/Shared/constants';

const usernames = ['player1', 'player2', 'player3', 'player4', 'player5'];
const countries = ['us', 'gb', 'ge', 'de', 'am'];

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export  function getRandomPlayer(): IPlayer {
  return {
    username: usernames[getRandomInt(0, usernames.length - 1)],
    country: countries[getRandomInt(0, countries.length - 1)],
    color: getRandomInt(0, 1) === 0 ? Color.WHITE : Color.BLACK,
    statistics: [
      {
        type: GameType.RAPID,
        rating: getRandomInt(1000, 2000),
        gamesPlayed: getRandomInt(0, 100),
        wins: getRandomInt(0, 100),
        losses: getRandomInt(0, 100),
        draws: getRandomInt(0, 100),
      },
      {
        type: GameType.BLITZ,
        rating: getRandomInt(1000, 2000),
        gamesPlayed: getRandomInt(0, 100),
        wins: getRandomInt(0, 100),
        losses: getRandomInt(0, 100),
        draws: getRandomInt(0, 100),
      },
      {
        type: GameType.BULLET,
        rating: getRandomInt(1000, 2000),
        gamesPlayed: getRandomInt(0, 100),
        wins: getRandomInt(0, 100),
        losses: getRandomInt(0, 100),
        draws: getRandomInt(0, 100),
      },
    ],
  };
}