import * as Yargs from 'yargs';
import * as Initializer from './initializer';
import * as Creator from './creator';
import Resources, { Resource } from './resources';

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
    console.log('Current directory is not a Git repository.');
    return;
  }    

  if(hookmanAlreadyInstalled()) {
    console.log('Hookman already installed.');
    return;
  }

  await Initializer.createHookmanFile();
  await Initializer.createHooksDir();
  await Initializer.createHooksBackupsDir();
  await Initializer.backupExistingGitHooks();
  await Initializer.createHookEntries();
  await Initializer.makeHookEntriesExecutable();

  console.log(`\r\nSetup complete. You can now add command line executables to ${Resources.hooksDir.path}`)
  return;
}

export const create = async (argv: Yargs.Argv) => {
  if (!Resources.gitDir.exists) {
    console.log('Current directory is not a Git repository.');
    return;
  }    

  if(!hookmanAlreadyInstalled()) {
    console.log('Hookman is not yet configured for this project.');
    return;
  }

  const hook = new Resource(await Creator.promptForHookName(), Resources.hooksDir.path);
  await Creator.createHook(hook);
  await Creator.makeHookExecutable(hook);
}