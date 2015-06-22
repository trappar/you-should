import ChoiceActions from '../../../actions/ChoiceActions.js';
import DeleteButton from '../../primitives/DeleteButton.jsx';
import BootstrapSlider from '../../primitives/BootstrapSlider.jsx';

var ENTER_KEY_CODE = 13;

export default React.createClass({
    propTypes: {
        choice: React.PropTypes.object.isRequired
    },
    componentDidMount: function() {
        if (this.props.choice.added) {
            this.props.choice.added = false;
            $(this.getDOMNode()).find("input:text").select().focus();
        }
    },
    handleNameChange: function(event) {
        this.props.choice.name = event.target.value;
        ChoiceActions.update(this.props.choice);
    },
    handleSliderChange: function(value) {
        this.props.choice.priority = value;
        ChoiceActions.update(this.props.choice);
    },
    handleDelete: function() {
        ChoiceActions.remove(this.props.choice);
    },
    _onKeyDown: function(event) {
        if (event.keyCode === ENTER_KEY_CODE) {
            event.preventDefault();
            ChoiceActions.add(this.props.choice.decision_id);
        }
    },
    render: function() {
        var choice = this.props.choice;
        return (
            <div className="choice">
                <div className="form-group">
                    <div className="col-xs-12">
                        <div className="input-group">
                            <input type="text" className="form-control" value={choice.name}
                                   onChange={this.handleNameChange} onKeyDown={this._onKeyDown}/>
                        <span className="input-group-btn">
                            <DeleteButton extraClasses="btn-default" onDelete={this.handleDelete} />
                        </span>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-xs-2 control-label">Priority</label>

                    <div className="col-xs-10">
                        <BootstrapSlider sliderOpts={{
                            min: 1,
                            max: 9,
                            step: 0.1,
                            value: choice.priority,
                            tooltip: 'hide'
                        }} onChange={this.handleSliderChange}/>
                    </div>
                </div>
            </div>
        );
    }
});