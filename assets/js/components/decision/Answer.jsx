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
    _noWayClick: function() {
        AnswerActions.new(this.props.decision_id);
    },
    render: function() {
        var answerExists = this.state.status === AppConstants.ANSWER.EXISTS;
        var loading = this.state.status === AppConstants.ANSWER.POSSIBLE;

        var answerClasses = classNames(
            'answer',
            'row',
            this.props.theme,
            {
                open: this.props.open,
                loading: loading
            }
        );

        var answerText;
        if (answerExists) {
            answerText = (
                <div className="pull-left">
                    {this.state.answer.name}
                </div>
            );
        } else {
            if (loading) {
                answerText = 'Loading...';
            } else {
                answerText = 'No choices have been defined yet.';
            }
        }

        var controls = (answerExists) ?
            <div className="controls pull-right">
                <Button extraClasses="btn-success">
                    <span className="glyphicon glyphicon-ok"></span>
                    &nbsp;OK!
                </Button>
                <Button extraClasses="btn btn-danger" onClick={this._noWayClick}>
                    <span className="glyphicon glyphicon-remove"></span>
                    &nbsp;No way!
                </Button>
            </div>
            : null;

        return (this.props.loading)
            ?
            <div className={answerClasses}>
                <span>Loading...</span>
            </div>
            :
            <div className={answerClasses}>
                {answerText}
                {controls}
            </div>;
    }
});