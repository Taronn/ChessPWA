import { Link, List, ListItem, Navbar, NavRight, Page, Panel, Searchbar } from 'framework7-react';
import { PlayersListItem } from '../PlayersList/PlayersListItem';
import { useTranslation } from 'react-i18next';
import { getRandomPlayer } from '../../utils/generatePlayer';

export function FriendsPanel() {
  const {t} = useTranslation();
  const players = Array.from({ length: 30 }, getRandomPlayer);
  return (
    <Panel left floating swipe swipeActiveArea={130} id="friends-panel">
      <Page>
        <Navbar title={t('Common.Friends')}>
          <NavRight>
            <Link searchbarEnable=".searchbar-demo" iconIos="f7:search" iconMd="material:search" />
          </NavRight>
          <Searchbar
            className="searchbar-demo"
            expandable
            placeholder={t('Common.Search')}
            disableButtonText={t('Common.Cancel')}
            searchContainer=".friends-list"
            searchIn=".item-title"
          />
        </Navbar>
        <List strongIos outlineIos dividersIos className="searchbar-not-found">
          <ListItem title={t('Common.NothingFound')} />
        </List>
        <List noChevron dividersIos className="friends-list no-margin-top">
          {players.map((player, index) => <PlayersListItem key={index} slot="list" player={player} showRating={false}/>)}
        </List>
      </Page>
    </Panel>
  );
}