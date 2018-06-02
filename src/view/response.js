import { h1, h2, div, ol, li, button } from '@cycle/dom';

function response(state) {
  if (state.get('answerSubmitted')) {
    const correct = state.get('isCorrectAnswer');
    return div([
      div(`you got the answer ${correct ? 'Right!' : 'Wrong!'}`),
    ]);
  }
}

export default response;
