import { div } from '@cycle/dom';

function response(state) {
  if (state.get('answerSubmitted')) {
    const correct = state.get('isCorrectAnswer');
    return div([
      div(`you got the answer ${correct ? 'Right!' : 'Wrong!'}`)
    ]);
  }
  return div();
}

export default response;
