import { Page, Link, Block, Card, CardContent, Button } from 'framework7-react';
import { NavBar } from '../components/Shared/NavBar';

export function HomePage() {

    const imageStyle = {
        width:"100%",
        maxHeight: "80vh"
    };
    const footer = {
        position: "fixed",
        bottom: "0",
        left: "0",
        width: "100%"
    }


return (
    <Page name="home">
      <NavBar />
      <Block>
        <img style={imageStyle} src="https://wallpapercave.com/wp/wp2883270.jpg"></img>
        <Button text='Play' href='tabs/players' raised fill/>
      </Block>
      <Block style={footer}>
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
