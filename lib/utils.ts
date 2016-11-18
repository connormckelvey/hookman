import * as FS from 'fs';
import * as Path from 'path';

import * as Yargs from 'yargs';
import * as Inquirer from 'inquirer';

import Resources, { Resource } from './resources';

function pad2(n: number) {
  return (n < 10 ? '0' : '') + n;
}

export function getTimestamp() {
  const now = new Date();
  return now.getFullYear() +
    pad2(now.getMonth() + 1) +
    pad2(now.getDate()) +
    pad2(now.getHours()) +
    pad2(now.getMinutes()) +
    pad2(now.getSeconds());
}

export function operationSuccess(message: string) {
  console.log(message);
}

export function operationFailure(message: string, error: any) {
  console.log(message, error);
  process.exit(0);
}

export interface PromptResponse extends Inquirer.Answers {
  shouldReplace?: boolean;
  chosenHook?: string;
}

export async function replaceOrAbort(resource: Resource, abortMessage: string) {
  const prompt = {
    default: false,
    message: `${resource.name} already exists. Would you like to replace it?`,
    name: 'shouldReplace',
    type: 'confirm',
  };

  if (resource.exists) {
    const response = (await Inquirer.prompt([prompt])) as PromptResponse;
    if (!response.shouldReplace) {
      console.log(abortMessage);
      return process.exit(0);
    }
  }

  return;
}

export const hookList = [
  'applypatch-msg', 
  'pre-applypatch', 
  'post-applypatch', 
  'pre-commit', 
  'prepare-commit-msg', 
  'commit-msg', 
  'post-commit', 
  'pre-rebase', 
  'post-checkout', 
  'post-merge', 
  'pre-receive', 
  'update', 
  'post-update', 
  'pre-auto-gc', 
  'post-rewrite',
];

export const asyncWrapper = (command: Function) => (argv: Yargs.Argv) => {
  return new Promise((resolve, reject) => {
    command(argv).then(resolve);
  });
};

export function getPackageJSON() {
  let currentDir = __dirname;
  let packageJSONPath = () => Path.join(currentDir, 'package.json');
  while (!FS.existsSync(packageJSONPath())) {
    currentDir = Path.join(currentDir, '..');
  }
  return require(packageJSONPath());
}

export const hookmanAlreadyInstalled = () => {
  return Resources.gitDir.exists && 
  Resources.hookmanFile.exists && 
  Resources.hooksDir.exists && 
  Resources.hooksDir.files.length;
};