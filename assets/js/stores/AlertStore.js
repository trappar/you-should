import { observable, action, computed, isObservableArray } from 'mobx';

export default class AlertStore {
  @observable _messages = {};
  children = [];
  parent = null;

  update(appState) {
    for (const type in appState) {
      if (appState.hasOwnProperty(type)) {
        this.set(type, appState[type]);
      }
    }
  }

  _getOwnMessages(type) {
    if (!this._messages[type]) {
      this._messages[type] = observable([]);
    }

    return this._messages[type];
  }

  get(type) {
    let messages = this._getOwnMessages(type).slice();
    if (this.parent) {
      messages = this.parent.get(type).concat(messages);
    }

    return messages;
  }

  /**
   * @param child
   * @returns {AlertStore}
   */
  getChild(child) {
    if (!this.children[child]) {
      const store = new this.constructor();
      store.parent = this;
      this.children[child] = store;
    }
    return this.children[child];
  }

  @action set(type, messages) {
    if (!Array.isArray(messages)) {
      messages = [messages];
    }
    this._getOwnMessages(type).replace(messages);
  }

  @action clear(type, clearParents = false) {
    const messages = this._getOwnMessages(type);
    if (isObservableArray(messages)) {
      messages.replace([]);
    }
    if (clearParents && this.parent) {
      this.parent.clear(type);
    }
  }

  @computed get successes() {
    return this.get('success');
  }

  @computed get errors() {
    return this.get('error');
  }

  @computed get warnings() {
    return this.get('warning');
  }

  setSuccess(message) {
    this.set('success', message);
  }

  setError(message) {
    this.set('error', message);
  }

  setWarning(message) {
    this.set('warning', message);
  }

  clearSuccesses(clearParents = false) {
    this.clear('success', clearParents);
  }

  clearErrors(clearParents = false) {
    this.clear('error', clearParents);
  }

  clearWarnings(clearParents = false) {
    this.clear('warning', clearParents);
  }

  clearAll(clearParents = false) {
    this.clearSuccesses(clearParents);
    this.clearErrors(clearParents);
    this.clearWarnings(clearParents);
  }
}
