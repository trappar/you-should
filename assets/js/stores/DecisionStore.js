import _ from 'lodash';
import {EventEmitter} from 'events';
import AppDispatcher from '../dispatchers/AppDispatcher.js';
import AppConstants from '../constants/AppConstants.js';
import ChoiceStore from './ChoiceStore.js';
import AnswerStore from './AnswerStore.js';

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

  dump() {
    return {
      decisions: this.decisions,
      decisionOrder: this.decisionOrder
    };
  }

  getDecisionOrder() {
    return this.decisionOrder;
  }

  getAllDecisions() {
    return _.map(this.decisionOrder, (id) => {
      return this.decisions[id];
    });
  }

  getDecisionState(decisionId) {
    return (this._getDecision(decisionId)) ? {
      question: this.getQuestion(decisionId),
      answer: this.getAnswer(decisionId),
      theme: this.getTheme(decisionId)
    } : {};
  }

  getTheme(decisionId) {
    return this._getDecision(decisionId).theme;
  }

  getQuestion(decisionId) {
    return this._getDecision(decisionId).question;
  }

  getAnswer(decisionId) {
    let decision = this._getDecision(decisionId);
    return (decision.answer)
      ? decision.answer.name
      : null;
  }

  _getDecision(id) {
    return (this.decisions.hasOwnProperty(id)) ? this.decisions[id] : null;
  }

  _setDecisions(decisions) {
    this._clearAll();
    _.map(decisions, (decision) => {
      this._addDecision(decision);
    });
  }

  _addDecision(decision) {
    decision = _.omit(decision, 'choices');
    if (!decision.hasOwnProperty('added')) {
      decision.added = false;
    }
    this.decisions[decision.id] = decision;
    this.decisionOrder.push(decision.id);
  }

  _updateDecision(decision) {
    this.decisions[decision.id] = decision;
  }

  _removeDecision(id) {
    delete this.decisions[id];
    let index = _.indexOf(this.decisionOrder, id);
    if (index !== -1) {
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
  AppDispatcher.waitFor([
    ChoiceStore.dispatchToken,
    AnswerStore.dispatchToken
  ]);

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
