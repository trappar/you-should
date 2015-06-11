import Question from './question.jsx'
import Answer from './answer.jsx'
import Config from './config.jsx'

export default React.createClass({
    propTypes: {
        theme: React.PropTypes.string.isRequired
    },
    getInitialState: function() {
        return {
            answerOpen: false,
            answer: false,
            configOpen: false
        }
    },
    handleAnswer: function(event) {
        this.setState({
            answerOpen: !this.state.answerOpen
        });
        window.setTimeout(function(){
            this.setState({
                answer: 'Play guitar!'
            })
        }.bind(this), 700)
    },
    handleEdit: function(event) {
        event.stopPropagation();
        this.setState({
            configOpen: !this.state.configOpen
        });
    },
    handleRemove: function(event) {
        // TODO
        event.stopPropagation();
        console.log('remove');
    },
    render: function() {
        var classes = `decision decision-${this.props.theme}`;

        return (
            <div className={classes}>
                <Question theme={this.props.theme} onAnswer={this.handleAnswer} onEdit={this.handleEdit} onRemove={this.handleRemove} />
                <Answer open={this.state.answerOpen} answer={this.state.answer} />
                <Config open={this.state.configOpen} />
            </div>
        );
    }
});