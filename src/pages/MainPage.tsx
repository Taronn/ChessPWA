import { Page, Tab, Tabs } from 'framework7-react';
import { NavBar } from '../components/Shared/NavBar';
import { PlayersList } from '../components/PlayersList';
import { MainToolbar } from '../components/MainToolbar';
import { Profile } from '../components/Profile';
import { ChessBoard } from '../components/ChessBoard';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/slices/userSlice';

export function MainPage() {
  const user = useSelector(selectUser);
  return (
    <Page name="main" pageContent={false} noSwipeback>
      <NavBar/>
      <MainToolbar/>
      <Tabs>
        <Tab id='players' className="page-content" tabActive>
          <PlayersList/>
        </Tab>
        <Tab id='games' className='page-content'>
          <Profile user={user}/>
        </Tab>
        <Tab id='chess' className="page-content">
          <ChessBoard/>
        </Tab>
        <Tab id='chat' className='page-content'>
          <Profile user={user}/>
        </Tab>
        <Tab id='profile' className='page-content'>
          <Profile user={user}/>
        </Tab>
      </Tabs>
    </Page>
  );
}