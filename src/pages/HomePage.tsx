import { Page, Link, Block, Card, CardContent, Button, CardHeader } from 'framework7-react';
import { NavBar } from '../components/Shared/NavBar';
import { useTranslation } from 'react-i18next';

export function HomePage() {
  const { t } = useTranslation();
  return (
    <Page name="home">
      <NavBar />
      <Block>
        <Button text={t('PlayersList.Play')} href={localStorage.getItem('isLoggedin') === 'true' ? 'players' : 'login'} raised fill />
        <Block strong inset>
          <p>Welcome to the Chess Game! This is a multiplayer chess game where you can play with your friends and other players around the world.</p>
          <p>You can also chat with other players and see their profiles.</p>
          <p>Enjoy the game!</p>
        </Block>

        <Card>
          <CardHeader>You can also follow us on social media</CardHeader>
          <CardContent className="display-flex justify-content-space-evenly">
            <Link iconF7="logo_instagram"></Link>
            <Link iconF7="logo_facebook"></Link>
            <Link iconF7="logo_linkedin"></Link>
            <Link iconF7="logo_github"></Link>
            <Link iconF7="logo_twitter"></Link>
          </CardContent>
        </Card>
      </Block>
    </Page>
  );
}
