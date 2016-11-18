"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const chai_1 = require('chai');
const Utils = require('../utils');
const initialize_1 = require('../../test-utils/initialize');
const Inquirer = require('inquirer');
describe('Utils', () => {
    describe('#getTimestamp', () => {
        it('generates a timestamp of the correct length', () => {
            chai_1.assert.equal(Utils.getTimestamp().length, 14);
        });
    });
    describe('#asyncWrapper', () => {
        it('returns a function that returns a promise', () => {
            const spy = initialize_1.getSinon().spy();
            const wrappedFunction = Utils.asyncWrapper(spy);
            const result = wrappedFunction({});
            chai_1.assert.isFunction(wrappedFunction);
            chai_1.assert.isDefined(result.then);
            chai_1.assert.deepEqual(spy.args, [[{}]]);
        });
    });
    describe('#getPackageJSON', () => {
        it('returns a parsed package.json', () => {
            const contents = Utils.getPackageJSON();
            chai_1.assert.equal(contents.name, 'hookman');
        });
    });
    describe('#replaceOrAbort', () => {
        let resource;
        let promptStub;
        let processStub;
        beforeEach(() => {
            resource = { exists: true, name: 'fixture.ts' };
            promptStub = initialize_1.getSinon().stub(Inquirer, 'prompt', () => { return { shouldReplace: false }; });
            processStub = initialize_1.getSinon().stub(process, 'exit', () => { });
        });
        it('exits with code of 0 without confirmation', () => __awaiter(this, void 0, void 0, function* () {
            yield Utils.replaceOrAbort(resource, 'abort');
            chai_1.assert.equal(promptStub.callCount, 1);
            chai_1.assert.equal(promptStub.args[0][0].length, 1);
            chai_1.assert.equal(promptStub.args[0][0][0].default, false);
            chai_1.assert.equal(promptStub.args[0][0][0].message, 'fixture.ts already exists. Would you like to replace it?');
            chai_1.assert.equal(promptStub.args[0][0][0].name, 'shouldReplace');
            chai_1.assert.equal(promptStub.args[0][0][0].type, 'confirm');
            chai_1.assert.deepEqual(processStub.args, [[0]]);
        }));
        it('returns with confimation', () => __awaiter(this, void 0, void 0, function* () {
            Inquirer.prompt.restore();
            promptStub = initialize_1.getSinon().stub(Inquirer, 'prompt', () => { return { shouldReplace: true }; });
            const result = yield Utils.replaceOrAbort(resource, 'abort');
            chai_1.assert.equal(promptStub.callCount, 1);
            chai_1.assert.equal(promptStub.args[0][0].length, 1);
            chai_1.assert.equal(promptStub.args[0][0][0].default, false);
            chai_1.assert.equal(promptStub.args[0][0][0].message, 'fixture.ts already exists. Would you like to replace it?');
            chai_1.assert.equal(promptStub.args[0][0][0].name, 'shouldReplace');
            chai_1.assert.equal(promptStub.args[0][0][0].type, 'confirm');
            chai_1.assert.equal(processStub.callCount, 0);
            chai_1.assert.isUndefined(result);
        }));
        it('returns when file does not exist', () => __awaiter(this, void 0, void 0, function* () {
            resource.exists = false;
            const result = yield Utils.replaceOrAbort(resource, 'abort');
            chai_1.assert.equal(promptStub.callCount, 0);
            chai_1.assert.equal(processStub.callCount, 0);
            chai_1.assert.isUndefined(result);
        }));
    });
});
