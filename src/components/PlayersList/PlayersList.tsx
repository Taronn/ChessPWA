import { List, ListItem, Searchbar } from 'framework7-react';
import { PlayersListItem } from './PlayersListItem';
import { useSignalR } from '../../hooks/useSignalR';
import { getRandomPlayer } from '../../utils/generatePlayer';
import { useTranslation } from 'react-i18next';

export function PlayersList() {
  const { t } = useTranslation();
  const { SignalRContext } = useSignalR();
  SignalRContext.useSignalREffect('GetPlayersList', (players) => {
    console.log(players);
  }, []);


  const players = Array.from({ length: 20 }, getRandomPlayer);

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