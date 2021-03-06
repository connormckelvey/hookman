import * as Yargs from 'yargs';
import * as Setup from '../setup';
import Resources from '../resources';
import { hookmanAlreadyInstalled, asyncWrapper, operationSuccess as success, operationFailure as failure } from '../utils';


const init = async (argv: Yargs.Argv) => {
  if (!Resources.gitDir.exists) {
    failure('Current directory is not a Git repository.');
    return;
  }

  if (!Resources.gitHooksDir.exists) {
    await Setup.createGitHooksDir();
  }

  if (hookmanAlreadyInstalled()) {
    failure('Hookman already configured. Did you mean hookman install?');
    return;
  }

  await Setup.createHookmanFile();
  await Setup.createHooksDir();
  await Setup.createHooksBackupsDir();
  await Setup.backupExistingGitHooks();
  await Setup.createHookEntries();
  await Setup.makeHookEntriesExecutable();

  success(`\r\nSetup complete. You can now add command line executables to ${Resources.hooksDir.path}`);
};

export default init;
export const command = 'init';
export const desc = 'Set up hookman';
export const builder = {};
export const handler = asyncWrapper(init);