import React from 'react';
import Redirect from 'react-router/Redirect'
import { observer } from 'mobx-react';
import { observable } from 'mobx';

@observer(['alerts', 'user', 'decisions'])
export default class LogoutPage extends React.Component {
  @observable redirect = false;

  constructor(props) {
    super(props);

    fetch('/logout', { credentials: 'include' })
      .then(response => {
        if (response.ok) {
          this.props.user.logout();
          this.props.decisions.logout();
          this.redirect = true;
        } else {
          this.props.alerts.setError('There was a problem logging you out.');
          this.redirect = true;
        }
      });
  }

  render() {
    return (
      <div className="centerOfScreen">
        <div>
          {this.redirect && <Redirect to="/"/>}
          <h1>Logging you out...</h1>
        </div>
      </div>
    );
  }
}