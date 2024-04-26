import {
  Link,
  List,
  Navbar,
  NavLeft,
  NavRight,
  Popover,
} from 'framework7-react';
import { LogoLink } from './LogoLink';
import { LanguageSelector } from './LanguageSelector';
import { useMemo } from 'react';
import { DarkModeToggler } from './DarkModeToggler';
import { ThemeSelector } from './ThemeSelector';
import { ColorPicker } from './ColorPicker';
import { useSelector } from 'react-redux';
import { selectDarkMode } from '../../redux/slices/appSettingsSlice';

export function NavBar({ activeTab }) {
  const darkMode = useSelector(selectDarkMode);
  const isLoggedin = localStorage.getItem('isLoggedin') === 'true';
  const iconColor = useMemo(() => (darkMode ? 'white' : 'black'), [darkMode]);

  return (
    <Navbar>
      <NavLeft>
        <LogoLink size="35px" />
      </NavLeft>
      <NavRight>
        {!isLoggedin && (
          <Link
            iconColor={iconColor}
            iconIos="f7:gear"
            iconMd="material:settings"
            iconOnly
            popoverOpen=".popover-settings"
          ></Link>
        )}
        {!isLoggedin && (
          <Link
            iconColor={iconColor}
            iconIos="f7:person_badge_plus"
            iconMd="material:person_add"
            iconOnly
            href={'/signup'}
          ></Link>
        )}
        {!isLoggedin && (
          <Link
            iconColor={iconColor}
            iconIos="f7:square_arrow_right"
            iconMd="material:login"
            iconOnly
            href={'/login'}
          ></Link>
        )}
        {activeTab === 'profile' && (
            <Link
              iconColor={iconColor}
              iconIos="f7:menu"
              iconMd="material:menu"
              iconOnly
              panelOpen='#settings-panel'
              // panelClose
            ></Link>
          ) }
        {(isLoggedin && activeTab !== 'profile') && (
          <Link
            iconColor={iconColor}
            iconF7="paperplane_fill"
            iconOnly
            popupOpen='.chatPopup'
            href={'/#'}
          ></Link>)}
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
