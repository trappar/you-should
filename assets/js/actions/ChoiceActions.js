/*global Routing*/
import $ from 'jquery';
import _ from 'lodash';
import AppDispatcher from '../dispatchers/AppDispatcher.js';
import AppConstants from '../constants/AppConstants.js';

export default {
  update: function(choice) {
    AppDispatcher.dispatch({
      type: AppConstants.CHOICE.UPDATE,
      choice: choice
    });
    this._updateApi(choice);
  },
  _updateApi: _.debounce(function(choice) {
    $.ajax({
      accepts: 'json',
      dataType: 'json',
      method: 'PUT',
      data: choice,
      url: Routing.generate('choice_update', {
        '_format': 'json',
        id: choice.id
      }),
      success: function(data) {
        console.log('Choice updated', data);
      }
    });
  }, 800),
  add: _.throttle(function(decisionId) {
    $.ajax({
      dataType: 'json',
      method: 'GET',
      url: Routing.generate('decision_choice_new', {
        '_format': 'json',
        'id': decisionId
      }),
      success: (choice) => {
        choice.added = true;
        AppDispatcher.dispatch({
          type: AppConstants.CHOICE.ADD,
          choice: choice
        });
      }
    });
  }, 2000, {trailing: false}),
  remove: function(choice) {
    $.ajax({
      dataType: 'json',
      method: 'DELETE',
      data: choice,
      url: Routing.generate('choice_remove', {
        '_format': 'json',
        id: choice.id
      }),
      success: function(data) {
        if (data.decisionId && data.choiceId) {
          AppDispatcher.dispatch({
            type: AppConstants.CHOICE.REMOVE,
            choiceId: data.choiceId,
            decisionId: data.decisionId
          });
        }
      }
    });
  }
};
