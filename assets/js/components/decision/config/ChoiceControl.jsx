import React, {PropTypes} from 'react';
import ChoiceActions from '../../../actions/ChoiceActions.js';
import DeleteButton from '../../primitives/DeleteButton.jsx';
import BootstrapSlider from '../../primitives/BootstrapSlider.jsx';

let ENTER_KEY_CODE = 13;
let PLACEHOLDER_CHOICE = 'Enter an option here!';

export default React.createClass({
  propTypes: {
    choice: PropTypes.object.isRequired
  },
  componentDidMount: function() {
    if (this.props.choice.added) {
      this.props.choice.added = false;
      React.findDOMNode(this.refs.choiceNameInput).focus();
    }
  },
  handleNameChange: function(event) {
    this.props.choice.name = event.target.value;
    ChoiceActions.update(this.props.choice);
  },
  handleSliderChange: function(value) {
    this.props.choice.priority = value;
    ChoiceActions.update(this.props.choice);
  },
  handleDelete: function() {
    ChoiceActions.remove(this.props.choice);
  },
  _onKeyDown: function(event) {
    if (event.keyCode === ENTER_KEY_CODE) {
      event.preventDefault();
      ChoiceActions.add(this.props.choice.decisionId);
    }
  },
  render: function() {
    let choice = this.props.choice;
    return (
      <div className="choice">
        <div className="form-group">
          <div className="col-xs-12">
            <div className="input-group">
              <input ref="choiceNameInput" type="text" className="form-control" value={choice.name}
                     onChange={this.handleNameChange} onKeyDown={this._onKeyDown}
                     placeholder={PLACEHOLDER_CHOICE}/>
                        <span className="input-group-btn">
                            <DeleteButton extraClasses="btn-default" onDelete={this.handleDelete}/>
                        </span>
            </div>
          </div>
        </div>
        <div className="form-group">
          <label className="col-xs-2 control-label">Priority</label>

          <div className="col-xs-10">
            <BootstrapSlider sliderOpts={{
                            min: 1,
                            max: 100,
                            step: 0.05,
                            value: choice.priority,
                            scale: 'logarithmic',
                            tooltip: 'hide'
                        }} onChange={this.handleSliderChange}/>
          </div>
        </div>
      </div>
    );
  }
});
