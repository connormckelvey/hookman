"use strict";
const sinon = require('sinon');
let sandbox;
exports.getSinon = () => sandbox;
beforeEach(() => {
    sandbox = sinon.sandbox.create();
});
afterEach(() => {
    sandbox.restore();
});
//# sourceMappingURL=initialize.js.map