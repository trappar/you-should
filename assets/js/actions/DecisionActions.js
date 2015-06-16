import DecisionDispatcher from '../dispatchers/DecisionDispatcher.js';
import DecisionConstants from '../constants/DecisionConstants.js';

export default {
    receiveMultiple: (decisions) => {
        DecisionDispatcher.dispatch({
            type: DecisionConstants.RECEIVE_DECISIONS,
            decisions: decisions
        });
    },
    update: (decision) => {
        DecisionDispatcher.dispatch({
            type: DecisionConstants.UPDATE_DECISION,
            decision: decision
        });
    }
}