import { Card } from 'framework7-react';
import { PlayerInfo } from '../Shared/PlayerInfo';
import { IPlayer } from '../Shared/types';
import { OptionsPopover } from './OptionsPopover';
import { Timer } from './Timer';

interface IPlayerInfoPanelProps {
  player: IPlayer;
  isOpponent?: boolean;
  initialTime: number;
}

export function PlayerInfoPanel({ player, initialTime, isOpponent = false }: IPlayerInfoPanelProps) {
  return (
    <Card raised className={`no-margin ${isOpponent ? 'margin-bottom-half' : 'margin-top-half'}`}>
      <div className="display-flex justify-content-space-between margin-left-half">
        <PlayerInfo player={player} initialTime={initialTime} />
        <Timer />
      </div>
      <div className="display-flex justify-content-flex-end">
        {!isOpponent && <OptionsPopover />}
      </div>
    </Card>
  );
}