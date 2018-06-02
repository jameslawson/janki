function intent({ DOM }) {
  const choiceClick$ = DOM.select('.choice').events('click');
  const startQuizClick$ = DOM.select('.start').events('click');
  const finishClick$ = DOM.select('.finish').events('click');
  const choiceToggle$ = choiceClick$.map(e => e.currentTarget.attributes['data-index'].value);
  const nextQuestionClick$ = DOM.select('.next').events('click');

  return {
    choiceClick$,
    startQuizClick$,
    finishClick$,
    choiceToggle$,
    nextQuestionClick$
  };
}

export default intent;
