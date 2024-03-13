import { Button, Icon, Segmented } from 'framework7-react';
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'type' implicitly has an 'any' type.
import bulletWhiteIcon from '../../assets/bullet-white.svg';
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'type' implicitly has an 'any' type.
import bulletBlackIcon from '../../assets/bullet-black.svg';
import { useSelector } from 'react-redux';
import { selectDarkMode } from '../../redux/slices/appSettingsSlice';
import { GameType } from '../Shared/constants';

interface IChessTypeSelectorProps {
  type: GameType;
  setType: (type: GameType) => void;
}

export function ChessTypeSelector({type, setType}: IChessTypeSelectorProps) {
  const darkMode = useSelector(selectDarkMode);
  return (
    <Segmented strong tag="p">
      <Button text='Rapid' active={type === GameType.RAPID} onClick={() => setType(GameType.RAPID)} >
        <Icon slot="media" className="material-icons-outlined" material="timer"/>
      </Button>
      <Button text='Blitz' active={type === GameType.BLITZ} onClick={() => setType(GameType.BLITZ)}>
        <Icon slot="media" f7="bolt_fill" size={18}/>
      </Button>
      <Button text='Bullet' active={type === GameType.BULLET} onClick={() => setType(GameType.BULLET)}>
        <img src={darkMode ? bulletWhiteIcon : bulletBlackIcon} alt="bullet" slot='media'/>
      </Button>
    </Segmented>
  );
}