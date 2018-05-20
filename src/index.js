import compose from 'lodash.compose';
import flatten from 'lodash.flatten';
import map from 'lodash/fp/map';
import sampleCombine from 'xstream/extra/sampleCombine'
import xs from 'xstream';
import { List, Record } from 'immutable';
import { makeDOMDriver, h1, h2, div, button, hr } from '@cycle/dom';
import { random } from 'array-permutation';
import { run } from '@cycle/run';

import cardView from './view/card';
import makePreventDefaultDriver from './driver/preventDefault';
import pack from '../resources/pack.json';

const mapWithIndex = map.convert({ cap: false });

const Choice = Record({ text: "", selected: false, originalIndex: -1, index: -1, isCorrect: null });
const Card = Record({ question: "", choices: List.of(), numChoicesInAnswer: 0 });
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
      return new Card({
        question,
        choices: List(choices),
        numChoicesInAnswer: correct.length
      });
    }

    const packCards = [pack.cards[0], pack.cards[1], pack.cards[2]];
    const cards = List(map(createCardFromPack)(packCards));

    return state
      .set('cards', cards)
      .set('totalCards', cards.size)
      .set('currentCardIndex', 0)
      .set('quizStarted', true)
      .set('quizFinished', false)
      .set('selectedCount', 0)
      .set('answerSubmitted', false)
  });

  const nextQuestionClick$ = DOM.select('.next').events('click');
  const nextQuestionReducer$ = nextQuestionClick$.map(_ => state => {
    return state
      .update('currentCardIndex', i => i + 1)
      .set('selectedCount', 0)
      .set('answerSubmitted', false)
  });

  const finishClick$ = DOM.select('.finish').events('click');
  const finishClickReducer$ = finishClick$.map(_ => state => {
    return state.set('showingQuizResults', true)
  });

  const choiceToggle$ = choiceClick$.map(e => e.currentTarget.attributes['data-index'].value);
  const choiceToggleReducer$ = choiceToggle$.map(choiceIndex => state => {
    function updateNextSelectedCount(state) {
      const currentIndex = state.get('currentCardIndex');
      const path = ['cards', currentIndex, 'choices', choiceIndex, 'selected'];
      const numChoicesInAnswer = state.getIn(['cards', currentIndex, 'numChoicesInAnswer']);
      const isSelected = state.getIn(path);
      const nextSelectedCount = state.get('selectedCount') + (isSelected ? -1 : 1);
      const answerSubmitted = (nextSelectedCount >= numChoicesInAnswer) ? true : false;
      return state
        .setIn(path, !isSelected)
        .set('selectedCount', nextSelectedCount)
        .set('answerSubmitted', answerSubmitted);
    }
    function updateAnswerSubmitted(state) {
      const index = state.get('currentCardIndex');
      const answerSubmitted = state.get('answerSubmitted');
      if (answerSubmitted) {
        const selected = state.getIn(['cards', index, 'choices']).filter(choice => choice.get('selected'));
        const isCorrectAnswer = selected.every(choice => choice.get('isCorrect'));
        const quizFinished = index === state.get('totalCards') - 1;
        return state
          .set('isCorrectAnswer', isCorrectAnswer)
          .set('quizFinished', quizFinished)
          .update('correctAnswersTotal', total => total + (isCorrectAnswer ? 1 : 0))
          .update('incorrectAnswersTotal', total => total + (!isCorrectAnswer ? 1 : 0))
      } else {
        return state;
      }
    }
    return compose(updateAnswerSubmitted, updateNextSelectedCount)(state);
  });

  const reducers$ = xs.merge(
    finishClickReducer$,
    startQuizReducer$,
    nextQuestionReducer$,
    choiceToggleReducer$
  );
  const state$ = xs.of(new State())
    .map(state => reducers$.fold((acc, reducer) => reducer(acc), state))
    .flatten();


  return {
    DOM: state$.map(state =>
      div('.janki', [
        h1('janki'),
        div('quizStarted = ' + state.get('quizStarted')),
        div('quizFinished = ' + state.get('quizFinished')),
        div('current card index = ' + state.get('currentCardIndex')),
        div('totalCards = ' + state.get('totalCards')),
        div('selectedCount = ' + state.get('selectedCount')),
        div('answerSubmitted = ' + state.get('answerSubmitted')),
        div('correctAnswersTotal = ' + state.get('correctAnswersTotal')),
        div('incorrectAnswersTotal = ' + state.get('incorrectAnswersTotal')),
        hr(),
        (function() {
          if (!state.get('quizStarted')) {
            return button('.start', 'Start Quiz')
          } else if (!state.get('showingQuizResults')) {
            return div([
              cardView(state.getIn(['cards', state.get('currentCardIndex')]).toJS()),
              (function() {
                if (state.get('answerSubmitted')) {
                  const correct = state.get('isCorrectAnswer');
                  return div([
                    div(`you got the answer ${correct ? 'Right!' : 'Wrong!'}`),
                    (function() {
                      if (!state.get('quizFinished')) {
                        return button('.next', 'Next Question')
                      } else {
                        return button('.finish', 'Finish Quiz')
                      }
                    })()
                 ]);
                }
              })()
            ]);
          } else {
            const correct = state.get('correctAnswersTotal');
            const incorrect = state.get('incorrectAnswersTotal');
            const percentage = Math.floor((correct / incorrect) * 100);
            return div('.results', [
              h2('Results'),
              div('.results__percentage', `${percentage}%`),
              div(`Total correct = ${correct}`),
              div(`Total incorrect = ${incorrect}`)
            ])
          }
        })()
      ]))
  };
}

run(main, {
  DOM: makeDOMDriver('#app'),
});
