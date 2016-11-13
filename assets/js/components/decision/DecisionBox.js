import React, { Component, PropTypes } from 'react';
import Question from './Question.js';
import Answer from './Answer.js';
import { observer } from 'mobx-react';
import Config from './config/Config.js';

@observer
export default class DecisionBox extends Component {
  constructor(props) {
    super(props);

    this.decision = props.decision;
    this.UI = this.decision.UI;
  }

  componentDidMount() {
    if (this.decision.added) {
      this._question.focus();
    }
  }

  save = () => this.decision.save();
  cancel = () => {
    const removeDecision = this.decision.cancel();
    if (removeDecision) {
      this.props.onRemove();
    }
  };

  render() {
    return (
      <div className="decision">
        <Question
          ref={c => this._question = c}
          decision={this.decision}
          onRemove={this.props.onRemove}
        />

        <Answer
          decision={this.decision}
        />

        <Config
          decision={this.decision}
          onCancel={this.cancel}
          onSave={this.save}
        />
      </div>
    );
  }
}
DecisionBox.propTypes = {
  decision: PropTypes.object.isRequired,
  onRemove: PropTypes.func
};
