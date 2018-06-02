const nextQuestionReducer = _ => state => {
  return state
    .update('currentCardIndex', i => i + 1)
    .set('selectedCount', 0)
    .set('answerSubmitted', false);
};

export default nextQuestionReducer;
