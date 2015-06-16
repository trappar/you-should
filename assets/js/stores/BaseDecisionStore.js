import {EventEmitter} from 'events';
import DecisionDispatcher from '../dispatchers/DecisionDispatcher.js';

export default class BaseStore extends EventEmitter {
    constructor() {
        super();

        var dispatcherCallback = this._getDispatcherCallBack();
        if (typeof dispatcherCallback == 'function') {
            this.dispatchToken = DecisionDispatcher.register(dispatcherCallback);
        }
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

    _getDispatcherCallBack() {
        return null;
    }
}