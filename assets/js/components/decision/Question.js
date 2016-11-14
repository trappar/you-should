import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import DeleteButton from '../primitives/DeleteButton.js';
import Button from '../primitives/Button.js';
import Icon from '../primitives/Icon';
import { observer } from 'mobx-react';
import Decision from '../../stores/Decision';

const ENTER_KEY_CODE = 13;

@observer
export default class Question extends Component {
  constructor(props) {
    super(props);
    this.decision = props.decision;
    this.UI = props.decision.UI;
  }

  focus() {
    if (this.UI.configuring) {
      this._input.focus();
    }
  }

  answer = () => {
    if (!this.UI.configuring) {
      this.UI.answering = !this.UI.answering
    }
  };
  edit = () => this.decision.edit();
  setQuestion = (event) => this.decision.setQuestion(event.target.value);
  handleQuestionKeyDown = (event) => {
    if (event.keyCode === ENTER_KEY_CODE) {
      this.decision.addChoice();
    }
  };

  render() {
    let classes = classNames(
      'question', 'row',
      this.decision.theme,
      { clickable: !this.UI.configuring && !this.UI.loading },
      { loading: this.UI.loading }
    );

    return (
      <div className={classes} onClick={this.answer}>
        <div className="col-grow col-no-padding">
          {
            this.UI.configuring
              ? <input type="text" className="form-control"
                       ref={c => this._input = c}
                       value={this.decision.question}
                       placeholder="Enter a question here"
                       onChange={this.setQuestion}
                       onKeyDown={this.handleQuestionKeyDown}/>
              : (this.decision.question.length > 0 ? this.decision.question : 'No question configured')
          }
        </div>
        {
          !this.decision.added &&
          <div className="col-shrink col-no-padding controls">
            {
              !this.UI.deleteConfirmation &&
              <Button onClick={this.edit}
                      extraClasses={`btn-alt-${this.decision.theme}`}
                      disabled={this.UI.configuring || this.UI.loading}>
                <Icon type="pencil"/>
              </Button>
            }
            <DeleteButton extraClasses={`btn-alt-${this.decision.theme}`}
                          disabled={this.UI.loading}
                          onConfirm={state => this.UI.deleteConfirmation = state}
                          onDelete={this.props.onRemove}/>
          </div>
        }
      </div>
    );
  }
}

Question.propTypes = {
  decision: PropTypes.instanceOf(Decision),
  onRemove: PropTypes.func
};
