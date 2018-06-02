import { Record, List } from 'immutable';

const Card = Record({ question: "", choices: List.of(), numChoicesInAnswer: 0 });

export default Card;

