import { Record, List } from 'immutable';

const State = Record({
  cards: List.of(),
  currentCardIndex: -1,
  totalCards: 0,
  numChoicesInAnswer: 0,
  selectedCount: 0,
  answerSubmitted: false,
  quizStarted: false,
  quizFinished: true,
  showingQuizResults: false,
  correctAnswersTotal: 0,
  incorrectAnswersTotal: 0,
  isCorrectAnswer: null
});

export default State;
