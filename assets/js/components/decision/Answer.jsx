import Button from '../primitives/Button.jsx';
import classNames from 'classnames';
import AnswerStore from '../../stores/AnswerStore.js';
import AnswerActions from '../../actions/AnswerActions.js';
import AppConstants from '../../constants/AppConstants.js';

function getStateFromStores(decision_id) {
    return {
        answer: AnswerStore.getAnswer(decision_id),
        status: AnswerStore.getAnswerStatus(decision_id)
    };
}

export default React.createClass({
    getDefaultProps: function() {
        return {
            open: false
        };
    },
    getInitialState: function() {
        return getStateFromStores(this.props.decision_id);
    },
    componentWillMount: function() {
        AnswerStore.addChangeListener(this._onStoreChange);
    },
    componentWillUnmount: function() {
        AnswerStore.removeChangeListener(this._onStoreChange);
    },
    _onStoreChange: function() {
        this.setState(getStateFromStores(this.props.decision_id));
    },
    _logActivity: function() {
        AnswerActions.logActivity(this.state.answer);
    },
    _loadAnotherAnswer: function() {
        AnswerActions.new(this.props.decision_id);
    },
    _getTextByState: function() {
        var text;
        switch (this.state.status) {
            case AppConstants.ANSWER.EXISTS:
            case AppConstants.ANSWER.DONE:
                text = (
                    <div className="pull-left">
                        {this.state.answer.name}
                    </div>
                );
                break;
            case AppConstants.ANSWER.POSSIBLE:
                text = 'Loading...';
                break;
            case AppConstants.ANSWER.IMPOSSIBLE:
                text = 'No choices have been defined yet.';
                break;
        }

        return text;
    },
    _getControlsByState: function() {
        var controls;
        switch (this.state.status) {
            case AppConstants.ANSWER.EXISTS:
                controls = (
                    <div className="controls pull-right">
                        <Button key="okay" extraClasses="btn-success" onClick={this._logActivity}>
                            <span className="glyphicon glyphicon-ok"></span>
                            &nbsp;OK!
                        </Button>
                        <Button extraClasses="btn btn-danger" onClick={this._loadAnotherAnswer}>
                            <span className="glyphicon glyphicon-remove"></span>
                            &nbsp;No way!
                        </Button>
                    </div>
                );
                break;
            case AppConstants.ANSWER.DONE:
                controls = (
                    <div className="controls pull-right">
                        <Button key="another" extraClasses="btn-success" onClick={this._loadAnotherAnswer}>
                            Give me another!
                        </Button>
                    </div>
                );
                break;
        }

        return controls;
    },
    render: function() {
        var answerClasses = classNames('answer', 'row', this.props.theme, {
            open: this.props.open,
            loading: this.state.status === AppConstants.ANSWER.POSSIBLE
        });

        return (
            <div className={answerClasses}>
                {this._getTextByState(this.state)}
                {this._getControlsByState(this.state)}
            </div>
        );
    }
});