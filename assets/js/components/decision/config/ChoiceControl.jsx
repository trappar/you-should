import ChoiceActions from '../../../actions/ChoiceActions.js';
import ChoiceWebApiUtils from '../../../utils/ChoiceWebApiUtils.js';

export default React.createClass({
    propTypes: {
        choice: React.PropTypes.object.isRequired
    },
    handleNameChange: function(event) {
        this.props.choice.name = event.target.value;
        ChoiceActions.update(this.props.choice);
        ChoiceWebApiUtils.update(this.props.choice);
    },
    render: function() {
        var choice = this.props.choice;
        return (
            <div className="form-group">
                <input type="text" className="form-control" value={choice.name} onChange={this.handleNameChange} />
            </div>
        );
    }
});