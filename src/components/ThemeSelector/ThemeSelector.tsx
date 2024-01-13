import { Icon, List, ListItem, f7 } from 'framework7-react';
import { ChangeEvent, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectTheme, setTheme } from '../../redux/slices/appSettingsSlice';
import { useTranslation } from 'react-i18next';

export function ThemeSelector() {
  const { t } = useTranslation();
  const theme = useSelector(selectTheme);
  const dispatch = useDispatch();
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      dispatch(setTheme(e.target.value));
      f7.dialog.alert(t('Settings.PleaseRestart'), t('Settings.ThemeChanged'));
    },
    [dispatch]
  );

  return (
    <ListItem
      smartSelect
      noChevron
      smartSelectParams={{
        openIn: 'popover',
        closeOnSelect: true,
      }}
    >
      <Icon slot="title" material="style" />
      <select onChange={handleChange} defaultValue={theme}>
        <option value="auto">Auto</option>
        <option value="ios">iOS</option>
        <option value="md">Material Design</option>
      </select>
    </ListItem>
  );
}
