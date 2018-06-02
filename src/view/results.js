import { div, h2 } from '@cycle/dom';

function results(state) {
  const correct = state.get('correctAnswersTotal');
  const incorrect = state.get('incorrectAnswersTotal');
  const percentage = Math.floor((correct / state.get('totalCards')) * 100);
  return div('.results', [
    h2('Results'),
    div('.results__percentage', `${percentage}%`),
    div('.results__correct', `Total correct = ${correct}`),
    div('.results__incorrect', `Total incorrect = ${incorrect}`)
  ]);
}

export default results;
