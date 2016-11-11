/* global appState */
import React from 'expose?React!react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './App';
import AppStores from './stores/AppStores';
import 'whatwg-fetch';

const appStores = new AppStores(appState);

const renderApp = (App) => {
  render((
    <AppContainer>
      <App stores={appStores}/>
    </AppContainer>
  ), document.getElementById('root'));
};

renderApp(App);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./App', () => renderApp(require('./App').default));
}
