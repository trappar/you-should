import React, { Component, PropTypes } from 'react';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';
import Input from '../components/forms/Input';
import Button from '../components/primitives/Button';
import Validator from '../components/forms/Validator';
import ReactTransitionGroup from 'react-addons-transition-group';
import AnimateHideShow from '../components/primitives/AnimateHideShow';
import StandardAlerts from '../components/primitives/StandardAlerts';
import { Redirect, Link } from 'react-router';
import UserStore from '../stores/UserStore';
import AlertStore from '../stores/AlertStore';
import DocumentTitle from 'react-document-title';

@observer(['user', 'alerts', 'decisions'])
export default class LoginPage extends Component {
  @observable registering = false;
  @observable loading = false;

  constructor(props) {
    super(props);
    this.updateRegisteringBasedOnLocation(props);
    this.alerts = props.alerts.getChild('login-page');
    this.inputs = [];
  }

  componentWillReceiveProps(nextProps) {
    this.updateRegisteringBasedOnLocation(nextProps);
  }

  updateRegisteringBasedOnLocation(props) {
    this.registering = props.params[0] === 'register';
  }

  login = (event) => {
    event.preventDefault();

    if (!this.loading) {
      this.loading = true;
      fetch('/user/auth.json', {
        method: 'POST',
        body: new FormData(this.form),
        credentials: 'include'
      })
        .then(response => response.json())
        .then(action('login-response', json => {
          this.loading = false;
          if (json.error) {
            this.alerts.setError(json.error);
          } else {
            this.alerts.clearAll(true);
            this.props.user.update(json);
            this.props.decisions.fetchIfNeeded();
          }
        }))
        .catch(action('login-server-error', error => {
          this.loading = false;
          this.alerts.setError('An unknown error occurred.');
        }));
    }
  };

  register = (event) => {
    event.preventDefault();

    this.inputs.forEach(input => input.validating = true);

    let valid = true;
    this.inputs
      .filter(input => input.errors.length)
      .forEach(input => {
        input.shake();
        valid = false;
      });

    if (valid) {
      if (!this.loading) {
        this.loading = true;
        fetch('/user/register.json', {
          method: 'POST',
          body: new FormData(this.form)
        })
          .then(response => response.json())
          .then(json => {
            if (json.error) {
              this.alerts.setError(json.error);
            } else {
              this.alerts.clearErrors();
              this.alerts.setSuccess(json.success);
            }
            this.loading = false;
          })
          .catch(error => {
            this.alerts.setError('An unknown error occurred.');
            this.loading = false;
          });
      }
    }
  };

  renderInputs() {
    const username = (
      <Validator key="username" enabled={this.registering} refStore={this.inputs}
                 validators={[Validator.constraint.length.min(4), Validator.constraint.length.max(25)]}>
        <Input name="username" label="Username" autoComplete="off" autoCorrect="off" autoCapitalize="off"
               spellCheck="false"/>
      </Validator>
    );
    const password = (
      <Validator key="password" enabled={this.registering} refStore={this.inputs} ref={c => this.passwordValidator = c}
                 validators={[Validator.constraint.length.min(6)]}>
        <Input name="plainPassword" label="Password" type="password"/>
      </Validator>
    );

    let inputs;
    if (this.registering) {
      inputs = [
        username,
        (
          <Validator key="email" refStore={this.inputs} validators={[
            Validator.constraint.notBlank,
            Validator.constraint.email,
            Validator.constraint.length.max(100)
          ]}>
            <Input name="email" type="email" label="Email Address"/>
          </Validator>
        ),
        password,
        (
          <Validator key="passwordConfirm" refStore={this.inputs} validators={[
            Validator.constraint.notBlank,
            ['The passwords must match', value => value !== this.passwordValidator.value]
          ]}>
            <Input label="Confirm Password" type="password"/>
          </Validator>
        ),
      ];
    } else {
      inputs = [
        username,
        password,
      ];
    }

    return inputs;
  }

  render() {
    const location = this.props.location;
    const referrer = location.state && location.state.from;
    const from = referrer || '/';
    const title = this.registering ? 'Register' : 'Login';

    return (
      <div id="login-page" className="container">
        {this.props.user.loggedIn && (
          <Redirect to={from}/>
        )}

        <DocumentTitle title={title + " | You Should"}/>

        <h1>{title}</h1>
        <hr/>

        {!this.registering && referrer && (
          <div className="text-danger">You must login first.</div>
        )}

        <div className="row">
          <div className="col-lg-4 col-lg-offset-4 col-sm-8 col-sm-offset-2 col-xs-12">
            <StandardAlerts alerts={this.alerts}/>
            <form onSubmit={this.registering ? this.register : this.login} ref={c => this.form = c}>
              <br/>
              <ReactTransitionGroup>
                {this.renderInputs().map(input => {
                  return <AnimateHideShow key={input.key}>{input}</AnimateHideShow>;
                })}
              </ReactTransitionGroup>
              <Button type="submit" extraClasses="btn-primary btn-block btn-lg" disabled={this.loading}>
                {this.registering ? 'Sign Up' : 'Sign In'}
              </Button>
            </form>
            <br/>
            <Link to={this.registering ? '/login' : '/register'}>
              {this.registering ? 'Already have an account?' : 'Don\'t have an account?'}
            </Link>
          </div>
        </div>

        {
          this.registering &&
          <p className="text-muted" style={{ textAlign: 'center' }}>
            <br/>
            We'll never send you any unsolicited emails or give out your information. Emails are only collected to allow
            for password recovery.
          </p>
        }
      </div>
    );
  }
}
LoginPage.wrappedComponent.propTypes = {
  user: PropTypes.instanceOf(UserStore),
  alerts: PropTypes.instanceOf(AlertStore),
};
