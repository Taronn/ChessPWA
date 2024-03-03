import { Chip, Icon } from 'framework7-react';
import { GameType } from './constants';
import { Statistic } from './types';
// @ts-ignore
import bulletIcon from '../../assets/bullet.svg';

interface IRatingChipProps {
  statistic: Statistic
  slot: string;
}

export function RatingChip({ statistic, slot}: IRatingChipProps) {
  const styles = {
    [GameType.RAPID]: {
      material: 'timer',
      color: 'green',
    },
    [GameType.BLITZ]: {
      f7: 'bolt_fill',
      color: 'yellow',
    },
    [GameType.BULLET]: {
      fill: 'red',
    },
  };

  const { type, rating } = statistic;
  return (
    <Chip text={rating} slot={slot} mediaBgColor="" outline tooltipTrigger="click"
          tooltip={type.toUpperCase()} >
      {type === GameType.BULLET ? <img src={bulletIcon} alt="bullet"  style={styles[type]} slot='media'/> : <Icon slot="media" {...styles[type]} />}
    </Chip>
  );
}