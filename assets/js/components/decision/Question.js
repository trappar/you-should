import React from 'react';
import classNames from 'classnames';
import DeleteButton from '../primitives/DeleteButton.js';
import Button from '../primitives/Button.js';
import {observer} from 'mobx-react';
import Decision from '../../stores/Decision';

let PLACEHOLDER_QUESTION = 'Enter a question here!';

@observer
export default class Question extends React.Component {
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

  answer() {
    if (!this.UI.configuring) {
      this.UI.answering = !this.UI.answering
    }
  }

  render() {
    let classes = classNames(
      'question', 'row',
      this.decision.theme,
      {clickable: !this.UI.configuring && !this.UI.loading},
      {loading: this.UI.loading}
    );

    return (
      <div className={classes} onClick={() => this.answer()}>
        <div className="col-grow col-no-padding">
          {
            this.UI.configuring
              ? <input type="text" className="form-control"
                       ref={c => this._input = c}
                       value={this.decision.question}
                       placeholder={PLACEHOLDER_QUESTION}
                       onChange={e => this.decision.setQuestion(e.target.value)}/>
              : (this.decision.question.length > 0 ? this.decision.question : PLACEHOLDER_QUESTION)
          }
        </div>
        {
          !this.decision.added &&
          <div className="col-shrink col-no-padding controls">
            {
              !this.UI.deleteConfirmation &&
              <Button onClick={() => this.decision.edit()}
                      extraClasses={`btn-alt-${this.decision.theme}`}
                      disabled={this.UI.configuring || this.UI.loading}>
                <i className="fa fa-pencil" aria-hidden="true"/>
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
  decision: React.PropTypes.instanceOf(Decision),
  onRemove: React.PropTypes.func.isRequired
};
