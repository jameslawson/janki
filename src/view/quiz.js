import { h1, h2, div, ol, li, button } from '@cycle/dom';
import cardView from './card';
import results from './results';
import response from './response';
import navigation from './navigation';

function quiz(state) {
  if (!state.get('quizStarted')) {
    return button('.start', 'Start Quiz')
  } else if (!state.get('showingQuizResults')) {
    return div([
      cardView(state.getIn(['cards', state.get('currentCardIndex')]).toJS()),
      response(state),
      navigation(state)
    ]);
  } else {
    return results(state);
  }
}

export default quiz;
