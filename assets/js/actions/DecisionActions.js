/*global Routing*/
import $ from 'jquery';
import _ from 'lodash';
import AppDispatcher from '../dispatchers/AppDispatcher.js';
import AppConstants from '../constants/AppConstants.js';

export default {
  receiveMultiple: function(decisions) {
    AppDispatcher.dispatch({
      type: AppConstants.DECISION.RECEIVE_MULTIPLE,
      decisions: decisions
    });
  },
  refresh: function() {
    $.ajax({
      accepts: 'json',
      dataType: 'json',
      url: Routing.generate('decisions_list', {
        '_format': 'json'
      }),
      success: (data) => {
        this.receiveMultiple(data);
      },
      error: () => {
        console.log('error');
      }
    });
  },
  update: function(decision) {
    AppDispatcher.dispatch({
      type: AppConstants.DECISION.UPDATE,
      decision: decision
    });
    this._updateApi(decision);
  },
  _updateApi: _.debounce(function(decision) {
    $.ajax({
      accepts: 'json',
      dataType: 'json',
      method: 'PUT',
      data: decision,
      url: Routing.generate('decision_update', {
        '_format': 'json',
        id: decision.id
      }),
      success: (data) => {
        console.log('Decision updated', data);
      }
    });
  }, 800),
  add: _.throttle(function() {
    $.ajax({
      dataType: 'json',
      method: 'GET',
      url: Routing.generate('decision_new', {
        '_format': 'json'
      }),
      success: (decision) => {
        decision.added = true;
        AppDispatcher.dispatch({
          type: AppConstants.DECISION.ADD,
          decision: decision
        });
      }
    });
  }, 2000, {trailing: false}),
  remove: function(decision) {
    $.ajax({
      dataType: 'json',
      method: 'DELETE',
      data: decision,
      url: Routing.generate('decision_remove', {
        '_format': 'json',
        id: decision.id
      }),
      success: function(data) {
        if (data.id) {
          AppDispatcher.dispatch({
            type: AppConstants.DECISION.REMOVE,
            id: data.id
          });
        }
      }
    });
  }
};
