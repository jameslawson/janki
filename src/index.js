import xs from 'xstream';
import sampleCombine from 'xstream/extra/sampleCombine';
import { makeDOMDriver, h1, h2, div, button, hr } from '@cycle/dom';
import { run } from '@cycle/run';

import startQuizReducer from './model/startQuizReducer';
import choiceToggleReducer from './model/choiceToggleReducer';
import nextQuestionReducer from './model/nextQuestionReducer';
import finishQuizReducer from './model/finishQuizReducer';
import { State } from './model/domain/index';

import mainView from './view/main';
import debugView from './view/debug';
import makePreventDefaultDriver from './driver/preventDefault';

function main({ DOM }) {
  const choiceClick$ = DOM.select('.choice').events('click');
  const startQuizClick$ = DOM.select('.start').events('click');
  const finishClick$ = DOM.select('.finish').events('click');
  const choiceToggle$ = choiceClick$.map(e => e.currentTarget.attributes['data-index'].value);
  const nextQuestionClick$ = DOM.select('.next').events('click');

  const reducers$ = xs.merge(
    startQuizClick$.map(startQuizReducer),
    choiceToggle$.map(choiceToggleReducer),
    nextQuestionClick$.map(nextQuestionReducer),
    finishClick$.map(finishQuizReducer)
  );
  const state$ = xs.of(new State())
    .map(state => reducers$.fold((acc, reducer) => reducer(acc), state))
    .flatten();

  return {
    DOM: state$.map(state =>
      div('.janki', [
        h1('j-anki'),
        // debugView(state),
        hr(),
        mainView(state)
      ]))
  };
}

run(main, {
  DOM: makeDOMDriver('#app'),
});
