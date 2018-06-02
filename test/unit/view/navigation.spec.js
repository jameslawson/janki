import { State } from '../../../src/model/domain/index' ;
import navigationView from '../../../src/view/navigation';

const submittedAnswer = new State({ 'answerSubmitted': true, 'quizFinished': false });
const finishedQuiz = new State({ 'answerSubmitted': true, 'quizFinished': true });

suite('navigationView');

test('should have a button to move on the next question', () => {
  expect(navigationView(submittedAnswer)).to.have.tag('button').and.text('Next Question');
});

test('should have a button to move on the next question', () => {
  expect(navigationView(finishedQuiz)).to.have.tag('button').and.text('Finish Quiz');
});
