import { List } from 'framework7-react';
import { PlayersListItem } from './PlayersListItem';
import { useSignalR } from '../../hooks/useSignalR';
import { getRandomPlayer } from '../../utils/generatePlayer';

export function PlayersList() {
  const { SignalRContext } = useSignalR();
  SignalRContext.useSignalREffect("GetPlayersList", (players) => {
    console.log(players);
  }, []);


  const players = Array.from({ length: 20 }, getRandomPlayer);

  return (
    <List strong inset dividers outline className="margin-vertical">
      {players.map((player, index) => <PlayersListItem key={index} slot="list" player={player} />)}
    </List>
  );
}