import { Page, Tab, Tabs } from 'framework7-react';
import { NavBar } from '../components/Shared/NavBar';
import { PlayersList } from '../components/PlayersList';
import { MainToolbar } from '../components/MainToolbar';
import { Profile } from '../components/Profile';
import { ChessBoard } from '../components/ChessBoard';

export function MainPage() {

  return (
    <Page name="main" pageContent={false} noSwipeback>
      <NavBar/>
      <MainToolbar/>
      <Tabs>
        <Tab id='players' className="page-content" tabActive>
          <PlayersList/>
        </Tab>
        <Tab id='games' className='page-content'>
          <Profile/>
        </Tab>
        <Tab id='chess' className="page-content">
          <ChessBoard/>
        </Tab>
        <Tab id='chat' className='page-content'>
          <Profile/>
        </Tab>
        <Tab id='profile' className='page-content'>
          <Profile/>
        </Tab>
      </Tabs>
    </Page>
  );
}