import * as Yargs from 'yargs';
import * as Inquirer from 'inquirer';

import { Resource } from './resources';

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
    type: 'confirm',
    name: 'shouldReplace',
    message: `${resource.name} already exists. Would you like to replace it?`,
    default: false,
  };

  if(resource.exists) {
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
  'post-rewrite' 
];

export const asyncWrapper = (command: Function) => (argv: Yargs.Argv) => { 
  return new Promise((resolve, reject) => {
    command(argv).then(resolve);
  });
};