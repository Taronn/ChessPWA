import {
  Link,
  List,
  ListItem,
  Navbar,
  NavLeft,
  NavRight,
  Popover,
} from 'framework7-react';
import { LogoLink } from '../LogoLink';
import { LanguageSelector } from '../LanguageSelector';
import { useMemo } from 'react';
import { DarkModeToggler } from '../DarkModeToggler';
import { ThemeSelector } from '../ThemeSelector';
import { ColorPicker } from '../ColorPicker';
import { useSelector } from 'react-redux';
import { selectDarkMode } from '../../redux/slices/appSettingsSlice';

export function NavBar() {
  const darkMode = useSelector(selectDarkMode);
  const iconColor = useMemo(() => (darkMode ? 'white' : 'black'), [darkMode]);
  return (
    <Navbar>
      <NavLeft>
        <LogoLink size="35px" />
      </NavLeft>
      <NavRight>
        <Link
          iconColor={iconColor}
          iconIos="f7:gear"
          iconMd="material:settings"
          iconOnly
          popoverOpen=".popover-settings"
        ></Link>

        <Link
          iconColor={iconColor}
          iconIos="f7:person_badge_plus"
          iconMd="material:person_add"
          iconOnly
          href="/signup"
        ></Link>
        <Link
          iconColor={iconColor}
          iconIos="f7:square_arrow_right"
          iconMd="material:login"
          iconOnly
          href="/login"
        ></Link>
      </NavRight>
      <Popover className="popover-settings">
        <List style={{ listStyleType: 'none' }} strong>
          <LanguageSelector />
          <ThemeSelector />
          <ColorPicker />
          <DarkModeToggler />
        </List>
      </Popover>
    </Navbar>
  );
}
