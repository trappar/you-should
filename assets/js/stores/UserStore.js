import _ from 'lodash';
import {EventEmitter} from 'events';
import AppDispatcher from '../dispatchers/AppDispatcher.js';
import AppConstants from '../constants/AppConstants.js';

class UserStore extends EventEmitter {
  constructor() {
    super();
    this.user = null;
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

  getUser() {
    return this.user;
  }

  _setUser(user) {
    this.user = _.omit(user, 'decisions');
  }

  _clearUser() {
    this.user = null;
  }
}

let _UserStore = new UserStore();
export default _UserStore;

_UserStore.dispatchToken = AppDispatcher.register((payload) => {
  switch (payload.type) {
    case AppConstants.USER.LOGIN:
      _UserStore._setUser(payload.user);
      _UserStore.emitChange();
      break;
    case AppConstants.USER.LOGOUT:
      _UserStore._clearUser();
      _UserStore.emitChange();
      break;
  }
});
