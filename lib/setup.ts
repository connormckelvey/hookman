import * as FS from 'mz/fs';
import * as Path from 'path';

import Resources from './resources';
import Templates from './templates';

import { 
  replaceOrAbort, 
  getTimestamp, 
  operationSuccess as success, 
  operationFailure as failure, 
  hookList } from './utils';

const abortMessage = 'Hookman init aborted';

export async function createHookmanFile() {
  await replaceOrAbort(Resources.hookmanFile, abortMessage);
  const contents = hookList.reduce((acc: any, cur: string) => {    
    acc[cur] = '';
    return acc;
  }, {});

  try {
    await FS.writeFile(Resources.hookmanFile.path, JSON.stringify(contents, null, 2));
    success('hookman file created');
  } catch (e) {
    failure('hookman file could not be created', e);
  }
}

export async function createHooksDir() {
  await replaceOrAbort(Resources.hooksDir, abortMessage);
  try {
    await FS.mkdir(Resources.hooksDir.path);
    success('hooks directory created');
  } catch (e) {
    failure('hooks directory could not be created', e);
  }
}

export async function createHooksBackupsDir() {  
  await replaceOrAbort(Resources.hooksBackupsDir, abortMessage);
  try {
    await FS.mkdir(Resources.hooksBackupsDir.path);
    success('hooks backup directory created');
  } catch (e) {
    failure('hooks backup directory could not be created', e);
  }
}

export async function createGitHooksDir() {
  try {
    await FS.mkdir(Resources.gitHooksDir.path);
    success('git hooks directory created');
  } catch (e) {
    failure(`git hooks directory could not be created, please create a "hooks" directory in ${Resources.gitDir.path}`, e);
  }
}

export async function backupExistingGitHooks() {
  const subFolder = Path.join(Resources.hooksBackupsDir.path, getTimestamp());

  if (Resources.gitHooksDir.files.length === 0) {
    return success('no existing git hooks to back up');
  }
  
  try {
    await FS.mkdir(subFolder);
    for (let fileName of Resources.gitHooksDir.files) {
      const currentPath = Path.join(Resources.gitHooksDir.path, fileName);
      const newPath = Path.join(subFolder, fileName);
      await FS.rename(currentPath, newPath);
    }
    success('hooks backed up');
  } catch (e) {
    failure('hooks could not be backed up', e);
  }
}

export async function createHookEntries() {
  try {
    for (let fileName of hookList) {
      await FS.writeFile(Path.join(Resources.gitHooksDir.path, fileName), Templates.hook.contents);
    }
    success('hook entries created');
  } catch (e) {
    failure('hooks entries could not be created', e);
  }
}

export async function makeHookEntriesExecutable() {
  try {
    for (let fileName of Resources.gitHooksDir.files) {
      await FS.chmod(Path.join(Resources.gitHooksDir.path, fileName), 0o777);
    }
    success('hook entries now executable');
  } catch (e) {
    failure('hooks entries could not be made executable', e);
  }
}