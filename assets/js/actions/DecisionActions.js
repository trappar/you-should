import AppDispatcher from '../dispatchers/AppDispatcher.js';
import AppConstants from '../constants/AppConstants.js';

export default {
    receiveMultiple: (decisions) => {
        AppDispatcher.dispatch({
            type: AppConstants.RECEIVE_DECISIONS,
            decisions: decisions
        });
    },
    update: (decision) => {
        AppDispatcher.dispatch({
            type: AppConstants.UPDATE_DECISION,
            decision: decision
        });
    },
    add: (decision) => {
        AppDispatcher.dispatch({
            type: AppConstants.ADD_DECISION,
            decision: decision
        });
    },
    remove: (id) => {
        AppDispatcher.dispatch({
            type: AppConstants.REMOVE_DECISION,
            id: id
        });
    }
}