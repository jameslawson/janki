import { div, ol, li, button } from '@cycle/dom';
import { Card } from '../model/domain/index';

function card(state) {
  const currentCard = state.getIn([ 'cards', state.get('currentCardIndex') ], new Card());
  const { question, choices } = currentCard.toJS();

  const renderChoice = ({ text, index, originalIndex, selected }) => {
    const className = `.choice${ selected ? '.choice--selected' : '' }`;
    const attrs = { 'data-original-index': originalIndex, 'data-index': index, type: 'button' };
    return li(button(className, { attrs }, text));
  };

  return div('card', [
    div('.card__question', question),
    ol('.card__choices', choices.map(renderChoice))
  ]);
}

export default card;
