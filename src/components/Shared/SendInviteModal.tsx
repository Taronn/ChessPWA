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
  Segmented,
  Sheet,
} from 'framework7-react';
import { IInvite, IPlayer } from './types';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { PlayerInfo } from './PlayerInfo';
import { Color } from './constants';
import { useSignalR } from '../../hooks/useSignalR';
interface ISendInviteModalProps {
  opened: boolean;
  setOpened: (opened: boolean) => void;
  player: IPlayer;
}

export function SendInviteModal({ opened, setOpened, player }: ISendInviteModalProps) {
  const { t } = useTranslation();
  const { SignalRContext } = useSignalR();
  const [initialTime, setInitialTime] = useState(15);
  const [bonusTime, setBonusTime] = useState(5);
  const [color, setColor] = useState(Color.WHITE);
  const [message, setMessage] = useState("");

  const invite: IInvite = {
    fromColor: color,
    timer: initialTime,
    timerIncrement: bonusTime,
    message:message
  }

  function sendInvite() {
    SignalRContext.invoke('InvitePlayer', player.id, invite);
    console.log(invite);
    setOpened(false);
  }

  return (
    <Sheet style={{ height: 'auto' }} swipeToClose backdrop opened={opened}
           onSheetClosed={() => setOpened(false)}>
      <PageContent>
        <BlockTitle medium className="display-flex justify-content-space-between">
          <PlayerInfo player={player} initialTime={initialTime} />
          <div>
            <Button fill round onClick={() => { sendInvite();}} iconMaterial="send"
                    className="float-right padding" />
          </div>
        </BlockTitle>
        <Block>
          <Segmented strong tag="p">
            <Button active={color === Color.WHITE} onClick={() => setColor(Color.WHITE)}>
              {t('Common.White')}
            </Button>
            <Button active={color === Color.BLACK} onClick={() => setColor(Color.BLACK)}>
              {t('Common.Black')}
            </Button>
          </Segmented>
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
                       value={message}
                       onChange={(text) => setMessage(text.target.value)}
                       placeholder={t('Common.Message')}
                       resizable outline maxlength={50} />
          </List>
        </Block>

      </PageContent>
    </Sheet>
  );
}