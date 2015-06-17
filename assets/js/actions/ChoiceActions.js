import AppDispatcher from '../dispatchers/AppDispatcher.js';
import AppConstants from '../constants/AppConstants.js';

export default {
    update: (choice) => {
        AppDispatcher.dispatch({
            type: AppConstants.UPDATE_CHOICE,
            choice: choice
        });
    }
}