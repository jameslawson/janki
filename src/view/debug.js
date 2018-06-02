import { div } from '@cycle/dom';

function render(state) {
  return div('debug', [
    div('quizStarted = ' + state.get('quizStarted')),
    div('quizFinished = ' + state.get('quizFinished')),
    div('current card index = ' + state.get('currentCardIndex')),
    div('totalCards = ' + state.get('totalCards')),
    div('selectedCount = ' + state.get('selectedCount')),
    div('answerSubmitted = ' + state.get('answerSubmitted')),
    div('correctAnswersTotal = ' + state.get('correctAnswersTotal')),
    div('incorrectAnswersTotal = ' + state.get('incorrectAnswersTotal'))
  ]);
}

export default render;
