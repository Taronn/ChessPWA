import { IStatistic } from '../Shared/types';
import { Gauge, List, ListItem, PieChart } from 'framework7-react';

interface IStatisticsProps {
  statistics: IStatistic;
}

export function Statistics({ statistics }: IStatisticsProps) {
  const drawPercentage = statistics.draws / statistics.gamesPlayed;
  const winPercentage = statistics.wins / statistics.gamesPlayed;
  const lossPercentage = statistics.losses / statistics.gamesPlayed;
  return (
    <div>
      <List outline dividers>
        <ListItem>
          <div slot="title">Rating</div>
          <div slot="after">{statistics.rating}</div>
        </ListItem>
        <ListItem>
          <div slot="title">Games Played</div>
          <div slot="after">{statistics.gamesPlayed}</div>
        </ListItem>
        <ListItem>
          <div slot="title">Wins
            <Gauge
              className="margin-horizontal-half"
              size={50}
              valueFontSize={9}
              type="semicircle"
              value={winPercentage}
              valueText={`${(winPercentage * 100).toFixed(0)}%`}
              valueTextColor="green"
              borderColor="green"
            /></div>
          <div slot="after">{statistics.wins}</div>
        </ListItem>
        <ListItem>
          <div slot="title">Losses
            <Gauge
              className="margin-horizontal-half"
              size={50}
              valueFontSize={9}
              type="semicircle"
              value={lossPercentage}
              valueText={`${(lossPercentage * 100).toFixed(0)}%`}
              valueTextColor="red"
              borderColor="red"
            /></div>
          <div slot="after">{statistics.losses}</div>
        </ListItem>
        <ListItem>
          <div slot="title">Draws
            <Gauge
              className="margin-horizontal-half"
              size={50}
              valueFontSize={9}
              type="semicircle"
              value={drawPercentage}
              valueText={`${(drawPercentage * 100).toFixed(0)}%`}
              valueTextColor="gray"
              borderColor="gray"
            />
          </div>
          <div slot="after">{statistics.draws}</div>
        </ListItem>
      </List>

      <PieChart
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
            color: 'blue',
            label: 'Draws',
          }
        ]}
      />
    </div>
  );
}