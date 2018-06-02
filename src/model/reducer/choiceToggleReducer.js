const choiceToggleReducer = choiceIndex => state => {
    const answerSubmitted = state.get('answerSubmitted');
    if (answerSubmitted) { return state; }

    const currentIndex = state.get('currentCardIndex');
    const path = ['cards', currentIndex, 'choices', choiceIndex, 'selected'];
    const numChoicesInAnswer = state.getIn(['cards', currentIndex, 'numChoicesInAnswer']);
    const isSelected = state.getIn(path);
    const nextSelectedCount = state.get('selectedCount') + (isSelected ? -1 : 1);
    const answerSubmittedNext = (nextSelectedCount >= numChoicesInAnswer) ? true : false;
    const stateWithSelection = state
      .setIn(path, !isSelected)
      .set('selectedCount', nextSelectedCount)
      .set('answerSubmitted', answerSubmittedNext);

    if (!answerSubmitted && answerSubmittedNext) {
      const selected = state.getIn(['cards', currentIndex, 'choices']).filter(choice => choice.get('selected'));
      const isCorrectAnswer = selected.every(choice => choice.get('isCorrect'));
      const quizFinished = currentIndex === state.get('totalCards') - 1;
      return stateWithSelection
        .set('isCorrectAnswer', isCorrectAnswer)
        .set('quizFinished', quizFinished)
        .update('correctAnswersTotal', total => total + (isCorrectAnswer ? 1 : 0))
        .update('incorrectAnswersTotal', total => total + (!isCorrectAnswer ? 1 : 0))
    } else {
      return stateWithSelection;
    }
}

export default choiceToggleReducer;
