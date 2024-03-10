import { Icon } from 'framework7-react';
import { RatingChip } from './RatingChip';
import { IPlayer } from './types';
import countries from 'i18n-iso-countries';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { GameType } from './constants';

interface IPlayerInfoProps {
  player: IPlayer;
  initialTime: number;
}
export function PlayerInfo({player, initialTime} : IPlayerInfoProps) {
  const {i18n} = useTranslation();
  const countryName = countries.getName(player.country, i18n.language);

  const playerStatistics = useMemo(() => player.statistics.find(stat => {
      if (initialTime < 3) {
        return stat.type === GameType.BULLET;
      }
      if (initialTime < 10) {
        return stat.type === GameType.BLITZ;
      }
      return stat.type === GameType.RAPID;
    })!
    , [initialTime, player.statistics]);

  return (
    <div>
      <Icon ios="f7:person" md="material:person" className="margin-right-half" />
      <span>{player.username}</span>
      <Icon className="margin-horizontal-half" tooltip={countryName} tooltipTrigger="click">
        <img
          src={`https://flagcdn.com/${player.country}.svg`}
          width="24"
          alt={player.country}
        />
      </Icon>
      <RatingChip statistic={playerStatistics} />
    </div>
  );
}