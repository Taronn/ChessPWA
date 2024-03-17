import { Icon, List, ListItem, Page, Panel } from 'framework7-react';
import { useTranslation } from 'react-i18next';

export function SettingsPanel(){
  const {t} = useTranslation();
  return (
    <Panel right reveal swipe swipeOnlyClose id="settings-panel">
      <Page>
        <List noChevron dividersIos outline>
          <ListItem link title={t('Common.Settings')} popoverOpen=".popover-settings"><Icon md="material:settings" ios="f7:gear" slot='media'/></ListItem>
          <ListItem link title={t('Common.LogOut')}><Icon md="material:logout" ios="f7:square_arrow_left" slot='media'/></ListItem>
        </List>
      </Page>
    </Panel>
  );
}