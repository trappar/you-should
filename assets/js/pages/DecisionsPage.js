import React from 'react';
import DocumentTitle from 'react-document-title';
import DecisionsContainer from '../components/decision/DecisionsContainer.js';

export default function DecisionsPage(props) {
  return (
    <div>
      <DocumentTitle title="Decisions | You Should"/>
      <div className="container-fluid">
        <h1>Your Decisions</h1>
        <hr/>
      </div>

      <DecisionsContainer />
    </div>
  );
}
