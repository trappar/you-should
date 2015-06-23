import _ from 'lodash';
import {EventEmitter} from 'events';
import AppDispatcher from '../dispatchers/AppDispatcher.js';
import AppConstants from '../constants/AppConstants.js';

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

  getChoicesByDecisionId(decisionId) {
    return _.map(this._getDecisionChoices(decisionId), (choiceId) => {
      return this.choices[choiceId];
    });
  }

  _addChoice(choice) {
    if (!choice.hasOwnProperty('added')) {
      choice.added = false;
    }
    this._getDecisionChoices(choice.decisionId).push(choice.id);
    this.choices[choice.id] = choice;
  }

  _getDecisionChoices(decisionId) {
    if (!this.decisions.hasOwnProperty(decisionId)) {
      this.decisions[decisionId] = [];
    }
    return this.decisions[decisionId];
  }

  _updateChoice(choice) {
    this.choices[choice.id] = choice;
  }

  _removeChoice(decisionId, choiceId) {
    let decisionChoices = this._getDecisionChoices(decisionId);
    let index = _.indexOf(decisionChoices, choiceId);
    if (index !== -1) {
      decisionChoices.splice(index, 1);
    }
    delete this.choices[choiceId];
  }

  _clearChoices(decisionId = false) {
    if (decisionId) {
      _.forEach(this.decisions[decisionId], (choiceId) => {
        delete this.choices[choiceId];
      });
      delete this.decisions[decisionId];
    } else {
      this.decisions = {};
      this.choices = {};
    }
  }
}

let _ChoiceStore = new ChoiceStore();
export default _ChoiceStore;

_ChoiceStore.dispatchToken = AppDispatcher.register((payload) => {
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
      _ChoiceStore._removeChoice(payload.decisionId, payload.choiceId);
      _ChoiceStore.emitChange();
  }
});
