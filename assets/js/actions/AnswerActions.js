/*global Routing*/
import $ from 'jquery';
import AppDispatcher from '../dispatchers/AppDispatcher.js';
import AppConstants from '../constants/AppConstants.js';

export default {
  new: (decisionId) => {
    AppDispatcher.dispatch({
      type: AppConstants.ANSWER.REMOVE,
      decisionId: decisionId
    });

    $.ajax({
      dataType: 'json',
      method: 'GET',
      url: Routing.generate('decision_answer', {
        '_format': 'json',
        'id': decisionId
      }),
      success: (choice) => {
        AppDispatcher.dispatch({
          type: AppConstants.ANSWER.NEW,
          decisionId: decisionId,
          answer: choice
        });
      }
    });
  },
  logActivity: (choice) => {
    AppDispatcher.dispatch({
      type: AppConstants.ANSWER.ISDONE,
      answer: choice
    });

    $.ajax({
      dataType: 'json',
      method: 'GET',
      url: Routing.generate('choice_log_activity', {
        '_format': 'json',
        'id': choice.id
      }),
      success: (data) => {
        console.log('Activity logged', data);
      }
    });
  }
};
