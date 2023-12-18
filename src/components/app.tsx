import {
  f7ready,
  App,
  View,
} from 'framework7-react';


import routes from '../ts/routes';
import store from '../ts/store';

const MyApp = () => {


  // Framework7 Parameters
  const f7params = {
    name: 'ChessPWA', // App name
      theme: 'auto', // Automatic theme detection

      darkMode: true,


      // App store
      store: store,
      // App routes
      routes: routes,

      // Register service worker (only on production build)
      serviceWorker: process.env.NODE_ENV ==='production' ? {
        path: '/service-worker.ts',
      } : {},
  };

  f7ready(() => {


    // Call F7 APIs here
  });

  return (
    <App { ...f7params }>

        {/* Your main view, should have "view-main" class */}
        <View main className="safe-areas" url="/" />

    </App>
  );
}
export default MyApp;