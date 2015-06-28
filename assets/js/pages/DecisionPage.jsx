import React from 'react';
import DecisionsContainer from '../components/decision/DecisionsContainer.jsx';

export default React.createClass({
  render: function() {
    return (
      <div>
        <h1>Your Decisions</h1>
        <DecisionsContainer />
      </div>
    );
  }
});