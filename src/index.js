import compose from 'lodash.compose';
import flatten from 'lodash.flatten';
import map from 'lodash/fp/map';
import sampleCombine from 'xstream/extra/sampleCombine'
import xs from 'xstream';
import { List, Record } from 'immutable';
import { makeDOMDriver, h1, div, button } from '@cycle/dom';
import { random } from 'array-permutation';
import { run } from '@cycle/run';

import cardView from './view/card';
import makePreventDefaultDriver from './driver/preventDefault';
import pack from '../resources/pack.json';

const mapWithIndex = map.convert({ cap: false });

const Choice = Record({ text: "", selected: false, originalIndex: -1, index: -1, isCorrect: null });
const Card = Record({ question: "", choices: List.of() });
const State = Record({ card: new Card(), selectedCount: 0, answerSubmitted: false, quizStarted: false, isCorrectAnswer: null });

function main({ DOM }) {
  const choiceClick$ = DOM.select('.choice').events('click');

  const startQuizClick$ = DOM.select('.start').events('click');
  const startQuizReducer$ = startQuizClick$.map(_ => state => {
    function createCardFromPack({ question, incorrect, correct }) {
      const build = (c, index) => Choice({ ...c, index });
      const addOriginalIndex = (c, index) => ({ ...c, originalIndex: index });
      const addTextAndIsCorrect = isCorrect => text => ({ text, isCorrect });

      const choices = compose(
        mapWithIndex(build),
        random,
        mapWithIndex(addOriginalIndex),
        flatten
      )([
        incorrect.map(addTextAndIsCorrect(false)),
        correct.map(addTextAndIsCorrect(true))
      ])
      return new Card({ question, choices: List(choices) });
    }
    return state.set('card', createCardFromPack(pack.cards[0])).set('quizStarted', true)
  });

  const choiceToggle$ = choiceClick$.map(e => e.currentTarget.attributes['data-index'].value);
  const choiceToggleReducer$ = choiceToggle$.map(index => state => {
    function updateNextSelectedCount(state) {
      const path = ['card', 'choices', index, 'selected'];
      const isSelected = state.getIn(path);
      const nextSelectedCount = state.get('selectedCount') + (isSelected ? -1 : 1);
      const answerSubmitted = (nextSelectedCount >= 2) ? true : false;
      return state
        .setIn(path, !isSelected)
        .set('selectedCount', nextSelectedCount)
        .set('answerSubmitted', answerSubmitted);
    }
    function updateCorrectAnswer(state) {
      const answerSubmitted = state.get('answerSubmitted');
      if (answerSubmitted) {
        const selected = state.getIn(['card', 'choices']).filter(choice => choice.get('selected'));
        const isCorrectAnswer = selected.every(choice => choice.get('isCorrect'));
        console.log('isCorrectAnswer', isCorrectAnswer);
        return state.set('isCorrectAnswer', isCorrectAnswer);
      } else {
        return state;
      }
    }
    return compose(updateCorrectAnswer, updateNextSelectedCount)(state);
  });

  const reducers$ = xs.merge(startQuizReducer$, choiceToggleReducer$);
  const state$ = xs.of(new State()).map(state => reducers$.fold((acc, reducer) => reducer(acc), state)).flatten();


  return {
    DOM: state$.map(state =>
      div('.janki', [
        h1('janki'),
        div('quiz started count = ' + state.get('quizStarted')),
        div('selected count = ' + state.get('selectedCount')),
        div('answer submitted = ' + state.get('answerSubmitted')),
        (function() {
          if (!state.get('quizStarted')) {
            return button('.start', 'Start Quiz')
          } else {
            return div([
              cardView(state.get('card').toJS()),
              (function() {
                if (state.get('answerSubmitted')) {
                  const correct = state.get('isCorrectAnswer');
                  return div([
                    div('answer submitted!'),
                    div(`you got the answer ${correct ? 'Right!' : 'Wrong!'}`)
                  ]);
                }
              })()
            ]);
          }
        })()
      ]))
  };
}

run(main, {
  DOM: makeDOMDriver('#app'),
});
