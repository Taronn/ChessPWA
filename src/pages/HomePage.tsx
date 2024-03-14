import { Page, Link, Block, Card, CardContent, Button } from 'framework7-react';
import { NavBar } from '../components/Shared/NavBar';

export function HomePage() {
  return (
    <Page name="home">
      <NavBar />
      <Block>
        <Button text='Play' href='tabs/players' raised fill/>
        <p>
          This is a boilerplate project for building Chess PWA with Framework7
          and React
        </p>
        <Card>
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
