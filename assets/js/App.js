import React, { PropTypes } from 'react';
import { RouteHandler } from 'react-router';
import Navigation from './components/navigation/Navigation.jsx';

export default React.createClass({
  propTypes: {
    params: PropTypes.object.isRequired,
    query: PropTypes.object.isRequired
  },
  render: function() {
    return (
      <div className='App'>
        <Navigation />

        <div className="container" role="main">
          <RouteHandler {...this.props} />
        </div>
      </div>
    );
  }
});
