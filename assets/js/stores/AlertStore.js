import { observable, action, computed, isObservableArray } from 'mobx';
import uuid from 'uuid';

export default class AlertStore {
  @observable _messages;
  children;
  parent;
  name;

  constructor(name = uuid.v4()) {
    this._messages = {};
    this.children = {};
    this.name = name;
  }


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

  /**
   * @param child
   * @returns {AlertStore}
   */
  getChild(child = uuid.v4()) {
    if (!this.children[child]) {
      const store = new this.constructor(child);
      store.parent = this;
      this.children[child] = store;
    }
    return this.children[child];
  }

  removeChild(child) {
    if (this.children[child]) {
      delete this.children[child];
    }
  }

  removeSelf() {
    if (this.parent) {
      this.parent.removeChild(this.name);
    }
  }

  get(type, direction = 'self') {
    let messages = this._getOwnMessages(type).slice();

    switch (direction) {
      case 'parent':
        if (this.parent) {
          messages = this.parent.get(type, direction).concat(messages);
        }
        break;
      case 'child':
        for (const child in this.children) {
          if (this.children.hasOwnProperty(child)) {
            messages = messages.concat(this.children[child].get(type, direction));
          }
        }
        break;
      default:
    }

    return messages;
  }

  @action set(type, messages) {
    if (!Array.isArray(messages)) {
      messages = [messages];
    }
    this._getOwnMessages(type).replace(messages);
  }

  @action clear(type, direction = 'self') {
    const messages = this._getOwnMessages(type);

    switch (direction) {
      case 'parent':
        if (this.parent) {
          this.parent.clear(type, direction);
        }
        break;
      case 'child':
        for (const child in this.children) {
          if (this.children.hasOwnProperty(child)) {
            this.children[child].clear(type, direction)
          }
        }
        break;
      default:
    }

    if (isObservableArray(messages)) {
      messages.replace([]);
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

  clearSuccesses(direction = 'self') {
    this.clear('success', direction);
  }

  clearErrors(direction = 'self') {
    this.clear('error', direction);
  }

  clearWarnings(direction = 'self') {
    this.clear('warning', direction);
  }

  clearAll(direction = 'self') {
    this.clearSuccesses(direction);
    this.clearErrors(direction);
    this.clearWarnings(direction);
  }
}
