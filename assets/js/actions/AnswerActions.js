/*global Routing*/
import $ from 'jquery';
import AppDispatcher from '../dispatchers/AppDispatcher.js';
import AppConstants from '../constants/AppConstants.js';

let _AnswerActions = {
  new: (decisionId) => {
    AppDispatcher.dispatch({
      type: AppConstants.ANSWER.REMOVE,
      decisionId: decisionId
    });

    $.ajax({
      dataType: 'json',
      method: 'GET',
      url: Routing.generate('decision_answer', {
        'id': decisionId,
        '_format': 'json'
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
        'id': choice.id,
        '_format': 'json'
      }),
      success: (data) => {
        console.log('Activity logged', data);
      }
    });
  }
};

export default _AnswerActions;
