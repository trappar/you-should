import DecisionsContainer from '../components/DecisionsContainer.jsx';
import DecisionActions from '../actions/DecisionActions.js';
import DecisionStore from '../stores/DecisionStore.js';
import DecisionWebApiUtils from '../utils/DecisionWebApiUtils.js';

// This comes from the twig template
DecisionActions.receiveMultiple(initialState.decisions);

React.initializeTouchEvents(true);

React.render(
    <DecisionsContainer />,
    document.getElementById('container')
);