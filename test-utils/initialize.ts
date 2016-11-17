import * as sinon from 'sinon';

let sandbox: sinon.SinonSandbox;
export const getSinon = () => sandbox;

beforeEach(() => {
  sandbox = sinon.sandbox.create();
});

afterEach(() => {
  sandbox.restore();
});