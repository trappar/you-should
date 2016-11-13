import React, { Component } from 'react';
import NavItem from './NavItem';
import { Link } from 'react-router';
import { observer } from 'mobx-react';

@observer(['user'])
export default class Navigation extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-inverse navbar-fixed-top">
        <button className="navbar-toggler hidden-sm-up" type="button" data-toggle="collapse"
                data-target="#navbarResponsive"
                aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"/>
        <div className="collapse navbar-toggleable-xs" id="navbarResponsive">
          <Link to="/" className="navbar-brand">You Should</Link>
          <ul className="nav navbar-nav">
            <NavItem to="/" activeOnlyWhenExact={true}>News</NavItem>
            <NavItem to="/decisions">Decisions</NavItem>
            <div className="float-sm-right">
              {
                this.props.user.loggedIn ?
                  <div>
                    <NavItem to="/user">{this.props.user.username}</NavItem>
                    <NavItem to="/logout">Logout</NavItem>
                  </div>
                  : <NavItem to="/login">Login</NavItem>
              }
            </div>
          </ul>
        </div>
      </nav>
    );
  }
}
