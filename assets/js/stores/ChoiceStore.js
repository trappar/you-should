import {EventEmitter} from 'events';
import AppDispatcher from '../dispatchers/AppDispatcher.js';
import AppConstants from '../constants/AppConstants.js';
import DecisionStore from './DecisionStore.js';

class ChoiceStore extends EventEmitter {
    constructor() {
        super();
        this.decisions = [];
        this.choices = {};
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

    dump() {
        return {
            decisions: this.decisions,
            choices: this.choices
        };
    }

    getChoice(id) {
        return this.choices[id];
    }

    getChoicesByDecisionId(decision_id) {
        return _.map(this._getDecisionChoices(decision_id), (choice_id) => {
            return this.choices[choice_id];
        });
    }

    _addChoice(choice) {
        if (!choice.hasOwnProperty('added')) {
            choice.added = false;
        }
        this._getDecisionChoices(choice.decision_id).push(choice.id);
        this.choices[choice.id] = choice;
    }

    _getDecisionChoices(decision_id) {
        if (!this.decisions.hasOwnProperty(decision_id)) {
            this.decisions[decision_id] = [];
        }
        return this.decisions[decision_id];
    }

    _updateChoice(choice) {
        this.choices[choice.id] = choice;
    }

    _removeChoice(decision_id, choice_id) {
        var decisionChoices = this._getDecisionChoices(decision_id);
        var index = _.indexOf(decisionChoices, choice_id);
        if (index != -1) {
            decisionChoices.splice(index, 1);
        }
        delete this.choices[choice_id];
    }

    _clearChoices(decision_id = false) {
        if (decision_id) {
            _.forEach(this.decisions[decision_id], (choice_id) => {
                delete this.choices[choice_id];
            });
            delete this.decisions[decision_id];
        } else {
            this.decisions = {};
            this.choices = {};
        }
    }
}

let _ChoiceStore = new ChoiceStore();
export default _ChoiceStore;

_ChoiceStore.dispatchToken = AppDispatcher.register((payload) => {
    AppDispatcher.waitFor([
        DecisionStore.dispatchToken
    ]);

    switch (payload.type) {
        case AppConstants.DECISION.RECEIVE_MULTIPLE:
            _ChoiceStore._clearChoices();
            _.map(payload.decisions, (decision) => {
                _.map(decision.choices, (choice) => {
                    _ChoiceStore._addChoice(choice);
                });
            });
            _ChoiceStore.emitChange();
            break;
        case AppConstants.DECISION.REMOVE:
            _ChoiceStore._clearChoices(payload.id);
            _ChoiceStore.emitChange();
            break;
        case AppConstants.CHOICE.UPDATE:
            _ChoiceStore._updateChoice(payload.choice);
            _ChoiceStore.emitChange();
            break;
        case AppConstants.CHOICE.ADD:
            _ChoiceStore._addChoice(payload.choice);
            _ChoiceStore.emitChange();
            break;
        case AppConstants.CHOICE.REMOVE:
            _ChoiceStore._removeChoice(payload.decision_id, payload.choice_id);
            _ChoiceStore.emitChange();
    }
});