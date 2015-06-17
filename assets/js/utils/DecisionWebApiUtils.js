import DecisionActions from '../actions/DecisionActions.js';

export default {
    refresh: function() {
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
    update: _.debounce((decision) => {
        $.ajax({
            accepts: "json",
            dataType: "json",
            method: "PUT",
            data: decision,
            url: Routing.generate('decision_update', {
                '_format': 'json', id: decision.id
            }),
            success: function(data) {
                console.log('Decision updated', data);
            }
        });
    }, 800),
    add: _.throttle(() => {
        $.ajax({
            dataType: "json",
            method: "GET",
            url: Routing.generate('decision_new', {
                '_format': 'json'
            }),
            success: function(decision) {
                DecisionActions.add(decision);
            }
        })
    }, 2000, {trailing: false}),
    remove: (decision) => {
        $.ajax({
            dataType: "json",
            method: "DELETE",
            data: decision,
            url: Routing.generate('decision_delete', {
                id: decision.id,
                '_format': 'json'
            }),
            success: function(data) {
                if (data.id) {
                    DecisionActions.remove(data.id);
                }
            }
        })
    }
};