import { h1, h2, div, ol, li, button } from '@cycle/dom';
import cardView from './card';

function render(state) {
  if (!state.get('quizStarted')) {
    return button('.start', 'Start Quiz')
  } else if (!state.get('showingQuizResults')) {
    return div([
      cardView(state.getIn(['cards', state.get('currentCardIndex')]).toJS()),
      (function() {
        if (state.get('answerSubmitted')) {
          const correct = state.get('isCorrectAnswer');
          return div([
            div(`you got the answer ${correct ? 'Right!' : 'Wrong!'}`),
            (function() {
              if (!state.get('quizFinished')) {
                return button('.next', 'Next Question')
              } else {
                return button('.finish', 'Finish Quiz')
              }
            })()
          ]);
        }
      })()
    ]);
  } else {
    const correct = state.get('correctAnswersTotal');
    const incorrect = state.get('incorrectAnswersTotal');
    const percentage = Math.floor((correct / state.get('totalCards')) * 100);
    return div('.results', [
      h2('Results'),
      div('.results__percentage', `${percentage}%`),
      div(`Total correct = ${correct}`),
      div(`Total incorrect = ${incorrect}`)
    ])
  }
}

export default render;
