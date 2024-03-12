import {
  Block,
  BlockTitle,
  Button,
  Icon,
  List,
  ListInput,
  ListItem,
  PageContent,
  Range,
  Sheet,
} from 'framework7-react';
import { IPlayer } from './types';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { PlayerInfo } from './PlayerInfo';

interface ISendInviteModalProps {
  opened: boolean;
  setOpened: (opened: boolean) => void;
  player: IPlayer;
}

export function SendInviteModal({ opened, setOpened, player }: ISendInviteModalProps) {
  const { t } = useTranslation();
  const [initialTime, setInitialTime] = useState(15);
  const [bonusTime, setBonusTime] = useState(5);

  return (
    <Sheet style={{ height: 'auto' }} swipeToClose backdrop opened={opened}
           onSheetClosed={() => setOpened(false)}>
      <PageContent>
        <BlockTitle medium className="display-flex justify-content-space-between">
          <PlayerInfo player={player} initialTime={initialTime} />
          <div>
            <Button fill round onClick={() => setOpened(false)} iconMaterial="send"
                    className="float-right padding" />
          </div>
        </BlockTitle>
        <Block>

          <List className="margin-bottom-half">
            <div className="display-flex justify-content-space-between">
              <small>{t('InviteModal.InitialTime')}</small>
              <small>{`${initialTime} ${t('Common.Minutes')}`}</small>
            </div>
            <ListItem>
              <div>
                <Icon className="material-icons-outlined" material="timer" />
              </div>
              <div style={{ width: '100%', margin: '0 16px' }}>
                <Range min={1} max={60} step={1} value={initialTime} label
                       onRangeChange={(val) => setInitialTime(val)} />
              </div>
            </ListItem>
          </List>

          <List className="no-margin-vertical">
            <div className="display-flex justify-content-space-between">
              <small>{t('InviteModal.BonusTime')}</small>
              <small>{`${bonusTime} ${t('Common.Seconds')}`}</small>
            </div>
            <ListItem>
              <div>
                <Icon material="more_time" />
              </div>
              <div style={{ width: '100%', margin: '0 16px' }}>
                <Range min={0} max={60} step={1} value={bonusTime} label onRangeChange={(val) => setBonusTime(val)} />
              </div>
            </ListItem>
          </List>

          <List className="no-margin">
            <ListInput type="textarea"
                       placeholder={t('Common.Message')}
                       resizable outline maxlength={50} />
          </List>
        </Block>

      </PageContent>
    </Sheet>
  );
}