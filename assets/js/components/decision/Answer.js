import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { observer } from 'mobx-react';
import Decision from '../../stores/Decision';
import Button from '../primitives/Button.js';
import Icon from '../primitives/Icon.js';

@observer(['decision'])
export default class Answer extends Component {
  static propTypes = {
    decision: PropTypes.instanceOf(Decision),
  };

  constructor(props) {
    super(props);
    this.decision = props.decision;
    this.UI = props.decision.UI;
  }

  decline = () => this.decision.declineAnswer();
  accept = () => this.decision.acceptAnswer();

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
                {this.UI.loading ? 'Loading...' : this.decision.answer.name}
              </div>
              <div className="col-grow col-no-padding" style={{ textAlign: 'right' }}>
                {
                  this.UI.answerAccepted
                    ?
                    (
                      this.UI.loading ||
                      <Button extraClasses="btn-green"
                              onClick={this.decline}>
                        Give me another
                      </Button>
                    )
                    :
                    <div className="btn-group">
                      <Button key="okay" extraClasses="btn-green" disabled={this.UI.loading}
                              onClick={this.accept}>
                        <Icon type="check"/>
                        &nbsp;OK!
                      </Button>
                      <Button extraClasses="btn-red" disabled={this.UI.loading}
                              onClick={this.decline}>
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
