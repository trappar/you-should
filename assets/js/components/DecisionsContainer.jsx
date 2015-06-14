import Decision from './decision/decision.jsx';

export default React.createClass({
    getInitialState: function() {
        // Dumped via the twig template
        return initialState;
    },
    refreshDecisions: function() {
        /*
         * Currently this is disabled since the data is dumped to javascript through the twig template.
         * I'm keeping it here so it can be used in the future to implement refresh from server functionality
         */
        $.ajax({
            accepts: "json",
            dataType: "json",
            url: Routing.generate('decisions_list', {'_format': 'json'}),
            success: function(data) {
                this.setState({
                    decisions: data
                });
            }.bind(this),
            error: function() {
                console.log('error');
            }
        });
    },
    handleThemeChange: function(decision, theme) {
        decision.theme = theme;
        this.setState({ decisions: this.state.decisions })
    },
    render: function() {
        var decisions = this.state.decisions.map(function(decision) {
            var props = _.omit(decision, 'id');
            props.key = decision.id;
            props.onThemeChange = this.handleThemeChange.bind(null, decision);

            return <Decision {...props} />;
        }, this);

        return (
            <div className="decisions-container row">
                {decisions}
            </div>
        );
    }
});