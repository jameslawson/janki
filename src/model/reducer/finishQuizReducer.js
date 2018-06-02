const finishQuizReducer = _ => state => {
  return state.set('showingQuizResults', true);
};

export default finishQuizReducer;
