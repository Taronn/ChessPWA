import { Icon, List, ListItem } from 'framework7-react';
import { ChangeEvent, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

export function LanguageSelector() {
  const { i18n } = useTranslation();
  const changeLanguage = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      i18n.changeLanguage(e.target.value);
    },
    [i18n]
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
      <Icon slot="title" ios="f7:globe" md="material:language" />
      <select onChange={changeLanguage} defaultValue={i18n.language}>
        <option value="en">English</option>
        <option value="hy">Հայերեն</option>
        <option value="ru">Русский</option>
      </select>
    </ListItem>
  );
}
