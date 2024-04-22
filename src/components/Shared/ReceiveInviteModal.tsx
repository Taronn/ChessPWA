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
import { IInvite, IPlayer } from './types';
import { useTranslation } from 'react-i18next';
import { PlayerInfo } from './PlayerInfo';
import { useSignalR } from '../../hooks/useSignalR';
import { useState,useEffect } from 'react';

export function ReceiveInviteModal(){
  const { t } = useTranslation();
  const { SignalRContext } = useSignalR();
  const [invite, setInvite] = useState<IInvite>({} as IInvite);
  const [opened, setOpened] = useState(false);
  const player: IPlayer = {
    country: "Armenia",
    username: "Gago",
  }
  // const [from, setFrom] = useState<IPlayer>({} as IPlayer);

  // useEffect(() => {
  //   setOpened(true);
  // }, [invite]);

  function rejectedInvite() {
    SignalRContext.invoke('RejectInvite');
    setOpened(false);
  }

  SignalRContext.useSignalREffect('InviteReceived', (newInvite) => {
    console.log(newInvite);
    setOpened(true);
    setInvite(newInvite);
    // setFrom(newInvite.from);
  }, [setInvite]);
  
  return (
    <Sheet style={{ height: 'auto' }} swipeToClose opened={opened}
           onSheetClosed={() => setOpened(false)} >
      <PageContent>
        <BlockTitle medium className="display-flex justify-content-space-between margin-top">
          <PlayerInfo player={player} initialTime={invite.timer} />
          <div className="grid grid-cols-2 grid-gap">
            <Button fill round onClick={() => rejectedInvite()} iconIos="f7:xmark" iconMd="material:close"
                    className="padding" color="red" />
            <Button fill round onClick={() => setOpened(false) } iconIos="f7:checkmark" iconMd="material:check"
                    className="padding" />
          </div>
        </BlockTitle>
        <Block>
          <List className="no-margin">
            <ListItem title={t('Common.Color')} badge={t(`Common.${invite?.toColor}`)}><Icon slot="media" material="contrast" /></ListItem>
            <ListItem title={t('InviteModal.InitialTime')} badge={`${invite?.timer} ${t('Common.Minutes')}`}><Icon
              slot="media" className="material-icons-outlined" material="timer" /></ListItem>
            <ListItem title={t('InviteModal.BonusTime')} badge={`${invite?.timerIncrement} ${t('Common.Seconds')}`}><Icon
              slot="media" material="more_time" /></ListItem>
          </List>
        </Block>

      </PageContent>
    </Sheet>
  );
}