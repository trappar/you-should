import classNames from 'classnames';
import Question from './Question.jsx'
import Answer from './Answer.jsx'
import Config from './config/Config.jsx'
import DecisionStore from '../../stores/DecisionStore.js';

function initialState() {
    return {
        theme: "blue",
        choices: [{name: "", priority: 5}],
        answering: false,
        configuring: false,
        newQuestion: ''
    }
}


function getStateFromStores(decision_id) {
    return {
        question: DecisionStore.getQuestion(decision_id),
        answer: DecisionStore.getAnswer(decision_id),
        theme: DecisionStore.getTheme(decision_id),
        choices: _.clone(DecisionStore.getChoices(decision_id), true)
    }
}

export default React.createClass({
    propTypes: {
        id: React.PropTypes.number.isRequired
    },
    getInitialState: function() {
        return _.merge(initialState(), DecisionStore.getDecisionState(this.props.id));
    },
    componentWillMount: function() {
        DecisionStore.addChangeListener(this._onStoreChange);
    },
    componentWillUnmount: function() {
        DecisionStore.removeChangeListener(this._onStoreChange);
    },
    _onStoreChange: function() {
        this.setState(getStateFromStores(this.props.id));
    },
    configure: function(event) {
        event.stopPropagation();
        this.setState({
            configuring: true,
            answering: false
        });
    },
    remove: function(event) {
        // TODO
        event.stopPropagation();
        console.log('remove');
    },
    cancelConfiguring: function() {
        this.setState(_.merge(initialState(), getStateFromStores(this.props.id)));
    },
    saveConfiguration: function() {
        this.setState({configuring: false});
    },
    render: function() {
        var classes = classNames('decision', 'col-lg-6');

        var question = (
            <Question configuring={this.state.configuring} theme={this.state.theme}
                      onClick={() => this.setState({answering: !this.state.answering})}
                      onNewQuestionChanged={(value) => this.setState({newQuestion: value})}
                      onEdit={this.configure} onRemove={this.remove}>
                {this.state.question}
            </Question>
        );

        var answer;
        if (this.state.answering) {
            answer = (
                <Answer answer={this.state.answer} theme={this.state.theme} loading={false}/>
            );
        }

        var config;
        if (this.state.configuring) {
            config = (
                <Config decision_id={this.props.id} theme={this.state.theme} choices={this.state.choices}
                        themeChanged={(theme) => this.setState({theme: theme})}
                        configCancel={this.cancelConfiguring}
                        configSave={this.saveConfiguration} />
            );
        }

        return (
            <div className={classes}>
                {question}
                {answer}
                {config}
            </div>
        );
    }
});