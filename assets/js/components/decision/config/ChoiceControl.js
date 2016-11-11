import React from 'react';
import DeleteButton from '../../primitives/DeleteButton.js';
import BootstrapSlider from '../../primitives/BootstrapSlider.js';
import Choice from '../../../stores/Choice';
import {observer} from 'mobx-react';

let ENTER_KEY_CODE = 13;
let PLACEHOLDER_CHOICE = 'Enter an option here!';

@observer
export default class ChoiceControl extends React.Component {
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

  _onKeyDown(event) {
    if (event.keyCode === ENTER_KEY_CODE) {
      this.props.addChoice();
    }
  }

  render() {
    return (
      <div className="choice">
        <div className="input-group">
          <input ref={c => this._input = c}
                 type="text"
                 className="form-control"
                 value={this.choice.name}
                 onChange={(e) => this.choice.setName(e.target.value)}
                 onKeyDown={(e) => this._onKeyDown(e)}
                 placeholder={PLACEHOLDER_CHOICE}
          />
          <span className="input-group-btn">
                <DeleteButton
                  extraClasses="btn-default"
                  onDelete={() => this.props.removeChoice()}
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
              onChange={(value) => this.choice.setPriority(value)}
            />
          </div>
        </div>
      </div>
    );
  }
}

ChoiceControl.propTypes = {
  choice: React.PropTypes.instanceOf(Choice).isRequired,
  addChoice: React.PropTypes.func.isRequired,
  removeChoice: React.PropTypes.func.isRequired
};
