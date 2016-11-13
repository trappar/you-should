import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import DeleteButton from '../primitives/DeleteButton.js';
import Button from '../primitives/Button.js';
import Icon from '../primitives/Icon';
import { observer } from 'mobx-react';
import Decision from '../../stores/Decision';

let PLACEHOLDER_QUESTION = 'Enter a question here!';

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
                       placeholder={PLACEHOLDER_QUESTION}
                       onChange={this.setQuestion}/>
              : (this.decision.question.length > 0 ? this.decision.question : PLACEHOLDER_QUESTION)
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
