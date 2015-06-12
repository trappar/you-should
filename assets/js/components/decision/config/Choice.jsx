export default React.createClass({
    propTypes: {
        text: React.PropTypes.string.isRequired
    },
    render: function() {
        return (
            <div class="form-group">
                <input type="text" className="form-control" defaultValue={this.props.text} />
            </div>
        );
    }
});