import { List } from 'framework7-react';
import { PlayersListItem } from './PlayersListItem';
import { GameType } from '../Shared/constants';
import { useSignalR } from '../../hooks/useSignalR';

export function PlayersList() {
  const { SignalRContext } = useSignalR();
  SignalRContext.useSignalREffect("GetPlayersList", (players) => console.log(players), []);
  const usernames = ['player1', 'player2', 'player3', 'player4', 'player5'];
  const countries = ['us', 'gb', 'ge', 'de', 'am'];

  function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function getRandomPlayer() {
    return {
      username: usernames[getRandomInt(0, usernames.length - 1)],
      country: countries[getRandomInt(0, countries.length - 1)],
      statistics: [
        {
          type: GameType.RAPID,
          rating: getRandomInt(1000, 2000),
        },
        {
          type: GameType.BLITZ,
          rating: getRandomInt(1000, 2000),
        },
        {
          type: GameType.BULLET,
          rating: getRandomInt(1000, 2000),
        },
      ],
    };
  }

// Generate an array of 20 random players
  const players = Array.from({ length: 20 }, getRandomPlayer);

  return (
    <List strong inset outline dividers>
      {players.map((player, index) => <PlayersListItem key={index} slot="list" player={player} />)}
    </List>
  );
}