import { IStatistic } from '../Shared/types';
import { List, ListItem, PieChart } from 'framework7-react';

interface IStatisticsProps {
  statistics: IStatistic;
}

export function Statistics({ statistics }: IStatisticsProps) {
  return (
    <div>
      <List outline dividers inset strong>
        <ListItem>
          <div slot="title">Rating</div>
          <div slot="after">{statistics.rating}</div>
        </ListItem>
        <ListItem>
          <div slot="title">Games Played</div>
          <div slot="after">{statistics.gamesPlayed}</div>
        </ListItem>
        <ListItem>
          <div slot="title">Wins</div>
          <div slot="after">{statistics.wins}</div>
        </ListItem>
        <ListItem>
          <div slot="title">Losses</div>
          <div slot="after">{statistics.losses}</div>
        </ListItem>
        <ListItem>
          <div slot="title">Draws</div>
          <div slot="after">{statistics.draws}</div>
        </ListItem>
      </List>

      <PieChart
        style={{maxWidth: '300px', margin: 'auto'}}
        tooltip
        datasets={[
          {
            value: statistics.wins,
            color: 'green',
            label: 'Wins',
          },
          {
            value: statistics.losses,
            color: 'red',
            label: 'Losses',
          },
          {
            value: statistics.draws,
            color: 'gray',
            label: 'Draws',
          }
        ]}
      />
    </div>
  );
}