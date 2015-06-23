import DecisionBox from './decision/DecisionBox.jsx';
import DecisionStore from '../stores/DecisionStore.js';
import DecisionActions from '../actions/DecisionActions.js';
import Button from './primitives/Button.jsx';
import classNames from 'classnames';

function getStateFromStores() {
    return {
        decisions: DecisionStore.getAllDecisions(),
        addingDecision: false
    };
}

function getDecision(decision) {
    return (
        <div className="col-lg-6" key={`decision-col-${decision.id}`}>
            <DecisionBox key={`decision-${decision.id}`} decision={decision}/>
        </div>
    );
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
    addDecision: function(event) {
        event.preventDefault();
        this.setState({addingDecision: true});
        DecisionActions.add();
    },
    render: function() {
        // This seems needlessly complex but I couldn't think of a better way to have the decisions render as
        //   rows with two decisions in each row.
        var decisionsRows = [];
        for (var i = 0; i < this.state.decisions.length; i += 2) {
            var decisionsInRow = [getDecision(this.state.decisions[i])];
            if (i + 1 in this.state.decisions) {
                decisionsInRow.push(getDecision(this.state.decisions[i + 1]));
            }
            decisionsRows.push(
                <div className="row" key={i/2}>
                    {decisionsInRow}
                </div>
            );
        }

        return (
            <div className="decisions-container">
                <h1>Your Decisions</h1>

                {decisionsRows}

                <div className={classNames("add-decision", {loading: this.state.addingDecision})}>
                    <a onClick={this.addDecision}>
                        <span className="glyphicon glyphicon-plus"></span> Add Decision
                    </a>
                </div>
            </div>
        );
    },
    _onChange: function() {
        this.setState(getStateFromStores());
    }
});