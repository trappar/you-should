import React, { Component, PropTypes } from 'react';
import { BrowserRouter, Match, Miss } from 'react-router';
import MatchWhenAuthorized from './components/primitives/MatchWhenAuthorized';
import { Provider } from 'mobx-react';
import Navigation from './components/navigation/Navigation';
import NewsPage from './pages/NewsPage';
import LoginPage from './pages/LoginPage';
import DecisionsPage from './pages/DecisionsPage';
import LogoutPage from './pages/LogoutPage';
import NoMatch from './pages/NoMatch';
import 'bootstrap/dist/js/bootstrap';

let DevTools;
if (process.env.NODE_ENV === 'development') {
  DevTools = require('mobx-react-devtools').default;
} else {
  DevTools = () => null;
}

export default class App extends Component {
  render() {
    const user = this.props.stores.user;

    return (
      <BrowserRouter>
        <Provider {...this.props.stores}>
          <div>
            <Navigation />
            <Match pattern="/" exactly={true} component={NewsPage}/>
            <Match pattern="/(login|register)" component={LoginPage}/>
            <MatchWhenAuthorized pattern="/decisions" component={DecisionsPage} user={user}/>
            <MatchWhenAuthorized pattern="/logout" component={LogoutPage} user={user}/>
            <Miss component={NoMatch}/>
            <DevTools/>
          </div>
        </Provider>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  stores: PropTypes.object.isRequired
};
