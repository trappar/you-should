import React from 'react';
import Router, {Link} from 'react-router';
import NavItem from './NavItem.jsx';

export default React.createClass({
  render: function() {
    return (
      <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar"
                    aria-expanded="false" aria-controls="navbar">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link to="homepage" className="navbar-brand">You Should</Link>
          </div>
          <div id="navbar" className="navbar-collapse collapse">
            <ul className="nav navbar-nav">
              <NavItem to="homepage">Home</NavItem>
              <NavItem to="decisions">Decisions</NavItem>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li><a href="#">Your Profile</a></li>
              <li><a href="#">Logout</a></li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
});
