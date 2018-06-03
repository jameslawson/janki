import { div } from '@cycle/dom';

function response(state) {
  const correct = state.get('isCorrectAnswer');
  const submittedText = `${correct ? 'Correct' : 'Wrong'}`;
  const text = state.get('answerSubmitted') ? submittedText : '';
  return div('.response', text);
}

export default response;
