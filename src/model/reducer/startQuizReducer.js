import map from 'lodash/fp/map';
import { random } from 'array-permutation';
import flatten from 'lodash.flatten';
import compose from 'lodash.compose';
import pack from '../../../resources/pack.json';
import { Choice, Card } from '../domain/index';
import { List } from 'immutable';

const mapWithIndex = map.convert({ cap: false });

const startQuizReducer = _ => state => {
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
      ]);
      return new Card({
        question,
        choices: List(choices),
        numChoicesInAnswer: correct.length
      });
    }

    const packCards = [ pack.cards[0], pack.cards[1], pack.cards[2] ];
    const cards = List(map(createCardFromPack)(packCards));

    return state
      .set('cards', cards)
      .set('totalCards', cards.size)
      .set('currentCardIndex', 0)
      .set('quizStarted', true)
      .set('quizFinished', false)
      .set('selectedCount', 0)
      .set('answerSubmitted', false);
};

export default startQuizReducer;
