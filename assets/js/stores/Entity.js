import {action, extendObservable, isObservableArray} from 'mobx';

function objEach(obj, callback) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      callback(key, obj[key]);
    }
  }
}

export default class Entity {
  constructor(domain) {
    const structure = this.getStructure();
    const observableObj = {};

    if (structure.tracked) {
      this._serverState = {...structure.tracked};
      observableObj['_appState'] = {...structure.tracked};

      objEach(structure.tracked, (key, value) => {
        Object.defineProperty(observableObj, key, {
          get: () => {
            return this._appState[key]
          },
          set: (value) => {
            this._appState[key] = value;
          },
          enumerable: true
        });
      });
    }

    if (structure.observed) {
      objEach(structure.observed, (key, value) => {
        observableObj[key] = value
      });
    }

    observableObj.added = undefined;

    extendObservable(this, observableObj);

    if (structure.unobserved) {
      Object.assign(this, structure.unobserved);
    }

    this.update(domain);
  }

  getStructure() {
    return {
      tracked: {},
      observed: {},
      unobserved: {}
    }
  }

  update(domain) {
    this.added = typeof domain === 'undefined';
    if (domain) {
      objEach(domain, (key, value) => {
        if (this._serverState.hasOwnProperty(key)) {
          this._serverState[key] = isObservableArray(value) ? value.slice() : value;
        }
        this[key] = value;
      });
    }
  }

  @action acceptChanges() {
    let changeLog = {}; // Where all changes are accumulated
    let changes = {}; // Changes to this object's keys go here
    let changed = false; // Has anything changes?

    if (this.added) {
      changed = true;
      changeLog.type = 'add'
    } else {
      changeLog.type = 'edit';
      changeLog.id = this.id;
    }

    objEach(this._appState, (key, value) => {
      if (isObservableArray(this._appState[key])) {
        const arrayChangelog = this._acceptArrayChanges(key);
        if (arrayChangelog) {
          changeLog[key] = arrayChangelog;
          changed = true;
        }
      } else {
        if (this._serverState[key] !== value) {
          this._serverState[key] = value;
          changes[key] = value;
          changed = true;
        }
      }
    });

    if (Object.keys(changes).length > 0) {
      changeLog.object = changes;
    }

    return changed ? changeLog : false;
  }

  _acceptArrayChanges(key) {
    const changeLog = [];

    this._appState[key].forEach(item => {
      if (item instanceof Entity) {
        const itemChangelog = item.acceptChanges();
        if (itemChangelog) {
          changeLog.push(itemChangelog);
        }
      }
    });

    this._serverState[key].forEach((item) => {
      const foundIndex = this._appState[key].indexOf(item);
      if (foundIndex === -1) {
        changeLog.push({
          type: 'remove',
          id: item.id,
        });
      }
    });

    return (changeLog.length > 0) ? changeLog : false
  }

  @action declineChanges() {
    objEach(this._serverState, (key, value) => {
      if (this._appState[key] !== value) {
        this._appState[key] = value;
      }
      if (isObservableArray(this._appState[key])) {
        this._appState[key].forEach(item => {
          if (item instanceof Entity) {
            item.declineChanges();
          }
        });
      }
    });
  }
}
