import { h1, h2, div, ol, li, button } from '@cycle/dom';

function results(state) {
  const correct = state.get('correctAnswersTotal');
  const incorrect = state.get('incorrectAnswersTotal');
  const percentage = Math.floor((correct / state.get('totalCards')) * 100);
  return div('.results', [
    h2('Results'),
    div('.results__percentage', `${percentage}%`),
    div(`Total correct = ${correct}`),
    div(`Total incorrect = ${incorrect}`)
  ]);
}

export default results;
