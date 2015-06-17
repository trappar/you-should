import classNames from 'classnames';
import Button from '../primitives/Button.jsx';

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
    componentWillMount: function() {
        this._removeCountdown = _.debounce(this._removeCountdown, 1500);
    },
    handleEdit: function(event) {
        event.stopPropagation();
        this.props.onEdit()
    },
    handleRemove: function(event) {
        event.stopPropagation();
        if (this.state.deleteConfirmation === false) {
            this.setState({deleteConfirmation: true});
            this._removeCountdown();
        } else {
            this.props.onRemove();
        }
    },
    _removeCountdown: function() {
        this.setState({deleteConfirmation: false});
    },
    render: function() {
        var classes = classNames(
            'question', 'row',
            this.props.theme,
            {clickable: !this.props.configuring}
        );

        var questionControl = (this.props.configuring)
            ? <input type="text" className="form-control"
                     value={this.props.children}
                     onChange={(evt) => this.props.onQuestionChanged(evt.target.value)}/>
            : this.props.children;

        var controls;
        if (!this.state.deleteConfirmation) {
            controls = <div className="controls pull-right">
                <Button onClick={this.handleEdit} extraClasses={`btn-alt-${this.props.theme}`}>
                    <span className="glyphicon glyphicon-pencil"></span>
                </Button>
                <Button onClick={this.handleRemove} extraClasses={`btn-alt-${this.props.theme}`}>
                    <span className="glyphicon glyphicon-trash"></span>
                </Button>
            </div>;
        } else {
            controls = <div className="controls pull-right">
                <Button onClick={this.handleRemove} extraClasses={`btn-alt-${this.props.theme}`}>
                    Are you sure?
                </Button>
            </div>;
        }

        return (
            <div className={classes} onClick={this.props.configuring ? null : this.props.onClick}>
                <div className={this.state.deleteConfirmation ? "col-xs-7" : "col-xs-8"}>
                    {questionControl}
                </div>
                {controls}
            </div>
        );
    }
});