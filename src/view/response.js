import { div } from '@cycle/dom';

function response(state) {
  const correct = state.get('isCorrectAnswer');
  const submittedText = `${correct ? 'Correct ✓' : 'Wrong ✗'}`;
  const text = state.get('answerSubmitted') ? submittedText : 'Choose Below ↓';
  return div('.response', text);
}

export default response;
