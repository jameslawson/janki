import { button } from '@cycle/dom';

function navigation(state) {
  if (state.get('answerSubmitted')) {
    if (!state.get('quizFinished')) {
      return button('.next', 'Next Question');
    } else {
      return button('.finish', 'Finish Quiz');
    }
  }
  return null;
}

export default navigation;
