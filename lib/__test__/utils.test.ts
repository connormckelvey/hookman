import { assert } from 'chai';
import * as Utils from '../utils';
import { getSinon } from '../../test-utils/initialize';
import { Resource } from '../resources';
import * as Inquirer from 'inquirer';

describe('Utils', () => {
  describe('#getTimestamp', () => {
    it('generates a timestamp of the correct length', () => {
      assert.equal(Utils.getTimestamp().length, 14);
    });
  });

  describe('#asyncWrapper', () => {
    it('returns a function that returns a promise', () => {
      const spy = getSinon().spy();
      const wrappedFunction = Utils.asyncWrapper(spy);
      const result = wrappedFunction({} as any);

      assert.isFunction(wrappedFunction);
      assert.isDefined(result.then);
      assert.deepEqual(spy.args, [[{}]]);
    });
  });

  describe('#getPackageJSON', () => {
    it('returns a parsed package.json', () => {
      const contents = Utils.getPackageJSON();
      assert.equal(contents.name, 'hookman');
    });
  });

  describe('#replaceOrAbort', () => {
    let resource: any;
    let promptStub: any;
    let processStub: any;

    beforeEach(() => {
      resource = { exists: true,  name: 'fixture.ts' } as Resource;
      promptStub = getSinon().stub(Inquirer, 'prompt', () => { return { shouldReplace: false }; });
      processStub = getSinon().stub(process, 'exit', () => {});
    });

    it('exits with code of 0 without confirmation', async () => {
      await Utils.replaceOrAbort(resource, 'abort');
      assert.equal(promptStub.callCount, 1);
      assert.equal(promptStub.args[0][0].length, 1);
      assert.equal(promptStub.args[0][0][0].default, false);
      assert.equal(promptStub.args[0][0][0].message, 'fixture.ts already exists. Would you like to replace it?');
      assert.equal(promptStub.args[0][0][0].name, 'shouldReplace');
      assert.equal(promptStub.args[0][0][0].type, 'confirm');

      assert.deepEqual(processStub.args, [[0]]);
    });

    it('returns with confimation', async () => {
      (Inquirer.prompt as sinon.SinonStub).restore();
      promptStub = getSinon().stub(Inquirer, 'prompt', () => { return { shouldReplace: true }; });
      const result = await Utils.replaceOrAbort(resource, 'abort');

      assert.equal(promptStub.callCount, 1);
      assert.equal(promptStub.args[0][0].length, 1);
      assert.equal(promptStub.args[0][0][0].default, false);
      assert.equal(promptStub.args[0][0][0].message, 'fixture.ts already exists. Would you like to replace it?');
      assert.equal(promptStub.args[0][0][0].name, 'shouldReplace');
      assert.equal(promptStub.args[0][0][0].type, 'confirm');
      assert.equal(processStub.callCount, 0);
      assert.isUndefined(result);
    });

    it('returns when file does not exist', async () => {
      resource.exists = false;
      const result = await Utils.replaceOrAbort(resource, 'abort');

      assert.equal(promptStub.callCount, 0);
      assert.equal(processStub.callCount, 0);
      assert.isUndefined(result);
    });
  });
});