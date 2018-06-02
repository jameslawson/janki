import { h1, div, hr } from '@cycle/dom';
import quiz from './quiz';
// import debug from './debug';

function view(state$) {
  return state$.map(state =>
    div('.janki', [
      h1('j-anki'),
      // debugView(state),
      hr(),
      quiz(state)
  ]));
}

export default view;
