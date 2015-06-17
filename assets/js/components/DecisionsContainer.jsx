import DecisionBox from './decision/DecisionBox.jsx';
import DecisionStore from '../stores/DecisionStore.js';
import DecisionWebApiUtils from '../utils/DecisionWebApiUtils.js';

function getStateFromStores() {
    return {
        decisions: DecisionStore.getAllDecisions()
    };
}

export default React.createClass({
    getInitialState: function() {
        return getStateFromStores();
    },
    componentWillMount: function() {
        DecisionStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function() {
        DecisionStore.removeChangeListener(this._onChange);
    },
    addDecision: function() {
        DecisionWebApiUtils.add();
    },
    render: function() {
        var decisions = this.state.decisions.map(function(decision) {
            return <DecisionBox key={decision.id} decision={decision} />
        }, this);

        return (
            <div>
                <h1>Your Decisions</h1>
                <a className="add-decision" href="#" onClick={this.addDecision}>
                    <span className="glyphicon glyphicon-plus"></span> Decision
                </a>

                <div className="decisions-container row">
                    {decisions}
                </div>
            </div>
        );
    },
    _onChange: function() {
        this.setState(getStateFromStores());
    }
});