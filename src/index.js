import { makeDOMDriver } from '@cycle/dom';
import { run } from '@cycle/run';

import intent from './intent/index';
import model from './model/index';
import view from './view/index';
import './resources/scss/index.scss';

function main(sources) {
  const actions = intent(sources);
  const state$ = model(actions);
  const view$ = view(state$);
  return { DOM: view$ };
}

run(main, {
  DOM: makeDOMDriver('#app')
});
