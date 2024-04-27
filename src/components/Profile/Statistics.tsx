import { IStatistic } from '../Shared/types';
import { List, ListItem, PieChart } from 'framework7-react';
import { useTranslation } from 'react-i18next';

interface IStatisticsProps {
  statistics: IStatistic;
}

export function Statistics({ statistics }: IStatisticsProps) {
  const {t} = useTranslation();
  return (
    <div>
      <List outline dividers inset strong>
        <ListItem>
          <div slot="title">{t('Profile.Rating')}</div>
          <div slot="after">{statistics?.rating}</div>
        </ListItem>
        <ListItem>
          <div slot="title">{t('Profile.GamesPlayed')}</div>
          <div slot="after">{statistics?.gamesPlayed}</div>
        </ListItem>
        <ListItem>
          <div slot="title">{t('Profile.Wins')}</div>
          <div slot="after">{statistics?.wins}</div>
        </ListItem>
        <ListItem>
          <div slot="title">{t('Profile.Losses')}</div>
          <div slot="after">{statistics?.losses}</div>
        </ListItem>
        <ListItem>
          <div slot="title">{t('Profile.Draws')}</div>
          <div slot="after">{statistics?.draws}</div>
        </ListItem>
      </List>

      <PieChart
        style={{maxWidth: '300px', margin: 'auto'}}
        tooltip
        datasets={[
          {
            value: statistics?.wins,
            color: 'green',
            label: t('Profile.Wins'),
          },
          {
            value: statistics?.losses,
            color: 'red',
            label: t('Profile.Losses'),
          },
          {
            value: statistics?.draws,
            color: 'gray',
            label: t('Profile.Draws'),
          }
        ]}
      />
    </div>
  );
}