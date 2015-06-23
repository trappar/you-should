import classNames from 'classnames';
import DeleteButton from '../primitives/DeleteButton.jsx';
import Button from '../primitives/Button.jsx';

var PLACEHOLDER_QUESTION = 'Enter a question here!';

export default React.createClass({
    propTypes: {
        theme: React.PropTypes.string.isRequired,
        configuring: React.PropTypes.bool.isRequired
    },
    getInitialState: function() {
        return {
            deleteConfirmation: false
        };
    },
    handleEdit: function(event) {
        event.stopPropagation();
        this.props.onEdit()
    },
    focus: function() {
        if (this.props.configuring) {
            $(this.getDOMNode()).find('input').focus();
        }
    },
    render: function() {
        var classes = classNames(
            'question', 'row',
            this.props.theme,
            {clickable: !this.props.configuring}
        );

        var questionControl;
        if (this.props.configuring) {
            questionControl = (
                <input type="text" className="form-control"
                       value={this.props.children}
                       placeholder={PLACEHOLDER_QUESTION}
                       onChange={(evt) => this.props.onQuestionChanged(evt.target.value)}/>
            );
        } else {
            questionControl = (this.props.children.length > 0) ? this.props.children : PLACEHOLDER_QUESTION;
        }

        var editControl = (!this.state.deleteConfirmation) ?
            <Button onClick={this.handleEdit} extraClasses={`btn-alt-${this.props.theme}`}>
                <span className="glyphicon glyphicon-pencil"></span>
            </Button>
            : null;

        return (
            <div className={classes} onClick={this.props.configuring ? null : this.props.onClick}>
                <div className={this.state.deleteConfirmation ? "col-xs-8" : "col-xs-8"}>
                    {questionControl}
                </div>
                <div className="controls pull-right">
                    {editControl}
                    <DeleteButton extraClasses={`btn-alt-${this.props.theme}`}
                                  onConfirm={(state) => this.setState({deleteConfirmation: state})}
                                  onDelete={this.props.onRemove}/>
                </div>
            </div>
        );
    }
});