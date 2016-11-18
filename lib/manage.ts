import * as FS from 'mz/fs';

import * as Inquirer from 'inquirer';

import { Resource } from './resources';
import Templates from './templates';

import {
  PromptResponse, 
  replaceOrAbort, 
  operationSuccess as success, 
  operationFailure as failure, 
  hookList } from './utils';

const abortMessage = 'Hook creation aborted';

export async function promptForHookName() {
  const prompt = {
    choices: hookList,
    message: 'Which type of hook would you like to create?',
    name: 'chosenHook',
    type: 'list',
  };

  const response = (await Inquirer.prompt([prompt])) as PromptResponse;
  return response.chosenHook;
}

export async function createHook(hook: Resource) {
  await replaceOrAbort(hook, abortMessage);
  try {
    await FS.writeFile(hook.path, Templates.userHook.contents);
    success(`${hook.name} hook created`);
  } catch (e) {
    failure(`${hook.name} hook could not be created`, e);
  }
}

export async function makeHookExecutable(hook: Resource) {
  try {
    await FS.chmod(hook.path, 0o777);
    success(`${hook.name} hook is now executable`);
  } catch (e) {
    failure(`${hook.name} hook could not be made executable`, e);
  }
}