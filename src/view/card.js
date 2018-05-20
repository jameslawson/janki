import map from 'lodash/fp/map';
import { h1, div, ol, li, button } from '@cycle/dom';
import flatten from 'lodash.flatten';
import compose from 'lodash.compose';
import { random } from 'array-permutation';
const mapWithIndex = map.convert({ cap: false });

function render(card) {
  console.log('card = ', card);

  const renderChoice = ({ text, index, originalIndex, selected }) => {
    const className = `.choice${ selected ? '.choice--selected' : '' }`;
    const attrs = { 'data-original-index': originalIndex, 'data-index': index, type: 'button' };
    return li(button(className, { attrs }, text));
  }

  return div('card', [
    div('.card__question', card.question),
    ol('.card__choices', card.choices.map(renderChoice)),
  ]);
}

export default render;
