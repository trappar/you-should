import React from 'react';
import $ from 'jquery';
import DecisionsContainer from '../components/DecisionsContainer.jsx';
import DecisionActions from '../actions/DecisionActions.js';
import DecisionStore from '../stores/DecisionStore.js';
import ChoiceStore from '../stores/ChoiceStore.js';
import AnswerStore from '../stores/AnswerStore.js';

// This comes from the twig template
DecisionActions.receiveMultiple(initialState.decisions);

$("#dumpNow").click(function() {
  console.log('answerstore', AnswerStore.dump());
  console.log('decisionstore', DecisionStore.dump());
  console.log('choicestore', ChoiceStore.dump());
});

React.render(
  <DecisionsContainer />,
  document.getElementById('container')
);
