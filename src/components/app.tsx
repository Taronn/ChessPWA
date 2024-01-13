import { f7ready, App, View, Preloader } from 'framework7-react';

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

const MyApp = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(true);

  f7ready((f7) => {
    // Call F7 APIs here
  });

  useEffect(() => {
    setTimeout(() => {
      const res = false;
      if (res) {
        dispatch(setTheme('ios'));
        dispatch(setDarkMode(true));
        dispatch(setColorTheme('#ffffff'));
      } else {
        const theme = localStorage.getItem('theme');
        const colorTheme = localStorage.getItem('colorTheme');
        const darkMode = localStorage.getItem('darkMode');
        if (!theme || !colorTheme || !darkMode) {
          dispatch(setTheme('auto'));
          dispatch(setDarkMode('auto'));
          dispatch(setColorTheme('#000000'));
        } else {
          dispatch(setTheme(theme));
          dispatch(setDarkMode(darkMode === 'true'));
          console.log(colorTheme);
          dispatch(setColorTheme(colorTheme));
        }
      }
      setLoading(false);
    }, 5000);
  }, []);

  const f7params = {
    name: 'ChessPWA', // App name
    theme: localStorage.getItem('theme')!, // Automatic theme detection
    darkMode: localStorage.getItem('darkMode')!, // Automatic dark theme detection
    colors: {
      primary: localStorage.getItem('colorTheme')!,
    },
    colorTheme: localStorage.getItem('colorTheme')!,
    color: localStorage.getItem('colorTheme')!,

    // App routes
    routes,

    // Register service worker (only on production build)
    serviceWorker:
      process.env.NODE_ENV === 'production'
        ? {
            path: '/service-worker.ts',
          }
        : {},
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
          <img src={logo} style={{ width: '100px' }} />
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
