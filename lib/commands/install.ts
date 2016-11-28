import * as Yargs from 'yargs';
import * as Setup from '../setup';
import Resources from '../resources';
import { hookmanAlreadyInstalled, asyncWrapper, operationSuccess as success, operationFailure as failure } from '../utils';

const install = async(argv: Yargs.Argv) => {
  if (!Resources.gitDir.exists) {
    failure('Current directory is not a Git repository.');
    return;
  }

  if (!Resources.gitHooksDir.exists) {
    await Setup.createGitHooksDir();
  }

  if (!hookmanAlreadyInstalled()) {
    failure('Hookman is not yet configured for this project.');
    return;
  }

  if (!Resources.hooksBackupsDir.exists) {
    await Setup.createHooksBackupsDir();
  }
    
  await Setup.backupExistingGitHooks();
  await Setup.createHookEntries();
  await Setup.makeHookEntriesExecutable();

  success(`\r\nSetup complete. Your project's hooks are now configured for use with Git.`);
};

export default install;
export const command = 'install';
export const desc = 'Configure existing hook files with git';
export const builder = {};
export const handler = asyncWrapper(install);