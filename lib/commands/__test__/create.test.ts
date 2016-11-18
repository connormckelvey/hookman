import { assert } from 'chai';
import { getSinon } from '../../../test-utils/initialize';
import * as Yargs from 'yargs';
import * as Utils from '../../utils';
import * as FS from 'mz/fs';
import Create from '../create';
import * as Manage from '../../manage';

describe('Create', () => {

  let failureStub: sinon.SinonStub;
  let successStub: sinon.SinonStub;
  let processStub: sinon.SinonStub;

  beforeEach(() => {
    failureStub = getSinon().stub(Utils, 'operationFailure', () => {});
    successStub = getSinon().stub(Utils, 'operationSuccess', () => {});
    processStub = getSinon().stub(process, 'exit', () => {});
    getSinon().stub(Manage, 'promptForHookName').returns(Promise.resolve('pre-commit'));
    getSinon().stub(Utils, 'replaceOrAbort').returns(Promise.resolve({ shouldReplace: false }));

  });

  it('fails if no git repo is found', async () => {
    getSinon().stub(FS, 'existsSync', () => false);
    await Create({} as Yargs.Argv);
    assert.deepEqual(failureStub.args, [['Current directory is not a Git repository.']]);
  });
  
  it('fails if hookman is not installed', async () => {
    getSinon().stub(FS, 'existsSync', () => true);
    getSinon().stub(Utils, 'hookmanAlreadyInstalled', () => false);
  
    await Create({} as Yargs.Argv);
    assert.deepEqual(failureStub.args, [['Hookman is not yet configured for this project.']]);
  });  

  it('succeeds', async () => {
    getSinon().stub(FS, 'existsSync', () => true);
    getSinon().stub(Utils, 'hookmanAlreadyInstalled', () => true);

    const createHookStub = getSinon().stub(Manage, 'createHook', async () => {});
    const makeHookExecutableStub = getSinon().stub(Manage, 'makeHookExecutable', async () => {});
    
    await Create({} as Yargs.Argv);
    assert.equal(createHookStub.args[0][0].name, 'pre-commit');
    assert.equal(makeHookExecutableStub.args[0][0].name, 'pre-commit');
  });  
});