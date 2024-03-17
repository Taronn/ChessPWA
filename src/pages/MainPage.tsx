import { List, Page, Panel, Tab, Tabs } from 'framework7-react';
import { NavBar } from '../components/Shared/NavBar';
import { PlayersList } from '../components/PlayersList';
import { MainToolbar } from '../components/MainToolbar';
import { Profile } from '../components/Profile';
import { ChessBoard } from '../components/ChessBoard';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/slices/userSlice';
import { useState } from 'react';
import { PlayersListItem } from '../components/PlayersList/PlayersListItem';
import { getRandomPlayer } from '../utils/generatePlayer';

export function MainPage() {
  const user = useSelector(selectUser);
  const [tab, setTab] = useState('');
  const players = Array.from({ length: 20 }, getRandomPlayer);
  return (
    <Page name="main" pageContent={false} noSwipeback id="main">
      <NavBar activeTab={tab}/>
      <MainToolbar/>
      <Tabs routable>
        <Tab id='players' className="page-content" onTabShow={() => setTab('players')}>
          <PlayersList/>
        </Tab>
        <Tab id='games' className='page-content' onTabShow={() => setTab('games')}>
          <Profile user={user}/>
        </Tab>
        <Tab id='chess' className="page-content" onTabShow={() => setTab('chess')}>
          <ChessBoard/>
        </Tab>
        <Tab id='chat' className='page-content' onTabShow={() => setTab('chat')}>
          <Profile user={user}/>
        </Tab>
        <Tab id='profile' className='page-content' onTabShow={() => setTab('profile')}>
          <Profile user={user}/>
        </Tab>
      </Tabs>
      <Panel left push swipe id="friends-panel">
        <List noChevron dividersIos outline inset>
          {players.map((player, index) => <PlayersListItem key={index} slot="list" player={player} showRating={false}/>)}
        </List>
      </Panel>
    </Page>
  );
}