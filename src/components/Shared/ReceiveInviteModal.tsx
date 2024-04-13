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

interface IReceiveInviteModalProps {
  opened: boolean;
  setOpened: (opened: boolean) => void;
  invite: IInvite;
}

export function ReceiveInviteModal({ opened, setOpened, invite }: IReceiveInviteModalProps) {
  const { t } = useTranslation();
  const {from: player, initialTime, bonusTime} = invite;


  

  return (
    <Sheet style={{ height: 'auto' }} swipeToClose opened={opened}
           onSheetClosed={() => setOpened(false)}>
      <PageContent>
        <BlockTitle medium className="display-flex justify-content-space-between margin-top">
          <PlayerInfo player={player} initialTime={initialTime} />
          <div className="grid grid-cols-2 grid-gap">
            <Button fill round  onClick={() => setOpened(false)} iconIos="f7:xmark" iconMd="material:close"
                    className="padding" color="red" />
            <Button fill round onClick={() => setOpened(false)} iconIos="f7:checkmark" iconMd="material:check"
                    className="padding" />
          </div>

        </BlockTitle>
        <Block>
          <List className="no-margin">
            <ListItem title={t('Common.Color')} badge={t(`Common.${invite.toColor}`)}><Icon slot="media" material="contrast" /></ListItem>
            <ListItem title={t('InviteModal.InitialTime')} badge={`${initialTime} ${t('Common.Minutes')}`}><Icon
              slot="media" className="material-icons-outlined" material="timer" /></ListItem>
            <ListItem title={t('InviteModal.BonusTime')} badge={`${bonusTime} ${t('Common.Seconds')}`}><Icon
              slot="media" material="more_time" /></ListItem>
          </List>
        </Block>

      </PageContent>
    </Sheet>
  );
}