import _ from 'lodash';
import {EventEmitter} from 'events';
import AppDispatcher from '../dispatchers/AppDispatcher.js';
import AppConstants from '../constants/AppConstants.js';

class AnswerStore extends EventEmitter {
  constructor() {
    super();
    this.decisions = {};
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
    return this.decisions;
  }

  getAnswer(decisionId) {
    return this._getDecision(decisionId).answer;
  }

  getAnswerStatus(decisionId) {
    return this._getDecision(decisionId).status;
  }

  _getDecision(decisionId) {
    if (!this.decisions.hasOwnProperty(decisionId)) {
      this.decisions[decisionId] = {
        status: AppConstants.ANSWER.IMPOSSIBLE,
        choiceCount: 0,
        answer: null
      };
    }

    return this.decisions[decisionId];
  }

  _addAnswerByDecision(decision) {
    let status;
    if (decision.hasOwnProperty('answer')) {
      status = AppConstants.ANSWER.EXISTS;
    } else {
      if (decision.choices.length > 0) {
        status = AppConstants.ANSWER.POSSIBLE;
      } else {
        status = AppConstants.ANSWER.IMPOSSIBLE;
      }
    }

    let ourDecision = this._getDecision(decision.id);
    ourDecision.status = status;
    ourDecision.choiceCount = decision.choices.length;
    ourDecision.answer = decision.answer;
  }

  _removeAnswerByDecision(id) {
    if (this.decisions.hasOwnProperty(id)) {
      delete this.decisions[id];
    }
  }

  _choiceAdded(decisionId) {
    let decision = this._getDecision(decisionId);
    decision.choiceCount++;
    decision.status = AppConstants.ANSWER.POSSIBLE;
  }

  _choiceUpdated(decisionId) {
    this.decisions[decisionId].status = AppConstants.ANSWER.POSSIBLE;
  }

  _choiceRemoved(decisionId) {
    let decision = this._getDecision(decisionId);
    decision.choiceCount--;
    decision.status = (decision.choiceCount > 0) ? AppConstants.ANSWER.POSSIBLE : AppConstants.ANSWER.IMPOSSIBLE;
  }

  _setAnswer(decisionId, answer = null) {
    let decision = this._getDecision(decisionId);
    if (answer) {
      decision.answer = answer;
      decision.status = AppConstants.ANSWER.EXISTS;
    } else {
      decision.status = (decision.choiceCount > 0) ? AppConstants.ANSWER.POSSIBLE : AppConstants.ANSWER.IMPOSSIBLE;
    }
  }

  _setAnswerDone(decisionId) {
    this._getDecision(decisionId).status = AppConstants.ANSWER.DONE;
  }
}

let _AnswerStore = new AnswerStore();
export default _AnswerStore;

_AnswerStore.dispatchToken = AppDispatcher.register((payload) => {
  switch (payload.type) {
    case AppConstants.ANSWER.NEW:
      _AnswerStore._setAnswer(payload.decisionId, payload.answer);
      _AnswerStore.emitChange();
      break;
    case AppConstants.ANSWER.REMOVE:
      _AnswerStore._setAnswer(payload.decisionId, null);
      _AnswerStore.emitChange();
      break;
    case AppConstants.ANSWER.ISDONE:
      _AnswerStore._setAnswerDone(payload.answer.decisionId);
      _AnswerStore.emitChange();
      break;
    case AppConstants.DECISION.RECEIVE_MULTIPLE:
      _.map(payload.decisions, (decision) => {
        _AnswerStore._addAnswerByDecision(decision);
      });
      _AnswerStore.emitChange();
      break;
    case AppConstants.DECISION.ADD:
      _AnswerStore._addAnswerByDecision(payload.decision);
      _AnswerStore.emitChange();
      break;
    case AppConstants.DECISION.REMOVE:
      _AnswerStore._removeAnswerByDecision(payload.id);
      _AnswerStore.emitChange();
      break;
    case AppConstants.CHOICE.ADD:
      _AnswerStore._choiceAdded(payload.choice.decisionId);
      _AnswerStore.emitChange();
      break;
    case AppConstants.CHOICE.UPDATE:
      _AnswerStore._choiceUpdated(payload.choice.decisionId);
      _AnswerStore.emitChange();
      break;
    case AppConstants.CHOICE.REMOVE:
      _AnswerStore._choiceRemoved(payload.decisionId);
      _AnswerStore.emitChange();
      break;
  }
});
