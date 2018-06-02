import { Record } from 'immutable';

const Choice = Record({ text: '', selected: false, originalIndex: -1, index: -1, isCorrect: null });

export default Choice;
