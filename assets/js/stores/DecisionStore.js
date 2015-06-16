import DecisionConstants from '../constants/DecisionConstants.js';
import BaseStore from './BaseDecisionStore.js';

class DecisionStore extends BaseStore {
    constructor() {
        super();
        this.decisions = {};
        this.decisionOrder = [];
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
            theme: this.getTheme(decision_id),
            choices: _.clone(this.getChoices(decision_id), true)
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

    getChoices(decision_id) {
        return this._getDecision(decision_id).choices;
    }

    _getDecision(id) {
        return (this.decisions.hasOwnProperty(id)) ? this.decisions[id] : null;
    }

    _addDecision(decision) {
        this.decisions[decision.id] = decision;
        this.decisionOrder.push(decision.id)
    }

    _setDecision(decision) {
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

    _getDispatcherCallBack() {
        return (payload) => {
            switch (payload.type) {
                case DecisionConstants.RECEIVE_DECISIONS:
                    this._clearAll();
                    _.map(payload.decisions, (decision) => {
                        this._addDecision(decision);
                    });
                    this.emitChange();
                    break;
                case DecisionConstants.UPDATE_DECISION:
                    _setDecision(payload.decision);
                    this.emitChange();
                    break;
            }
        };
    }
}

export default new DecisionStore();