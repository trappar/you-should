import React from 'react';
import classNames from 'classnames';
import { observer } from 'mobx-react';
import Decision from '../../stores/Decision';
import Button from '../primitives/Button.js';
import Icon from '../primitives/Icon.js';

@observer(['decision'])
export default class Answer extends React.Component {
  constructor(props) {
    super(props);
    this.decision = props.decision;
    this.UI = props.decision.UI;
  }

  render() {
    let answerClasses = classNames(
      'answer',
      this.decision.theme,
      { open: this.UI.answering }
    );

    return (
      <div className={answerClasses}>
        {
          this.decision.answer
            ?
            <div className="row">
              <div className="col-grow">
                {this.decision.answer.name}
              </div>
              <div className="col-shrink col-no-padding">
                {
                  this.UI.answerAccepted
                    ?
                    this.UI.loading
                      ?
                      'Saving...'
                      :
                      <Button extraClasses="btn-green"
                              onClick={() => this.decision.declineAnswer()}>
                        Give me another
                      </Button>
                    :
                    <div className="btn-group">
                      <Button key="okay" extraClasses="btn-green" disabled={this.UI.loading}
                              onClick={() => this.decision.acceptAnswer()}>
                        <Icon type="check"/>
                        &nbsp;OK!
                      </Button>
                      <Button extraClasses="btn-red" disabled={this.UI.loading}
                              onClick={() => this.decision.declineAnswer()}>
                        <Icon type="times"/>
                        &nbsp;No way!
                      </Button>
                    </div>
                }
              </div>
            </div>
            :
            'You haven\'t defined any choices yet'
        }
      </div>
    );
  }
}

Answer.wrappedComponent.propTypes = {
  decision: React.PropTypes.instanceOf(Decision)
};