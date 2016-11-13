import React from 'react';
import DocumentTitle from 'react-document-title';
import DecisionsContainer from '../components/decision/DecisionsContainer.js';
import StandardAlerts from '../components/primitives/StandardAlerts';
import {observer} from 'mobx-react';

export default observer(['decisions'], DecisionsPage);

function DecisionsPage(props) {
  return (
    <div>
      <DocumentTitle title="Decisions | You Should"/>
      <div className="container-fluid">
        <h1>Your Decisions</h1>
        <StandardAlerts alerts={props.decisions.alerts}/>
        <hr/>
      </div>

      <DecisionsContainer />
    </div>
  );
}
