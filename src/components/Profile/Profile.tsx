import {  Button, Icon, Link } from 'framework7-react';
import { IUser } from '../Shared/types';
import { useState } from 'react';
import { ChessTypeSelector } from './ChessTypeSelector';
import { GameType } from '../Shared/constants';
import { Statistics } from './Statistics';
import { SettingsPanel } from './SettingsPanel';
import { FriendsPanel } from './FriendsPanel';
import { useTranslation } from 'react-i18next';
import countries from 'i18n-iso-countries';
interface IProfileProps {
  user: IUser;
}
export function Profile({user}:IProfileProps) {
  const {t, i18n} = useTranslation();
  const [statsType, setStatsType] = useState(GameType.RAPID);
  const countryName = countries.getName(user.country, i18n.language);
  return (
    <div className="margin-top padding-horizontal" style={{maxWidth: '800px', margin: '0 auto'}}>
      <div className="display-flex justify-content-space-between padding-vertical-half">
        <div>
          <h2 className="no-margin">{`${user.firstName ?? ''} ${user.lastName ?? ''}`}</h2>
          <div className="display-flex">
            <h4 className="no-margin">{user.username}</h4>
            <Icon className="margin-left-half" tooltip={countryName} tooltipTrigger="click">
              <img
                src={`https://flagcdn.com/${user?.country || 'am'}.svg`}
                width="24"
                alt={user.country}
              />
            </Icon>
          </div>
          <Link text={`18 ${t('Common.Friends')}`} iconF7="person_2" iconSize={18} className="margin-top-half"
                panelOpen="#friends-panel" />
        </div>
        <div>
          {user.picture ?
            <img style={{ borderRadius: '50%' }} src={user.picture} alt={user.username} width="80" height="80" /> :
            <Icon f7="person_crop_circle_badge" size={80} />}
        </div>
      </div>
      <div className="grid grid-cols-2 grid-gap margin-top">
        <Button outline round iconF7="pencil" iconSize={20} text={t('Profile.EditProfile')}/>
        <Button outline round iconF7="link" iconSize={15} text={t('Profile.ShareProfile')} />
      </div>
      <hr className="margin-vertical"/>
      <ChessTypeSelector type={statsType} setType={setStatsType}/>
      <Statistics statistics={user.statistics.find((val)=> val.type === statsType)!}/>
      <SettingsPanel/>
      <FriendsPanel/>
    </div>
  );
}
