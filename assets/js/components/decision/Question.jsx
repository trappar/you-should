import classNames from 'classnames';
import Button from '../primitives/Button.jsx';

export default React.createClass({
    propTypes: {
        theme: React.PropTypes.string.isRequired,
        configuring: React.PropTypes.bool.isRequired
    },
    render: function() {
        var classes = classNames(
            'question', 'row',
            this.props.theme,
            {clickable: !this.props.configuring}
        );

        var questionControl = (this.props.configuring)
            ? <input type="text" className="form-control"
                     defaultValue={this.props.children}
                     onChange={(evt) => this.props.onNewQuestionChanged(evt.target.value)}/>
            : this.props.children;

        var editButton = (!this.props.configuring) ? (
            <Button onClick={this.props.onEdit} extraClasses={`btn-alt-${this.props.theme}`}>
                <span className="glyphicon glyphicon-pencil"></span>
            </Button>
        ) : null;

        return (
            <div className={classes} onClick={this.props.configuring ? null : this.props.onClick}>
                <div className={(this.props.configuring) ? "col-xs-9" : "col-xs-8"}>
                    {questionControl}
                </div>
                <div className="controls pull-right">
                    {editButton}
                    <Button onClick={this.props.onRemove} extraClasses={`btn-alt-${this.props.theme}`}>
                        <span className="glyphicon glyphicon-trash"></span>
                    </Button>
                </div>
            </div>
        );
    }
});