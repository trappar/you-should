import Decision from './decision/Decision.jsx';
import DecisionStore from '../stores/DecisionStore.js';

function getStateFromStores() {
    return {
        decisions: DecisionStore.getDecisionOrder()
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
    _onChange: function() {
        this.setState(getStateFromStores());
    },
    //refreshDecisions: function() {
    //    /*
    //     * Currently this is disabled since the data is dumped to javascript through the twig template.
    //     * I'm keeping it here so it can be used in the future to implement refresh from server functionality
    //     */
    //    $.ajax({
    //        accepts: "json",
    //        dataType: "json",
    //        url: Routing.generate('decisions_list', {'_format': 'json'}),
    //        success: function(data) {
    //            this.setState({
    //                decisions: data
    //            });
    //        }.bind(this),
    //        error: function() {
    //            console.log('error');
    //        }
    //    });
    //},
    //handleConfigChanged: function() {
    //    this.setState({decisions: this.state.decisions});
    //},
    //handleThemeChange: function(decision, theme) {
    //    decision.theme = theme;
    //
    //    this.setState({ decisions: this.state.decisions })
    //},
    //handleConfigCancel: function(decision) {
    //    // Assign properties into decision from backed up version
    //    //decision = _.assign(decision, initialDecisions.getDecision(decision));
    //
    //    //this.setState({decisions: this.state.decisions});
    //},
    //handleConfigSave: function(decision) {
    //    // TODO: Make ajax request to server
    //
    //    // Set new initial state for this decision
    //    initialDecisions.setDecision(decision);
    //},
    render: function() {
        var decisions = this.state.decisions.map(function(id) {
            return <Decision key={id} id={id} />
        }, this);

        return (
            <div className="decisions-container row">
                {decisions}
            </div>
        );
    }
});