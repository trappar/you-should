import React, {PropTypes} from 'react';
import classNames from 'classnames';
import Button from '../../primitives/Button.jsx';
import ThemePicker from './theme-picker/ThemePicker.jsx';
import ChoiceControl from './ChoiceControl.jsx';
import ChoiceActions from '../../../actions/ChoiceActions.js';
import ChoiceStore from '../../../stores/ChoiceStore.js';

function getStateFromStores(decisionId) {
  return {
    choices: ChoiceStore.getChoicesByDecisionId(decisionId),
    addingChoice: false
  };
}

export default React.createClass({
  propTypes: {
    decisionId: PropTypes.number.isRequired,
    open: PropTypes.bool,
    theme: PropTypes.string.isRequired,
    themeChanged: PropTypes.func.isRequired,
    closeConfig: PropTypes.func.isRequired
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
    ChoiceStore.addChangeListener(this._onStoreChange);
  },
  componentWillUnmount: function() {
    ChoiceStore.removeChangeListener(this._onStoreChange);
  },
  _onStoreChange: function() {
    this.setState(getStateFromStores(this.props.decisionId));
  },
  addChoice: function(event) {
    event.preventDefault();
    this.setState({addingChoice: true});
    ChoiceActions.add(this.props.decisionId);
  },
  render: function() {
    let configClasses = classNames('config', 'row', {open: this.props.open});
    let choicesControls = this.state.choices.map((choice) => {
      return <ChoiceControl key={choice.id} choice={choice}/>;
    });
    return (
      <div className={configClasses}>
        <h3>Choices</h3>

        <div className="form-horizontal">
          {choicesControls}
          <div className={classNames('row', 'add-choice', {loading: this.state.addingChoice})}>
            <div className="col-xs-12">
              <a onClick={this.addChoice}>
                <span className="glyphicon glyphicon-plus"></span> Add Choice
              </a>
            </div>
          </div>
          <ThemePicker currentTheme={this.props.theme} themeChanged={this.props.themeChanged}/>
        </div>

        <div className="row">
          <div className="col-xs-offset-2 col-xs-8">
            <Button extraClasses={`btn-${this.props.theme} form-control`} onClick={this.props.closeConfig}>
              Close
            </Button>
          </div>
        </div>
      </div>
    );
  }
});
