import { useState } from 'react';
import { List, ListItem, Searchbar } from 'framework7-react';
import { PlayersListItem } from './PlayersListItem';
import { useSignalR } from '../../hooks/useSignalR';
import { useTranslation } from 'react-i18next';
import { IPlayer } from '../Shared/types';

export function PlayersList() {
  const { t } = useTranslation();
  const { SignalRContext } = useSignalR();
  const [players, setPlayers] = useState<IPlayer[]>([]);

  SignalRContext.useSignalREffect('GetPlayersList', (newPlayers) => {
    setPlayers(newPlayers);
  }, [setPlayers]);

  SignalRContext.useSignalREffect('PlayerJoin', (player) => {
    setPlayers(prevPlayers => [...prevPlayers, player]);
  }, [setPlayers]);

  SignalRContext.useSignalREffect('PlayerLeave', (playerId) => {
    setPlayers(players => players.filter(p => p.id !== playerId));
  }, [setPlayers]);

  return (
    <div>
      <Searchbar
        placeholder={t('Common.Search')}
        disableButtonText={t('Common.Cancel')}
        searchContainer=".players-list"
        searchIn=".item-title"
      />
      <List strongIos outlineIos dividersIos className="searchbar-not-found">
        <ListItem title={t('Common.NothingFound')} />
      </List>
      <List strong inset dividers outline className="margin-vertical players-list">
        {players.map((player, index) => <PlayersListItem key={index} slot="list" player={player} />)}
      </List>
    </div>
  );
}