import AppDispatcher from '../dispatchers/AppDispatcher.js';
import AppConstants from '../constants/AppConstants.js';

var DecisionActions = {
    receiveMultiple: (decisions) => {
        AppDispatcher.dispatch({
            type: AppConstants.DECISION.RECEIVE_MULTIPLE,
            decisions: decisions
        });
    },
    refresh: () => {
        $.ajax({
            accepts: "json",
            dataType: "json",
            url: Routing.generate('decisions_list', {'_format': 'json'}),
            success: (data) => {
                DecisionActions.receiveMultiple(data);
            },
            error: () => {
                console.log('error');
            }
        });
    },
    update: (decision) => {
        AppDispatcher.dispatch({
            type: AppConstants.DECISION.UPDATE,
            decision: decision
        });
        DecisionActions._updateApi(decision);
    },
    _updateApi: _.debounce((decision) => {
        if (decision.question.length != 0) {
            $.ajax({
                accepts: "json",
                dataType: "json",
                method: "PUT",
                data: decision,
                url: Routing.generate('decision_update', {
                    '_format': 'json', id: decision.id
                }),
                success: (data) => {
                    console.log('Decision updated', data);
                }
            });
        }
    }, 800),
    add: _.throttle(() => {
        $.ajax({
            dataType: "json",
            method: "GET",
            url: Routing.generate('decision_new', {
                '_format': 'json'
            }),
            success: (decision) => {
                decision.added = true;
                AppDispatcher.dispatch({
                    type: AppConstants.DECISION.ADD,
                    decision: decision
                });
            }
        })
    }, 2000, {trailing: false}),
    remove: (decision) => {
        $.ajax({
            dataType: "json",
            method: "DELETE",
            data: decision,
            url: Routing.generate('decision_remove', {
                id: decision.id,
                '_format': 'json'
            }),
            success: function(data) {
                if (data.id) {
                    AppDispatcher.dispatch({
                        type: AppConstants.DECISION.REMOVE,
                        id: data.id
                    });
                }
            }
        });
    }
};

export default DecisionActions;