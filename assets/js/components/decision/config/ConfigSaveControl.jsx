import Button from '../../primitives/Button.jsx';
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

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
                    <ReactCSSTransitionGroup transitionName="fade" transitionAppear={true}>
                        {this.props.changed
                            ? <Button key="savebutton" onClick={this.props.onSave} extraClasses={buttonClasses}>Save changes</Button>
                            : null}
                    </ReactCSSTransitionGroup>
                </div>
            </div>
        );
    }
});