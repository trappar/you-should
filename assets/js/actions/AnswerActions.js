import AppDispatcher from '../dispatchers/AppDispatcher.js';
import AppConstants from '../constants/AppConstants.js';

var AnswerActions = {
    new: (decision_id) => {
        AppDispatcher.dispatch({
            type: AppConstants.ANSWER.REMOVE,
            decision_id: decision_id
        });

        $.ajax({
            dataType: "json",
            method: "GET",
            url: Routing.generate('decision_answer', {
                'id': decision_id,
                '_format': 'json'
            }),
            success: (choice) => {
                AppDispatcher.dispatch({
                    type: AppConstants.ANSWER.NEW,
                    decision_id: decision_id,
                    answer: choice
                });
            }
        })
    },
    logActivity: (choice) => {
        AppDispatcher.dispatch({
            type: AppConstants.ANSWER.ISDONE,
            answer: choice
        });

        $.ajax({
            dataType: "json",
            method: "GET",
            url: Routing.generate('choice_log_activity', {
                'id': choice.id,
                '_format': 'json'
            }),
            success: (data) => {
                console.log('Activity logged', data);
            }
        })
    }
};

export default AnswerActions;