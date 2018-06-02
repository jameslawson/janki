import { List } from 'immutable';
import { State } from '../../../src/model/domain/index' ;
import resultsView from '../../../src/view/results';

const state = new State({
  'correctAnswersTotal': 60,
  'incorrectAnswersTotal': 40,
  'totalCards': 100
});

suite('resultsView');

test('should contain a heading', () => {
  expect(resultsView(state)).to.have.a.subtree.with.tag('h2').inside;
});

test('should contain a percentage', () => {
  expect(resultsView(state)).to.have.a.subtree.with.tag('div').with.class('results__percentage').inside;
  expect(resultsView(state)).at.root('results__percentage').to.have.text.that.is.equal('60%')
});

test('should show the total correct answers', () => {
  expect(resultsView(state)).to.have.a.subtree.with.tag('div').with.class('results__correct').inside;
  expect(resultsView(state)).at.root('results__correct').to.have.text.that.includes('60')
});

test('should show the total incorrect answers', () => {
  expect(resultsView(state)).to.have.a.subtree.with.tag('div').with.class('results__incorrect').inside;
  expect(resultsView(state)).at.root('results__incorrect').to.have.text.that.includes('40')
});
