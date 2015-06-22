import Question from './Question.jsx'
import Answer from './Answer.jsx'
import Config from './config/Config.jsx'
import DecisionActions from '../../actions/DecisionActions.js';

export default React.createClass({
    propTypes: {
        decision: React.PropTypes.object.isRequired
    },
    getInitialState: function() {
        return {
            answering: false,
            configuring: this.props.decision.added
        }
    },
    componentDidMount: function() {
        if (this.props.decision.added) {
            this.refs.question.focus();
        }
    },
    configure: function() {
        this.setState({
            configuring: !this.state.configuring,
            answering: false
        });
    },
    remove: function() {
        DecisionActions.remove(this.props.decision);
    },
    handleQuestionChange: function(question) {
        this.props.decision.question = question;
        this._saveDecision();
    },
    handleThemeChange: function(theme) {
        this.props.decision.theme = theme;
        this._saveDecision();
    },
    _saveDecision: function() {
        DecisionActions.update(this.props.decision);
    },
    handleChoiceChange: function() {
        this.setState({answer: null})
    },
    render: function() {
        var decision = this.props.decision;
        return (
            <div className="decision">
                <Question ref="question" configuring={this.state.configuring} theme={decision.theme}
                          onClick={() => this.setState({answering: !this.state.answering})}
                          onQuestionChanged={this.handleQuestionChange}
                          onEdit={this.configure} onRemove={this.remove}>
                    {decision.question}
                </Question>

                <Answer open={this.state.answering} answer={decision.answer} theme={decision.theme} loading={false}/>

                <Config open={this.state.configuring} decision_id={decision.id} theme={decision.theme}
                        themeChanged={this.handleThemeChange}
                        choiceChanged={this.handleChoiceChange}
                        closeConfig={this.configure}/>
            </div>
        );
    }
});