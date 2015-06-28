/* global Routing */
import $ from 'jquery';
import AppDispatcher from '../dispatchers/AppDispatcher.js';
import AppConstants from '../constants/AppConstants.js';

export default {
  setUser: function(user) {
    if (user !== null) {
      AppDispatcher.dispatch({
        type: AppConstants.USER.LOGIN,
        user: user
      });
      AppDispatcher.dispatch({
        type: AppConstants.DECISION.RECEIVE_MULTIPLE,
        decisions: user.decisions
      });
    } else {
      AppDispatcher.dispatch({
        type: AppConstants.USER.LOGOUT
      });
    }
  },

  requestUser: function() {
    $.ajax({
      accepts: 'json',
      dataType: 'json',
      url: Routing.generate('security_user_current', {
        '_format': 'json'
      }),
      success: (user) => {
        this.setUser(user);
      }
    });
  }
};
