import React, { Component, PropTypes } from 'react';
import DeleteButton from '../../primitives/DeleteButton.js';
import BootstrapSlider from '../../primitives/BootstrapSlider.js';
import Choice from '../../../stores/Choice';
import { observer } from 'mobx-react';

let ENTER_KEY_CODE = 13;
let PLACEHOLDER_CHOICE = 'Enter an option here!';

@observer
export default class ChoiceControl extends Component {
  constructor(props) {
    super(props);
    this.choice = props.choice;
    this.UI = props.choice.UI;
  }

  componentDidMount() {
    if (this.choice.added) {
      this._input.focus();
    }
  }

  onKeyDown = (event) => {
    if (event.keyCode === ENTER_KEY_CODE) {
      this.props.addChoice();
    }
  };

  setName = (event) => this.choice.setName(event.target.value);

  setPriority = (value) => this.choice.setPriority(value);

  render() {
    return (
      <div className="choice">
        <div className="input-group">
          <input ref={c => this._input = c}
                 type="text"
                 className="form-control"
                 value={this.choice.name}
                 onChange={this.setName}
                 onKeyDown={this.onKeyDown}
                 placeholder={PLACEHOLDER_CHOICE}
          />
          <span className="input-group-btn">
                <DeleteButton
                  extraClasses={"btn-"+this.props.theme}
                  onDelete={this.props.removeChoice}
                />
              </span>
        </div>
        <div className="row">
          <label className="col-shrink col-no-padding">Priority</label>

          <div className="col-grow col-no-padding">
            <BootstrapSlider
              sliderOpts={{
                min: 1,
                max: 100,
                step: 0.05,
                value: this.choice.priority,
                scale: 'logarithmic',
                tooltip: 'hide'
              }}
              onChange={this.setPriority}
            />
          </div>
        </div>
      </div>
    );
  }
}
ChoiceControl.propTypes = {
  choice: PropTypes.instanceOf(Choice).isRequired,
  addChoice: PropTypes.func.isRequired,
  removeChoice: PropTypes.func.isRequired,
  theme: PropTypes.string.isRequired,
};
