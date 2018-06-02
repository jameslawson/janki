import chai from 'chai';
import chaiImmutable from 'chai-immutable';
import snabbdomChai from 'snabbdom-chai';

chai.use(chaiImmutable);
chai.use(snabbdomChai);

global.expect = chai.expect;
// global.toState = toState;
// __rewire_reset_all__();
