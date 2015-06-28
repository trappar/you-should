/* global appState */
import {} from 'bootstrap';
import React from 'expose?React!react';
import Routes from './Routes';
import Router from 'react-router';
import UserActions from './actions/UserActions.js';

// This comes from the twig template
UserActions.setUser(appState.user);

Router.run(Routes, Router.HistoryLocation, (Handler, state) =>
  React.render(<Handler {...state} />, document.getElementById('root'))
);