import classNames from 'classnames';
import Button from '../../primitives/Button.jsx';
import ThemePicker from './theme-picker/ThemePicker.jsx';
import ChoiceControl from './ChoiceControl.jsx';
import ChoiceActions from '../../../actions/ChoiceActions.js';
import ChoiceStore from '../../../stores/ChoiceStore.js';
import ChoiceWebApiUtils from '../../../utils/ChoiceWebApiUtils.js';

function getStateFromStores(decision_id) {
    return {
        choices: ChoiceStore.getChoicesByDecisionId(decision_id)
    };
}

export default React.createClass({
    propTypes: {
        decision_id: React.PropTypes.number.isRequired,
        theme: React.PropTypes.string.isRequired
    },
    getInitialState: function() {
        return getStateFromStores(this.props.decision_id);
    },
    componentWillMount: function() {
        ChoiceStore.addChangeListener(this._onStoreChange);
    },
    componentWillUnmount: function() {
        ChoiceStore.removeChangeListener(this._onStoreChange);
    },
    _onStoreChange: function() {
        this.setState(getStateFromStores(this.props.decision_id));
    },
    render: function() {
        var configClasses = classNames('config', 'row', {open: this.props.open});
        var choicesControls = this.state.choices.map((choice) => {
            return <ChoiceControl key={choice.id} choice={choice} />
        });
        return (
            <div className={configClasses}>
                <h3>Choices</h3>
                {choicesControls}
                <ThemePicker currentTheme={this.props.theme} themeChanged={this.props.themeChanged}/>

                <div className="row">
                    <div className="col-xs-offset-2 col-xs-8">
                        <Button extraClasses={`btn-${this.props.theme} form-control`} onClick={this.props.closeConfig}>
                            Close
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
});