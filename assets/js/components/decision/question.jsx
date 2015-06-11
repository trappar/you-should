export default React.createClass({
    propTypes: {
        theme: React.PropTypes.string.isRequired
    },
    render: function() {
        var btnClasses = `btn btn-${this.props.theme}`;

        return (
            <div className="question row" onClick={this.props.onAnswer}>
                <div className="col-xs-9">
                    What should I do&#63;
                </div>
                <div className="controls pull-right">
                    <button onClick={this.props.onEdit} className={btnClasses}>
                        <span className="glyphicon glyphicon-pencil"></span>
                    </button>
                    <button onClick={this.props.onRemove} className={btnClasses}>
                        <span className="glyphicon glyphicon-trash"></span>
                    </button>
                </div>
            </div>
        );
    }
});