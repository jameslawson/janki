import { State } from '../../../src/model/domain/index' ;
import responseView from '../../../src/view/response';

const correct = new State({ 'answerSubmitted': true, 'isCorrectAnswer': true });
const incorrect = new State({ 'answerSubmitted': true, 'isCorrectAnswer': false });
const notSubmitted = new State({ 'answerSubmitted': false });

suite('responseView');

test('should tell the user that they are correct', () => {
  expect(responseView(correct)).to.have.text.that.includes('Correct');
});

test('should tell the user that they are incorrect', () => {
  expect(responseView(incorrect)).to.have.text.that.includes('Wrong');
});

test('should not show anything if the answer has not been submitted', () => {
  expect(responseView(notSubmitted)).to.have.text.that.includes('Choose Below');
});
