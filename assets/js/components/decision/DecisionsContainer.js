import React from 'react';
import { observer } from 'mobx-react';
import DecisionBox from './DecisionBox.js';
import Icon from '../primitives/Icon';
import MediaQuery from 'react-responsive';
import DecisionStore from '../../stores/DecisionStore';
import UserStore from '../../stores/UserStore';
import StandardAlerts from '../primitives/StandardAlerts';

@observer(['decisions', 'user'])
export default class DecisionsContainer extends React.Component {
  decisions;

  constructor(props) {
    super(props);
    this.decisions = props.decisions;
  }

  addDecision() {
    this.decisions.add();
  }

  removeDecision(decision) {
    this.decisions.remove(decision);
  }

  splitDecisions(columns, renderedDecisions) {
    const chunks = [];
    for (let i = 0; i < columns; i++) {
      chunks.push(renderedDecisions.filter((v, j) => j % columns === i))
    }
    return chunks.map((chunk, i) => (
      <div key={i} className={'col-xs-' + 12 / columns}>
        {chunk}
      </div>
    ));
  }

  render() {
    const renderedDecisions = this.decisions.all().map(decision => (
      <DecisionBox
        key={`decision-${decision.id}`}
        decision={decision}
        onRemove={() => this.removeDecision(decision)}
      />
    ));
    renderedDecisions.push((
      <div key="add-decision" onClick={() => this.addDecision()}>
        <div className="add-decision">
          <Icon type="plus"/>
        </div>
      </div>
    ));

    return (
      <div className="decisions-container">
        <MediaQuery className="row" minWidth={1200}>
          {this.splitDecisions(3, renderedDecisions)}
        </MediaQuery>
        <MediaQuery className="row" minWidth={768} maxWidth={1199}>
          {this.splitDecisions(2, renderedDecisions)}
        </MediaQuery>
        <MediaQuery className="row" maxWidth={767}>
          <div/>
          <div className="col-xs-12 col-no-padding">
            {renderedDecisions}
          </div>
        </MediaQuery>
      </div>
    );
  }
}

DecisionsContainer.wrappedComponent.propTypes = {
  decisions: React.PropTypes.instanceOf(DecisionStore),
  user: React.PropTypes.instanceOf(UserStore),
};
