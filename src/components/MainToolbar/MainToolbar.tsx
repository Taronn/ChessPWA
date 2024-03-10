import { Link, Toolbar } from 'framework7-react';

export function MainToolbar() {
  return (
    <Toolbar tabbar icons position='bottom' outline style={{ height: '50px' }}>
      <Link
        tabLink="#players"
        tabLinkActive
        iconIos="f7:person_3_fill"
        iconMd="material:groups"
      />
      <Link
        tabLink="#games"
        iconIos="f7:eye_fill"
        iconMd="material:visibility"
      />
      <Link
        tabLink="#tournments"
        // iconMaterial='trophy'
        iconMaterial="game"
      />
      <Link
        tabLink="#chat"
        iconIos="f7:chat_bubble_2_fill"
        iconMd="material:chat"
      />
      <Link
        tabLink="#profile"
        iconIos="f7:person_alt_circle_fill"
        iconMd="material:account_circle"
      />
    </Toolbar>
  );
}