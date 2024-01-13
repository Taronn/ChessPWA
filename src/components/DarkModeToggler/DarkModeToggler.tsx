import { Button, Icon, List, ListButton, ListItem } from 'framework7-react';
import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectDarkMode,
  toggleDarkMode,
} from '../../redux/slices/appSettingsSlice';
import { useTranslation } from 'react-i18next';

export function DarkModeToggler() {
  const { t } = useTranslation();
  const darkMode = useSelector(selectDarkMode);
  const dispatch = useDispatch();
  const handleClick = useCallback(() => {
    dispatch(toggleDarkMode());
  }, [dispatch]);

  const iconMd = useMemo(
    () => (darkMode ? 'material:light_mode' : 'material:dark_mode'),
    [darkMode]
  );
  const iconIos = useMemo(
    () => (darkMode ? 'f7:sun_max' : 'f7:moon_stars'),
    [darkMode]
  );
  return (
    <ListButton onClick={handleClick}>
      <Icon slot="title" ios={iconIos} md={iconMd} />
      <span className="margin-left-half">
        {darkMode ? t('Settings.LightMode') : t('Settings.DarkMode')}
      </span>
    </ListButton>
  );
}
