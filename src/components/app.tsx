import { App, View } from 'framework7-react';
import routes from '../ts/routes';
import '../ts/i18n';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { setColorTheme, setDarkMode, setTheme } from '../redux/slices/appSettingsSlice';

// @ts-expect-error - This is a valid import statement
import logo from '../assets/chess.svg';
import { useTranslation } from 'react-i18next';
import { refreshTokens, useIsnFetch } from '../hooks/useFetch';
import { setUser } from '../redux/slices/userSlice';
import countries from 'i18n-iso-countries';
import en from 'i18n-iso-countries/langs/en.json';
import ru from 'i18n-iso-countries/langs/ru.json';
import hy from 'i18n-iso-countries/langs/hy.json';
import { useEnvVars } from '../hooks/useEnvVars';
import { useSignalR } from '../hooks/useSignalR';
import { ReceiveInviteModal } from './Shared/ReceiveInviteModal';
import { IInvite } from './Shared/types';
import { Color, GameType, Languages, Themes } from './Shared/constants';

const MyApp = () => {
  const {dotnetURL} = useEnvVars();
  const {SignalRContext} = useSignalR();
  countries.registerLocale(en);
  countries.registerLocale(ru);
  countries.registerLocale(hy);
  const { t, i18n } = useTranslation();
  const {get} = useIsnFetch(`/users/me`)
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(true);

  async function getUser() {
    const isAuth = await refreshTokens();
    localStorage.setItem('isLoggedin', isAuth.toString());
    let theme = localStorage.getItem('theme') || 'auto';
    let darkMode = localStorage.getItem('darkMode') === 'true';
    let colorTheme = localStorage.getItem('colorTheme') || '#0000FF';
    if (isAuth){
      const user = await get();
      dispatch(setUser(user));
      theme = Themes[user.settings.theme];
      darkMode = user.settings.darkMode;
      colorTheme = user.settings.colorTheme;
      i18n.changeLanguage(Languages[user.settings.language]);
    }
    dispatch(setTheme(theme));
    dispatch(setDarkMode(darkMode));
    dispatch(setColorTheme(colorTheme));
    setLoading(false);
  }

  useEffect(() => {
    getUser();
  }, []);

  const f7params = {
    name: 'Chess',
    theme: localStorage.getItem('theme')!,
    darkMode: localStorage.getItem('darkMode')!,
    colors: {
      primary: localStorage.getItem('colorTheme')!,
    },
    colorTheme: localStorage.getItem('colorTheme')!,
    color: localStorage.getItem('colorTheme')!,

    // App routes
    routes,

    dialog: {
      buttonOk: t('Common.Ok'),
      buttonCancel: t('Common.Cancel'),
    },

    // Register service worker (only on production build)
    serviceWorker: {
      path: '../service-worker.js',
    },
  };

  const loadingStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  };

  const invite: IInvite = {
    from: {
      username: 'test',
      country: 'am',
      statistics: [
        {
          rating: 1500,
          type: GameType.RAPID,
        },
        {
          rating: 1500,
          type: GameType.BLITZ,
        },
        {
          rating: 1500,
          type: GameType.BULLET,
        }
      ],
    },
    fromColor: Color.WHITE,
    to:{
      username: 'test111111111',
      country: 'am',
      statistics: [
        {
          rating: 1500,
          type: GameType.RAPID,
        },
        {
          rating: 1500,
          type: GameType.BLITZ,
        },
        {
          rating: 1500,
          type: GameType.BULLET,
        }
      ],
    },
    toColor: Color.BLACK,
    initialTime: 30,
    bonusTime: 5,
  }

  return (
    <>
      {loading ? (
        <div style={loadingStyle}>
          <img src={logo} style={{ width: '100px' }}  alt={'Logo'}/>
        </div>
      ) : (
        <SignalRContext.Provider url={`${dotnetURL}/chess-hub`}
                                 withCredentials={true}
                                 connectEnabled={localStorage.getItem('isLoggedin') === 'true'}
                                 accessTokenFactory={() => localStorage.getItem('accessToken')!}
        >
          <App {...f7params}>
            <View
              main
              browserHistory
              browserHistorySeparator=""
              className="safe-areas"
              url="/play"
            />

            <ReceiveInviteModal opened={false} setOpened={()=>console.log('')} invite={invite}/>
          </App>
        </SignalRContext.Provider>
      )}
    </>
  );
};
export default MyApp;
