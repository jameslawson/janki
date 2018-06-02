import { List } from 'immutable';
import { Card, Choice, State } from '../../../src/model/domain/index' ;
import cardView from '../../../src/view/card';

const state = new State({
  'cards': List.of(
      Card({
        'question': 'The capital of England is ____',
        'choices': List.of(
          Choice({ originalIndex: 0, index: 0, selected: false, text: 'London' }),
          Choice({ originalIndex: 1, index: 1, selected: true, text: 'Birmingham' }),
          Choice({ originalIndex: 2, index: 2, selected: false, text: 'Manchester' })
        )
      })
  ),
  'currentCardIndex': 0
});

suite('cardView');

test('should contain the question', () => {
  expect(cardView(state)).to.have.a.subtree.with.tag('div').with.class('card__question').inside;
});

test('should contain the choices', () => {
  expect(cardView(state)).to.have.a.subtree.with.tag('ol').with.class('card__choices').inside;
  expect(cardView(state)).to.have.a.subtree.with.class('choice').inside;
});

test('should contain add a "selected" class for selected choices', () => {
  expect(cardView(state)).to.have.a.subtree.with.class('choice--selected').inside;
});
