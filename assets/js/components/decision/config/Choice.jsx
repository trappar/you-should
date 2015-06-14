export default React.createClass({
    propTypes: {
        value: React.PropTypes.string.isRequired
    },
    render: function() {
        return (
            <div className="form-group">
                <input type="text" className="form-control" defaultValue={this.props.value} />
            </div>
        );
    }
});