import {EventEmitter} from 'events';
import AppDispatcher from '../dispatchers/AppDispatcher.js';
import AppConstants from '../constants/AppConstants.js';

class DecisionStore extends EventEmitter {
    constructor() {
        super();
        this.decisions = {};
        this.decisionOrder = [];
    }

    emitChange() {
        this.emit('CHANGE');
    }

    addChangeListener(cb) {
        this.on('CHANGE', cb);
    }

    removeChangeListener(cb) {
        this.removeListener('CHANGE', cb);
    }

    getDecisionOrder() {
        return this.decisionOrder;
    }

    getAllDecisions() {
        return _.map(this.decisionOrder, (id) => {
            return this.decisions[id];
        });
    }

    getDecisionState(decision_id) {
        return (this._getDecision(decision_id)) ? {
            question: this.getQuestion(decision_id),
            answer: this.getAnswer(decision_id),
            theme: this.getTheme(decision_id)
        } : {};
    }

    getTheme(decision_id) {
        return this._getDecision(decision_id).theme;
    }

    getQuestion(decision_id) {
        return this._getDecision(decision_id).question;
    }

    getAnswer(decision_id) {
        var decision = this._getDecision(decision_id);
        return (decision.answer)
            ? decision.answer.name
            : null;
    }

    _getDecision(id) {
        return (this.decisions.hasOwnProperty(id)) ? this.decisions[id] : null;
    }

    _addDecision(decision) {
        decision = _.omit(decision, 'choices');
        if (!decision.hasOwnProperty('added')) {
            decision.added = false;
        }
        this.decisions[decision.id] = decision;
        this.decisionOrder.push(decision.id)
    }

    _updateDecision(decision) {
        this.decisions[decision.id] = decision;
    }

    _removeDecision(id) {
        delete this.decisions[id];
        var index = _.indexOf(this.decisionOrder, id);
        if (index != -1) {
            this.decisionOrder.splice(index, 1);
        }
    }

    _clearAll() {
        this.decisions = {};
        this.decisionOrder = [];
    }
}

let _DecisionStore = new DecisionStore();
export default _DecisionStore;

_DecisionStore.dispatchToken = AppDispatcher.register((payload) => {
    switch (payload.type) {
        case AppConstants.DECISION.RECEIVE_MULTIPLE:
            _DecisionStore._clearAll();
            _.map(payload.decisions, (decision) => {
                _DecisionStore._addDecision(decision);
            });
            _DecisionStore.emitChange();
            break;
        case AppConstants.DECISION.UPDATE:
            _DecisionStore._updateDecision(payload.decision);
            _DecisionStore.emitChange();
            break;
        case AppConstants.DECISION.ADD:
            _DecisionStore._addDecision(payload.decision);
            _DecisionStore.emitChange();
            break;
        case AppConstants.DECISION.REMOVE:
            _DecisionStore._removeDecision(payload.id);
            _DecisionStore.emitChange();
            break;
    }
});