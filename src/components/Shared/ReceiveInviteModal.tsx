import { Block, BlockTitle, Button, f7, Icon, List, ListItem, PageContent, Sheet } from 'framework7-react';
import { IInvite } from './types';
import { useTranslation } from 'react-i18next';
import { PlayerInfo } from './PlayerInfo';
import { useSignalR } from '../../hooks/useSignalR';
import { useState } from 'react';
import { Colors } from './constants';

export function ReceiveInviteModal() {
  const { t } = useTranslation();
  const { SignalRContext } = useSignalR();
  const [invite, setInvite] = useState<IInvite>({} as IInvite);
  const [opened, setOpened] = useState(false);

  
  // useEffect(() => {
  //   if (invite!==null) {
  //     setOpened(true);
  //   }
  // }, [invite]);

  SignalRContext.useSignalREffect(
    'InviteReceived',
    (newInvite) => {
      console.log(newInvite);
      setInvite(newInvite);
      setOpened(true);
    },
    [setInvite],
  );
  
  function acceptInvite() {
    SignalRContext.invoke('AcceptInvite');
    setOpened(false);
  }
  function rejectInvite() {
    SignalRContext.invoke('RejectInvite',invite);
    setOpened(false);
  }

  SignalRContext.useSignalREffect(
    'InviteRejected',
    () => {
      f7.dialog.alert(t('Invite Rejected'));
    },
    [],
  );

  SignalRContext.useSignalREffect(
    'StartGame',
    game => {
      console.log('game');
      f7.views.main.router.navigate('/chess');
      console.log(game);
    },
    [],
  );

  return (
    <Sheet style={{ height: 'auto' }} swipeToClose opened={opened} onSheetClosed={() => rejectInvite()}>
      <PageContent>
        <BlockTitle medium className="display-flex justify-content-space-between margin-top">
          {invite && <PlayerInfo player={invite.from} initialTime={invite.timer} />}
          <div className="grid grid-cols-2 grid-gap">
            <Button fill round onClick={() => rejectInvite()} iconIos="f7:xmark" iconMd="material:close" className="padding" color="red" />
            <Button fill round onClick={() => acceptInvite()} iconIos="f7:checkmark" iconMd="material:check" className="padding" />
          </div>
        </BlockTitle>
        <Block>
          <List className="no-margin">
            <ListItem title={t('Common.Color')} badge={t(`Common.${Colors[invite?.toColor]}`)}>
              <Icon slot="media" material="contrast" />
            </ListItem>
            <ListItem title={t('InviteModal.InitialTime')} badge={`${invite?.timer} ${t('Common.Minutes')}`}>
              <Icon slot="media" className="material-icons-outlined" material="timer" />
            </ListItem>
            <ListItem title={t('InviteModal.BonusTime')} badge={`${invite?.timerIncrement} ${t('Common.Seconds')}`}>
              <Icon slot="media" material="more_time" />
            </ListItem>
            <ListItem title={t('Common.Message')} badge={invite?.message}>
              <Icon slot="media" material="message" />
            </ListItem>
          </List>
        </Block>
      </PageContent>
    </Sheet>
  );
}
