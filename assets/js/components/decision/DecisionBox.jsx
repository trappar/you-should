import React from 'react';
import Question from './Question.jsx';
import Answer from './Answer.jsx';
import Config from './config/Config.jsx';
import DecisionActions from '../../actions/DecisionActions.js';
import AnswerStore from '../../stores/AnswerStore.js';
import AnswerActions from '../../actions/AnswerActions.js';
import AppConstants from '../../constants/AppConstants.js';

export default React.createClass({
  propTypes: {
    decision: React.PropTypes.object.isRequired
  },
  getInitialState: function() {
    return {
      answering: false,
      configuring: this.props.decision.added
    };
  },
  componentDidMount: function() {
    if (this.props.decision.added) {
      this.refs.question.focus();
    }
  },
  configure: function() {
    this.setState({
      configuring: !this.state.configuring,
      answering: false
    });
  },
  answer: function() {
    if (!this.state.answering) {
      if (AnswerStore.getAnswerStatus(this.props.decision.id) === AppConstants.ANSWER.POSSIBLE) {
        AnswerActions.new(this.props.decision.id);
      }
    }
    this.setState({answering: !this.state.answering});
  },
  remove: function() {
    DecisionActions.remove(this.props.decision);
  },
  handleQuestionChange: function(question) {
    this.props.decision.question = question;
    this._saveDecision();
  },
  handleThemeChange: function(theme) {
    this.props.decision.theme = theme;
    this._saveDecision();
  },
  _saveDecision: function() {
    DecisionActions.update(this.props.decision);
  },
  handleChoiceChange: function() {
    this.setState({answer: null});
  },
  render: function() {
    let decision = this.props.decision;
    return (
      <div className="decision">
        <Question ref="question" configuring={this.state.configuring} theme={decision.theme}
                  onClick={this.answer}
                  onQuestionChanged={this.handleQuestionChange}
                  onEdit={this.configure} onRemove={this.remove}>
          {decision.question}
        </Question>

        <Answer open={this.state.answering} decisionId={decision.id} theme={decision.theme}/>

        <Config open={this.state.configuring} decisionId={decision.id} theme={decision.theme}
                themeChanged={this.handleThemeChange}
                choiceChanged={this.handleChoiceChange}
                closeConfig={this.configure}/>
      </div>
    );
  }
});
