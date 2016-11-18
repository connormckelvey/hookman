import { assert } from 'chai';
import { getSinon } from '../../../test-utils/initialize';
import * as Yargs from 'yargs';
import * as Utils from '../../utils';
import * as FS from 'mz/fs';
import Init from '../init';
import * as Setup from '../../setup';

describe('Init', () => {

  let failureStub: sinon.SinonStub;
  let successStub: sinon.SinonStub;
  let processStub: sinon.SinonStub;

  beforeEach(() => {
    failureStub = getSinon().stub(Utils, 'operationFailure', () => {});
    successStub = getSinon().stub(Utils, 'operationSuccess', () => {});
    processStub = getSinon().stub(process, 'exit', () => {});
  });

  it('fails if no git repo is found', async () => {
    getSinon().stub(FS, 'existsSync', () => false);
    await Init({} as Yargs.Argv);
    assert.deepEqual(failureStub.args, [['Current directory is not a Git repository.']]);
  });
  
  it('fails if hookman is installed', async () => {
    getSinon().stub(FS, 'existsSync', () => true);
    getSinon().stub(Utils, 'hookmanAlreadyInstalled', () => true);
  
    
    await Init({} as Yargs.Argv);
    assert.deepEqual(failureStub.args, [['Hookman already configured. Did you mean hookman install?']]);
  });  

  it('succeeds', async () => {
    getSinon().stub(FS, 'existsSync', () => true);
    getSinon().stub(Utils, 'hookmanAlreadyInstalled', () => false);

    const createHookmanFileStub = getSinon().stub(Setup, 'createHookmanFile', () => {});
    const createHooksDirStub = getSinon().stub(Setup, 'createHooksDir', () => {});
    const createHooksBackupsDirStub = getSinon().stub(Setup, 'createHooksBackupsDir', () => {});
    const backupExistingGitHooksStub = getSinon().stub(Setup, 'backupExistingGitHooks', () => {});
    const createHookEntriesStub = getSinon().stub(Setup, 'createHookEntries', () => {});
    const makeHookEntriesExecutableStub = getSinon().stub(Setup, 'makeHookEntriesExecutable', () => {});
    
    await Init({} as Yargs.Argv);

    assert.deepEqual(createHookmanFileStub.args, [[]]);
    assert.deepEqual(createHooksDirStub.args, [[]]);
    assert.deepEqual(createHooksBackupsDirStub.args, [[]]);
    assert.deepEqual(backupExistingGitHooksStub.args, [[]]);
    assert.deepEqual(makeHookEntriesExecutableStub.args, [[]]);
    assert.deepEqual(createHookEntriesStub.args, [[]]);
    assert.equal(successStub.callCount, 1);
  });  
});