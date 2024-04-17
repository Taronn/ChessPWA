import {
  Block,
  BlockTitle,
  Button,
  Icon,
  List,
  ListItem,
  PageContent,
  Sheet,
} from 'framework7-react';
import { IInvite } from './types';
import { useTranslation } from 'react-i18next';
import { PlayerInfo } from './PlayerInfo';
import { useSignalR } from '../../hooks/useSignalR';
import { useState } from 'react';



export function ReceiveInviteModal(){
  const { t } = useTranslation();
  const { SignalRContext } = useSignalR();
  const [invite, setInvite] = useState<IInvite>();
  const [opened, setOpened] = useState(false);
  const { from: player, timer: timer, timerIncrement: timerIncrement } = invite;
  
  SignalRContext.useSignalREffect('InviteReceived', (newInvite) => {
    console.log(newInvite);
    setInvite(newInvite);
    setOpened(true);
  }, [setInvite]);
  
  
  if (opened === true) {
  return <></>
  }
  return (
    <Sheet style={{ height: 'auto' }} swipeToClose opened={opened}
           onSheetClosed={() => setOpened(false)}>
      <PageContent>
        <BlockTitle medium className="display-flex justify-content-space-between margin-top">
          <PlayerInfo player={player} initialTime={timer} />
          <div className="grid grid-cols-2 grid-gap">
            <Button fill round  onClick={() => setOpened(false)} iconIos="f7:xmark" iconMd="material:close"
                    className="padding" color="red" />
            <Button fill round onClick={() => setOpened(false)} iconIos="f7:checkmark" iconMd="material:check"
                    className="padding" />
          </div>

        </BlockTitle>
        <Block>
          <List className="no-margin">
            <ListItem title={t('Common.Color')} badge={t(`Common.${invite?.toColor}`)}><Icon slot="media" material="contrast" /></ListItem>
            <ListItem title={t('InviteModal.InitialTime')} badge={`${timer} ${t('Common.Minutes')}`}><Icon
              slot="media" className="material-icons-outlined" material="timer" /></ListItem>
            <ListItem title={t('InviteModal.BonusTime')} badge={`${timerIncrement} ${t('Common.Seconds')}`}><Icon
              slot="media" material="more_time" /></ListItem>
          </List>
        </Block>

      </PageContent>
    </Sheet>
  );
}