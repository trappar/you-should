import Button from './Button.jsx';

export default React.createClass({
    propTypes: {
        onDelete: React.PropTypes.func,
        onConfirm: React.PropTypes.func
    },
    getInitialState: function() {
        return {
            deleteConfirmation: false,
            deleteConfirmed: false
        };
    },
    componentWillMount: function() {
        this._removeCountdown = _.debounce(this._removeCountdown, 1500);
    },
    handleRemove: function(event) {
        event.stopPropagation();
        if (!this.state.deleteConfirmed) {
            if (this.state.deleteConfirmation === false) {
                this.setState({deleteConfirmation: true});
                if (this.props.onConfirm) {
                    this.props.onConfirm(true);
                }
                this._removeCountdown();
            } else {
                this._removeCountdown.cancel();
                this.setState({deleteConfirmed: true});
                if (this.props.onDelete) {
                    this.props.onDelete();
                }
            }
        }
    },
    render: function() {
        var buttonContents;

        if (!this.state.deleteConfirmed) {
            if (!this.state.deleteConfirmation) {
                buttonContents = <span className="glyphicon glyphicon-trash"></span>;
            } else {
                buttonContents = "You sure?";
            }
        } else {
            buttonContents = "Removing";
        }

        var props = _.omit(this.props, 'onDelete');
        props.disabled = (this.state.deleteConfirmed) ? 'disabled' : null;

        return (
            <Button onClick={this.handleRemove} {...props} >
                {buttonContents}
            </Button>
        );
    },
    _removeCountdown: function() {
        if (this.props.onConfirm) {
            this.props.onConfirm(false);
        }
        this.setState({deleteConfirmation: false});
    }
});