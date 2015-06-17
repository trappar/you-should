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

    getChoice(id) {
        return this.choices[id];
    }

    getChoicesByDecisionId(decision_id) {
        return _.map(this._getDecisionChoices(decision_id), (choice_id) => {
            return this.choices[choice_id];
        });
    }

    _addChoices(choices) {
        _.map(choices, (choice) => {
            this._getDecisionChoices(choice.decision_id).push(choice.id);
            this.choices[choice.id] = choice;
        });
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

    _clearChoices() {
        this.decisions = {};
        this.choices = {};
    }
}

let _ChoiceStore = new ChoiceStore();
export default _ChoiceStore;

_ChoiceStore.dispatchToken = AppDispatcher.register((payload) => {
    AppDispatcher.waitFor([
        DecisionStore.dispatchToken
    ]);

    switch (payload.type) {
        case AppConstants.RECEIVE_DECISIONS:
            _ChoiceStore._clearChoices();
            _.map(payload.decisions, (decision) => {
                _ChoiceStore._addChoices(decision.choices);
            });
            _ChoiceStore.emitChange();
            break;
        case AppConstants.UPDATE_CHOICE:
            _ChoiceStore._updateChoice(payload.choice);
            _ChoiceStore.emitChange();
    }
});