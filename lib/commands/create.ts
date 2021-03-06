import * as Yargs from 'yargs';
import * as Manage from '../manage';
import Resources, { Resource } from '../resources';
import { hookmanAlreadyInstalled, asyncWrapper, operationFailure as failure } from '../utils';

const create = async (argv: Yargs.Argv) => {
  if (!Resources.gitDir.exists) {
    failure('Current directory is not a Git repository.');
    return;
  }    

  if (!hookmanAlreadyInstalled()) {
    failure('Hookman is not yet configured for this project.');
    return;
  }

  const hook = new Resource(await Manage.promptForHookName(), Resources.hooksDir.path);
  await Manage.createHook(hook);
  await Manage.makeHookExecutable(hook);
};

export default create;
export const command = 'create';
export const desc = 'Create new hook executable';
export const builder = {};
export const handler = asyncWrapper(create);