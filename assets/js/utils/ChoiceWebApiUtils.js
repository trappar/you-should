import ChoiceActions from '../actions/ChoiceActions.js';

export default {
    update: _.debounce((choice) => {
        $.ajax({
            accepts: "json",
            dataType: "json",
            method: "PUT",
            data: choice,
            url: Routing.generate('choice_update', {'_format': 'json', id: choice.id}),
            success: function(data) {
                console.log('Choice updated', data);
            }
        });
    }, 800)
};