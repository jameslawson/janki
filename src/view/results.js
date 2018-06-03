import { div, h2, span } from '@cycle/dom';

function results(state) {
  const correct = state.get('correctAnswersTotal');
  const incorrect = state.get('incorrectAnswersTotal');
  const percentage = Math.floor((correct / state.get('totalCards')) * 100);
  return div('.results', [
    h2('.results__heading', 'Results'),
    div('.results__percentage', `${percentage}%`),
    div('.results__correct', [
      'Correct',
      span('.results__correct__integer', correct.toString())
    ]),
    div('.results__incorrect', [
      'Incorrect',
      span('.results__incorrect__integer', incorrect.toString())
    ])
  ]);
}

export default results;
