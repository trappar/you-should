import React from 'react';
import Question from './Question.js';
import Answer from './Answer.js';
import {observer} from 'mobx-react';
import Config from './config/Config.js';

@observer
export default class DecisionBox extends React.Component {
  decision;
  UI;

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

  save() {
    this.decision.save();
  }

  cancel() {
    const removeDecision = this.decision.cancel();
    if (removeDecision) {
      this.props.onRemove();
    }
  }

  render() {
    return (
      <div className="decision">
        <Question
          ref={c => this._question = c}
          decision={this.decision}
          onRemove={() => this.props.onRemove()}
        />

        <Answer
          decision={this.decision}
        />

        <Config
          decision={this.decision}
          onCancel={() => this.cancel()}
          onSave={() => this.save()}
        />
      </div>
    );
  }
}

DecisionBox.propTypes = {
  decision: React.PropTypes.object.isRequired,
  onRemove: React.PropTypes.func
};

// React.createClass({
//   configure: function() {
//     this.setState({
//       configuring: !this.state.configuring,
//       answering: false
//     });
//   },
//   answer: function() {
//     if (!this.state.answering) {
//       if (AnswerStore.getAnswerStatus(this.props.decision.id) === AppConstants.ANSWER.POSSIBLE) {
//         AnswerActions.new(this.props.decision.id);
//       }
//     }
//     this.setState({answering: !this.state.answering});
//   },
//   remove: function() {
//     DecisionActions.remove(this.props.decision);
//   },
//   handleQuestionChange: function(question) {
//     this.props.decision.question = question;
//     this._saveDecision();
//   },
//   handleThemeChange: function(theme) {
//     this.props.decision.theme = theme;
//     this._saveDecision();
//   },
//   _saveDecision: function() {
//     DecisionActions.update(this.props.decision);
//   },
//   handleChoiceChange: function() {
//     this.setState({answer: null});
//   },
//   // render: function() {
//   //   let decision = this.props.decision;
//   //   return (
//   //     <div className="decision">
//   //       <Question ref="question" configuring={this.state.configuring} theme={decision.theme}
//   //                 onClick={this.answer}
//   //                 onQuestionChanged={this.handleQuestionChange}
//   //                 onEdit={this.configure} onRemove={this.remove}>
//   //         {decision.question}
//   //       </Question>
//   //
//   //       <Answer open={this.state.answering} decisionId={decision.id} theme={decision.theme}/>
//   //
//   //       <Config open={this.state.configuring} decisionId={decision.id} theme={decision.theme}
//   //               themeChanged={this.handleThemeChange}
//   //               choiceChanged={this.handleChoiceChange}
//   //               closeConfig={this.configure}/>
//   //     </div>
//   //   );
//   // }
// });
