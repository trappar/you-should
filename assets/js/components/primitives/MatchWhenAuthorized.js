import React from 'react';
import {Match, Redirect} from 'react-router';

export default function MatchWhenAuthorized({ component: Component, user, ...rest }) {
  return (
    <Match {...rest} render={props => (
      user.loggedIn ? (
        <Component {...props}/>
      ) : (
        <Redirect to={{ pathname: '/login', state: { from: props.location } }}/>
      )
    )}/>
  );
}
