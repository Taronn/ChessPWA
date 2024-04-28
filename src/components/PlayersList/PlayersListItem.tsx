import { Icon, ListItem, SwipeoutActions, SwipeoutButton } from 'framework7-react';
import { RatingChip } from '../Shared/RatingChip';
import countries from 'i18n-iso-countries';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { SendInviteModal } from '../Shared/SendInviteModal';
import { IPlayer } from '../Shared/types';

interface IPlayersListItemProps {
  slot: string;
  player: IPlayer;
  showRating?: boolean;
}

export function PlayersListItem({ slot, player, showRating = true }: IPlayersListItemProps) {
  const { t, i18n } = useTranslation();
  const [showSendInviteModal, setShowSendInviteModal] = useState(false);
  const maxStat = player.statistics.reduce((max, stat) => (stat.rating > max.rating ? stat : max), player.statistics[0]);
  const countryName = countries.getName(player.country, i18n.language);

  return (
    <ListItem swipeout title={player.username} slot={slot}>
      <Icon slot="media" ios="f7:person" md="material:person" />
      <Icon slot="after-title" className="margin-left-half" tooltip={countryName} tooltipTrigger="click">
        <img src={`https://flagcdn.com/${player.country ?? 'am'}.svg`} width="24" alt={player.country} />
      </Icon>
      {showRating && <RatingChip statistic={maxStat} slot="after" />}

      <SwipeoutActions left>
        <SwipeoutButton delete confirmText={t('PlayersList.RemoveMessage', { username: player.username })} confirmTitle=" ">
          {t('PlayersList.Remove')}
        </SwipeoutButton>
      </SwipeoutActions>
      <SwipeoutActions right>
        <SwipeoutButton color=" " onClick={() => setShowSendInviteModal(true)}>
          {t('PlayersList.Play')}
        </SwipeoutButton>
      </SwipeoutActions>
      <SendInviteModal opened={showSendInviteModal} setOpened={setShowSendInviteModal} player={player} />
    </ListItem>
  );
}
