import Button from '../../primitives/Button.jsx';

export default React.createClass({
    propTypes: {
        theme: React.PropTypes.string.isRequired,
        changed: React.PropTypes.bool.isRequired,
        onCancel: React.PropTypes.func,
        onSave: React.PropTypes.func
    },
    render: function() {
        var buttonClasses = [`btn-${this.props.theme}`, 'form-control'];

        return (
            <div className="row">
                <div className="col-xs-6">
                    <Button onClick={this.props.onCancel} extraClasses={buttonClasses}>Cancel changes</Button>
                </div>
                <div className="col-xs-6">
                    {this.props.changed
                        ? <Button onClick={this.props.onSave} extraClasses={buttonClasses}>Save changes</Button>
                        : null}
                </div>
            </div>
        );
    }
});