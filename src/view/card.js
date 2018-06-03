import { button, div, li, ol, span } from '@cycle/dom';
import { Card } from '../model/domain/index';

function card(state) {
  const currentCard = state.getIn([ 'cards', state.get('currentCardIndex') ], new Card());
  const { question, choices } = currentCard.toJS();

  const renderChoice = ({ text, index, originalIndex, selected }) => {
    const className = `.choice${ selected ? '.choice--selected' : '' }`;
    const attrs = { 'data-original-index': originalIndex, 'data-index': index, type: 'button' };
    return li('.choices__item', [
      button(className, { attrs }, [
        span('.choice__bullet'),
        span('.choice__text', text)
      ])
    ]);
  };

  const submitted = state.get('answerSubmitted') === true;
  const correct = state.get('isCorrectAnswer') === true;
  const correctClass = (submitted && correct) ? '.card--correct' : ''
  const incorrectClass = (submitted && !correct) ? '.card--incorrect' : ''
  const cardClass = `.card${correctClass}${incorrectClass}`;

  return div(cardClass, [
    div('.card__question', question),
    ol('.card__choices', choices.map(renderChoice))
  ]);
}

export default card;
