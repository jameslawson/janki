import { button } from '@cycle/dom';

function navigation(state) {
  if (state.get('answerSubmitted')) {
    if (!state.get('quizFinished')) {
      return button('.next.button.button--standard', 'Next Question');
    } else {
      return button('.finish.button.button--standard', 'Finish Quiz');
    }
  }
  return null;
}

export default navigation;
