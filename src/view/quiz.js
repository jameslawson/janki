import { button, div, svg } from '@cycle/dom';
import card from './card';
import results from './results';
import response from './response';
import navigation from './navigation';

function quiz(state) {
  if (!state.get('quizStarted')) {
    return button('.start.button.button--standard', 'Start Quiz');
  } else if (!state.get('showingQuizResults')) {
    return div('.quiz', [
      card(state),
      response(state),
      div('.quiz__navigation', [
        navigation(state)
      ]),
      button('.quiz__close-button.button.button--close', [
        svg({ attrs: { height: "100%", viewBox: "0 0 24 24", width: "100%" }}, [
          svg.path({ attrs: { d: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z", fill: "#888888" }})
        ])
      ])
    ]);
  } else {
    return results(state);
  }
}

export default quiz;
