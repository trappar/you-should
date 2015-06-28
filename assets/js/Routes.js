import React from 'react';
import { Route, DefaultRoute } from 'react-router';
import App from './App';
import Index from './pages/Index.jsx';
import DecisionsPage from './pages/DecisionPage.jsx';

export default (
  <Route handler={App}>
    <DefaultRoute name="homepage" handler={Index}/>
    <Route name="decisions" path="/decisions" handler={DecisionsPage}/>
  </Route>
);
