import { button, div } from '@cycle/dom';
import card from './card';
import results from './results';
import response from './response';
import navigation from './navigation';
import { List } from 'immutable';

function quiz(state) {
  if (!state.get('quizStarted')) {
    return button('.start', 'Start Quiz');
  } else if (!state.get('showingQuizResults')) {
    return div([
      card(state),
      response(state),
      navigation(state)
    ]);
  } else {
    return results(state);
  }
}

export default quiz;
