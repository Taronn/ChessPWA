import { Link, Toolbar } from 'framework7-react';

export function MainToolbar() {
  return (
    <Toolbar tabbar icons position="bottom" outline style={{ height: '60px'}}>
      <Link
        href="players/"
        routeTabId="players"
        tabLink="#players"
        iconIos="f7:person_3_fill"
        iconMd="material:groups"
      />
      <Link
        href="games/"
        routeTabId="games"
        tabLink="#games"
        iconIos="f7:eye_fill"
        iconMd="material:visibility"
      />
      <Link
        href="chess/"
        routeTabId="chess"
        tabLink="#chess"
        iconMaterial="sports_esports"
        iconIos="f7:gamecontroller_fill"
      />
      <Link
        href="chat/"
        routeTabId="chat"
        tabLink="#chat"
        iconIos="f7:chat_bubble_2_fill"
        iconMd="material:chat"
      />
      <Link
        href="profile/"
        routeTabId="profile"
        tabLink="#profile"
        iconIos="f7:person_alt_circle_fill"
        iconMd="material:account_circle"
      />
    </Toolbar>
  );
}