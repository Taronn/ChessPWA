import { App, View } from 'framework7-react';

import routes from '../ts/routes';
import '../ts/i18n';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import {
  setColorTheme,
  setDarkMode,
  setTheme,
} from '../redux/slices/appSettingsSlice';
import logo from '../assets/chess.svg';
import { useTranslation } from 'react-i18next';
import { refreshTokens, useIsnFetch } from '../hooks/useFetch';
import { setUser } from '../redux/slices/userSlice';

const MyApp = () => {
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
      theme = user.Settings.Theme;
      darkMode = user.Settings.DarkMode;
      colorTheme = user.Settings.ColorTheme;
      i18n.changeLanguage(user.Settings.Language);
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

  return (
    <>
      {loading ? (
        <div style={loadingStyle}>
          <img src={logo} style={{ width: '100px' }}  alt={'Logo'}/>
        </div>
      ) : (
        <App {...f7params}>
          <View
            main
            browserHistory
            browserHistorySeparator=""
            className="safe-areas"
            url="/"
          />
        </App>
      )}
    </>
  );
};
export default MyApp;
