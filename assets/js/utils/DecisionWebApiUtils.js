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
    saveDecision: function(rawDecisionState) {
        var data = {
            theme: rawDecisionState.theme,
            question: rawDecisionState.question,
            choices: rawDecisionState.choices
        };

        //$.ajax({
        //    accepts: "json",
        //    dataType: "json",
        //    method: "POST",
        //    url: Routing.generate('decisions_list', {'_format': 'json'}),
        //    success: function(data) {
        //        DecisionActions.receiveMultiple(data);
        //    },
        //    error: function() {
        //        console.log('error');
        //    }
        //});
        console.log(data);
        // Do some ajax call here
    }
};