import { button, div } from '@cycle/dom';
import card from './card';
import results from './results';
import response from './response';
import navigation from './navigation';

function quiz(state) {
  if (!state.get('quizStarted')) {
    return button('.start.button.button--standard', 'Start Quiz');
  } else if (!state.get('showingQuizResults')) {
    return div('.quiz', [
      card(state),
      response(state),
      div('.quiz__navigation', [
        navigation(state)
      ])
    ]);
  } else {
    return results(state);
  }
}

export default quiz;
