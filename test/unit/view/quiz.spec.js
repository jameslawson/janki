import { List } from 'immutable';
import { div } from '@cycle/dom';
import { State } from '../../../src/model/domain/index' ;
import quizView from '../../../src/view/quiz';
quizView.__Rewire__('response', _ => div('--response-mock--'));
quizView.__Rewire__('card', _ => div('--card-mock--'));
quizView.__Rewire__('navigation', _ => div('--navigation-mock--'));
quizView.__Rewire__('results', _ => div('--results-mock--'));

const notStarted = new State({ 'quizStarted': false });
const started = new State({ 'quizStarted': true, 'showingQuizResults': false });
const ended = new State({ 'quizStarted': true, 'showingQuizResults': true });

suite('quizView');

test('should have a button to start the quiz initially', () => {
  expect(quizView(notStarted)).to.have.subtree.with.tag('button').inside;
});

test('should show the cards when the quiz has started', () => {
  expect(quizView(started)).to.have.subtree.with.text('--card-mock--').inside;
  expect(quizView(started)).to.have.subtree.with.text('--response-mock--').inside;
  expect(quizView(started)).to.have.subtree.with.text('--navigation-mock--').inside;
});

test('should the results when the quiz has ended', () => {
  expect(quizView(ended)).to.have.subtree.with.text('--results-mock--').inside;
});

after(() => {
  __rewire_reset_all__();
});
