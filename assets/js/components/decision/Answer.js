import React, {PropTypes} from 'react';
import classNames from 'classnames';
import {observer} from 'mobx-react';
import Decision from '../../stores/Decision';
import Button from '../primitives/Button.js';
import Icon from '../primitives/Icon.js';

// function getStateFromStores(decisionId) {
//   return {
//     answer: AnswerStore.getAnswer(decisionId),
//     status: AnswerStore.getAnswerStatus(decisionId)
//   };
// }

@observer
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
      {open: this.UI.answering}
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
                <div className="btn-group" role="group" aria-label="Basic example">
                  <Button key="okay" extraClasses="btn-green" onClick={this._logActivity}>
                    <Icon type="check"/>
                    &nbsp;OK!
                  </Button>
                  <Button extraClasses="btn-red" onClick={this._loadAnotherAnswer}>
                    <Icon type="times"/>
                    &nbsp;No way!
                  </Button>
                </div>
              </div>
            </div>
            :
            'No answer loaded'
        }

        {/*{this._getTextByState(this.state)}*/}
        {/*{this._getControlsByState(this.state)}*/}
      </div>
    );
  }

  // getTextByState() {
  //   let text;
  //   switch (this.state.status) {
  //     case AppConstants.ANSWER.EXISTS:
  //     case AppConstants.ANSWER.DONE:
  //       text = (
  //         <div className="pull-left">
  //           {this.state.answer.name}
  //         </div>
  //       );
  //       break;
  //     case AppConstants.ANSWER.POSSIBLE:
  //       text = 'Loading...';
  //       break;
  //     case AppConstants.ANSWER.IMPOSSIBLE:
  //       text = 'No choices have been defined yet.';
  //       break;
  //   }
  //
  //   return text;
  // }

}

Answer.propTypes = {
  decision: React.PropTypes.instanceOf(Decision)
};

// export default React.createClass({
//   getInitialState: function() {
//     return getStateFromStores(this.props.decisionId);
//   },
//   _logActivity: function() {
//     AnswerActions.logActivity(this.state.answer);
//   },
//   _loadAnotherAnswer: function() {
//     AnswerActions.new(this.props.decisionId);
//   },
//   _getControlsByState: function() {
//     let controls;
//     switch (this.state.status) {
//       case AppConstants.ANSWER.EXISTS:
//         controls = (
//           <div className="controls pull-right">
//             <Button key="okay" extraClasses="btn-success" onClick={this._logActivity}>
//               <span className="glyphicon glyphicon-ok"></span>
//               &nbsp;OK!
//             </Button>
//             <Button extraClasses="btn btn-danger" onClick={this._loadAnotherAnswer}>
//               <span className="glyphicon glyphicon-remove"></span>
//               &nbsp;No way!
//             </Button>
//           </div>
//         );
//         break;
//       case AppConstants.ANSWER.DONE:
//         controls = (
//           <div className="controls pull-right">
//             <Button key="another" extraClasses="btn-success" onClick={this._loadAnotherAnswer}>
//               Give me another!
//             </Button>
//           </div>
//         );
//         break;
//     }
//
//     return controls;
//   }
// });
