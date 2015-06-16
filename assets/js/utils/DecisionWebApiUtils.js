import DecisionActions from '../actions/DecisionActions.js';

export default {
    refreshDecisions: function() {
        $.ajax({
            accepts: "json",
            dataType: "json",
            url: Routing.generate('decisions_list', {'_format': 'json'}),
            success: function(data) {
                DecisionActions.receiveMultiple(data);
            },
            error: function() {
                console.log('error');
            }
        });
    },
    saveDecision: function(decision) {
        // Do some ajax call here
    }
};