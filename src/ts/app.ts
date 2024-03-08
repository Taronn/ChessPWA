// Import React and ReactDOM
import React from 'react';
import { createRoot } from 'react-dom/client';

// Import Framework7
import Framework7 from 'framework7/lite-bundle';

// Import Framework7-React Plugin
import Framework7React from 'framework7-react';

// Import Framework7 Styles
import 'framework7/css/bundle';

// Import Icons and App Custom Styles
import '../css/icons.css';
import '../css/app.css';

// Import App Component
import App from '../components/app';

// Init F7 React Plugin
Framework7.use(Framework7React);

import { Provider } from 'react-redux';
import { store } from '../redux/store';

// Mount React App
const root = createRoot(document.getElementById('app')!);
// @ts-expect-error - //
root.render(React.createElement(Provider, { store }, React.createElement(App)));
