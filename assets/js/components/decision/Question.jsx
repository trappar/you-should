import Button from '../primitives/Button.jsx';

export default React.createClass({
    propTypes: {
        text: React.PropTypes.string.isRequired,
        theme: React.PropTypes.string.isRequired,
        editing: React.PropTypes.bool.isRequired
    },
    render: function() {
        var questionControl = (this.props.editing)
            ? <input type="text" className="form-control" defaultValue={this.props.text} />
            : this.props.text;

        return (
            <div className="question row" onClick={this.props.onAnswer}>
                <div className="col-xs-8">
                    {questionControl}
                </div>
                <div className="controls pull-right">
                    <Button onClick={this.props.onEdit} extraClasses={`btn-alt-${this.props.theme}`}>
                        <span className="glyphicon glyphicon-pencil"></span>
                    </Button>
                    <Button onClick={this.props.onRemove} extraClasses={`btn-alt-${this.props.theme}`}>
                        <span className="glyphicon glyphicon-trash"></span>
                    </Button>
                </div>
            </div>
        );
    }
});