/*global Routing*/
import $ from 'jquery';
import _ from 'lodash';
import AppDispatcher from '../dispatchers/AppDispatcher.js';
import AppConstants from '../constants/AppConstants.js';

let ChoiceActions = {
  update: (choice) => {
    AppDispatcher.dispatch({
      type: AppConstants.CHOICE.UPDATE,
      choice: choice
    });
    ChoiceActions._updateApi(choice);
  },
  _updateApi: _.debounce((choice) => {
    $.ajax({
      accepts: 'json',
      dataType: 'json',
      method: 'PUT',
      data: choice,
      url: Routing.generate('choice_update', {'_format': 'json', id: choice.id}),
      success: function(data) {
        console.log('Choice updated', data);
      }
    });
  }, 800),
  add: _.throttle((decisionId) => {
    $.ajax({
      dataType: 'json',
      method: 'GET',
      url: Routing.generate('decision_choice_new', {
        'id': decisionId,
        '_format': 'json'
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
  remove: (choice) => {
    $.ajax({
      dataType: 'json',
      method: 'DELETE',
      data: choice,
      url: Routing.generate('choice_remove', {
        id: choice.id,
        '_format': 'json'
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

export default ChoiceActions;
