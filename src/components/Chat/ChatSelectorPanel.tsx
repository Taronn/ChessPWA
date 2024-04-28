import { Icon, List, ListItem, Page, Panel } from 'framework7-react';
import { useTranslation } from 'react-i18next';
import { PlayersList } from '../PlayersList'

export function ChatSelector(){
  const {t} = useTranslation();

  return (
    <Panel right reveal swipe swipeOnlyClose id="chat-panel">
      <Page>
        <List noChevron dividersIos outline>
          <ListItem link title={t('Common.GlobalChat')} popupOpen='.chatPopup' ><Icon md="f7:chat_bubble_2" ios="f7:chat_bubble_2" slot='media'/></ListItem>
          <ListItem link title={t('Common.AIChat')} popupOpen='.AiAssistant' ><Icon md="f7:quote_bubble" ios="f7:quote_bubble" slot='media'/></ListItem>
          <PlayersList isRenderedByChatSelector={true}/>
        </List>
      </Page>
    </Panel>
  );
}