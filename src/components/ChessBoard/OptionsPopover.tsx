import { Button, Icon, List, ListItem, Popover } from 'framework7-react';
import { useSelector } from 'react-redux';
import { selectDarkMode } from '../../redux/slices/appSettingsSlice';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSignalR } from '../../hooks/useSignalR';

export function OptionsPopover() {
  const {t} = useTranslation();
  const darkMode = useSelector(selectDarkMode);
  const iconColor = useMemo(() => (darkMode ? 'white' : 'black'), [darkMode]);
  const { SignalRContext } = useSignalR();
  function resignGame() {
    SignalRContext.invoke('Resign');
  }
  function offerDraw() {
    SignalRContext.invoke('OfferDraw');
  }
  return (
    <>
      <Button popoverOpen=".popover-chess" iconF7="ellipsis" round iconColor={iconColor}/>
      <Popover className="popover-chess" style={{width: "fit-content"}} >
        <List noChevron>
          <ListItem title={t("Chess.Draw")} onClick={() => { offerDraw() }} link popoverClose><Icon material="handshake" className="material-icons-outlined" slot="media" size={28}/></ListItem>
          <ListItem title={t("Chess.Resign")} onClick={() => { resignGame() }} link popoverClose><Icon f7="flag" slot="media" /></ListItem>
          <ListItem title="Pgn" link popoverClose><Icon f7="square_on_square"  slot="media" size={28}/></ListItem>
          <ListItem title="Fen" link popoverClose><Icon f7="square_on_square" slot="media" size={28}/></ListItem>
        </List>
      </Popover>
    </>
  );
}