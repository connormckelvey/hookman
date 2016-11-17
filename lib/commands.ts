import * as Yargs from 'yargs';
import Initializer from './initializer';
import Resources from './resources';

interface HookmanFile {
  hooksDir: string;
  hooks: { [ key: string ]: string };
}

const hookmanAlreadyInstalled = () => {
  return Resources.gitDir.exists && 
  Resources.gitHooksDir.exists && 
  Resources.gitHooksDir.files.length && 
  Resources.hookmanFile.exists && 
  Resources.hooksDir.exists && 
  Resources.hooksDir.files.length;
}

export const init = async (argv: Yargs.Argv) => {
    if (!Resources.gitDir.exists) {
      console.log('Error: Current directory is not a Git repository.');
      return;
    }    

    if(hookmanAlreadyInstalled()) {
      console.log('Error: Hookman already installed.');
      return;
    }

    await Initializer.createHookmanFile();
    await Initializer.createHooksDir();
    await Initializer.createHooksBackupsDir();
    await Initializer.backupExistingGitHooks();
    await Initializer.createHookEntries();
    await Initializer.makeHookEntriesExecutable();
    return;
  }