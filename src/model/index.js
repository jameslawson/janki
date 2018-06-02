import xs from 'xstream';
import { State } from './domain/index';
import startQuizReducer from './reducer/startQuizReducer';
import choiceToggleReducer from './reducer/choiceToggleReducer';
import nextQuestionReducer from './reducer/nextQuestionReducer';
import finishQuizReducer from './reducer/finishQuizReducer';

function redux(reducers$) {
  const state$ = xs.of(new State())
    .map(state => reducers$.fold((acc, reducer) => reducer(acc), state))
    .flatten();
  return state$;
}

function model({ startQuizClick$, choiceToggle$, nextQuestionClick$, finishClick$ }) {
  const reducers$ = xs.merge(
    startQuizClick$.map(startQuizReducer),
    choiceToggle$.map(choiceToggleReducer),
    nextQuestionClick$.map(nextQuestionReducer),
    finishClick$.map(finishQuizReducer)
  );
  return redux(reducers$);
}

export { redux };
export default model;
