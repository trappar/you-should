import classNames from 'classnames';
import Question from './Question.jsx'
import Answer from './Answer.jsx'
import Config from './config/Config.jsx'

export default React.createClass({
    propTypes: {
        theme: React.PropTypes.string.isRequired,
        question: React.PropTypes.string.isRequired,
        choices: React.PropTypes.array.isRequired
    },
    getInitialState: function() {
        return {
            answering: false,
            configuring: false
        }
    },
    handleAnswer: function(event) {
        this.setState({
            answering: !this.state.answering
        });
    },
    handleEdit: function(event) {
        event.stopPropagation();
        this.setState({
            configuring: true,
            answering: false
        });
    },
    handleRemove: function(event) {
        // TODO
        event.stopPropagation();
        console.log('remove');
    },
    render: function() {
        var classes = classNames('decision', 'col-lg-6');

        return (
            <div className={classes}>
                <Question text={this.props.question} editing={this.state.configuring} theme={this.props.theme}
                    onAnswer={this.handleAnswer} onEdit={this.handleEdit} onRemove={this.handleRemove} />

                <Answer open={this.state.answering} answer={this.props.answer} loading={false} theme={this.props.theme}/>

                <Config open={this.state.configuring} choices={this.props.choices}
                    theme={this.props.theme} onThemeChange={this.props.onThemeChange} />
            </div>
        );
    }
});