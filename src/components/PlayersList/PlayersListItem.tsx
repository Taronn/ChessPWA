import { Icon, ListItem, SwipeoutActions, SwipeoutButton } from 'framework7-react';
import { RatingChip } from '../Shared/RatingChip';
import countries from 'i18n-iso-countries';
import { useTranslation } from 'react-i18next';

export function PlayersListItem({slot, player}) {
  const {t, i18n} = useTranslation();
  const maxStat = player.statistics.reduce((max, stat) => (stat.rating > max.rating) ? stat : max, player.statistics[0]);
  const countryName = countries.getName(player.country, i18n.language);

    return (
      <ListItem swipeout title={player.username} slot={slot}>
        <Icon slot="media" ios="f7:person" md="material:person"/>
        <Icon slot='after-title' className='margin-left-half' tooltip={countryName} tooltipTrigger="click">
          <img
            src={`https://flagcdn.com/${player.country}.svg`}
            width="24"
            alt={player.country}
          />
        </Icon>
        <RatingChip statistic={maxStat} slot="after" />

        <SwipeoutActions left>
          <SwipeoutButton delete confirmText={t('PlayersList.RemoveMessage', {username: player.username})} confirmTitle=" ">
            {t('PlayersList.Remove')}
          </SwipeoutButton>
        </SwipeoutActions>
        <SwipeoutActions right>
          <SwipeoutButton color=" ">
            {t('PlayersList.Play')}
          </SwipeoutButton>
        </SwipeoutActions>
      </ListItem>
    );
}