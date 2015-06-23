import React, {PropTypes} from 'react';
import Button from '../primitives/Button.jsx';
import classNames from 'classnames';
import AnswerStore from '../../stores/AnswerStore.js';
import AnswerActions from '../../actions/AnswerActions.js';
import AppConstants from '../../constants/AppConstants.js';

function getStateFromStores(decisionId) {
  return {
    answer: AnswerStore.getAnswer(decisionId),
    status: AnswerStore.getAnswerStatus(decisionId)
  };
}

export default React.createClass({
  propTypes: {
    theme: PropTypes.string.isRequired,
    open: PropTypes.bool,
    decisionId: PropTypes.number.isRequired
  },
  getDefaultProps: function() {
    return {
      open: false
    };
  },
  getInitialState: function() {
    return getStateFromStores(this.props.decisionId);
  },
  componentWillMount: function() {
    AnswerStore.addChangeListener(this._onStoreChange);
  },
  componentWillUnmount: function() {
    AnswerStore.removeChangeListener(this._onStoreChange);
  },
  render: function() {
    let answerClasses = classNames('answer', 'row', this.props.theme, {
      open: this.props.open,
      loading: this.state.status === AppConstants.ANSWER.POSSIBLE
    });

    return (
      <div className={answerClasses}>
        {this._getTextByState(this.state)}
        {this._getControlsByState(this.state)}
      </div>
    );
  },
  _onStoreChange: function() {
    this.setState(getStateFromStores(this.props.decisionId));
  },
  _logActivity: function() {
    AnswerActions.logActivity(this.state.answer);
  },
  _loadAnotherAnswer: function() {
    AnswerActions.new(this.props.decisionId);
  },
  _getTextByState: function() {
    let text;
    switch (this.state.status) {
      case AppConstants.ANSWER.EXISTS:
      case AppConstants.ANSWER.DONE:
        text = (
          <div className="pull-left">
            {this.state.answer.name}
          </div>
        );
        break;
      case AppConstants.ANSWER.POSSIBLE:
        text = 'Loading...';
        break;
      case AppConstants.ANSWER.IMPOSSIBLE:
        text = 'No choices have been defined yet.';
        break;
    }

    return text;
  },
  _getControlsByState: function() {
    let controls;
    switch (this.state.status) {
      case AppConstants.ANSWER.EXISTS:
        controls = (
          <div className="controls pull-right">
            <Button key="okay" extraClasses="btn-success" onClick={this._logActivity}>
              <span className="glyphicon glyphicon-ok"></span>
              &nbsp;OK!
            </Button>
            <Button extraClasses="btn btn-danger" onClick={this._loadAnotherAnswer}>
              <span className="glyphicon glyphicon-remove"></span>
              &nbsp;No way!
            </Button>
          </div>
        );
        break;
      case AppConstants.ANSWER.DONE:
        controls = (
          <div className="controls pull-right">
            <Button key="another" extraClasses="btn-success" onClick={this._loadAnotherAnswer}>
              Give me another!
            </Button>
          </div>
        );
        break;
    }

    return controls;
  }
});
