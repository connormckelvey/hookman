import * as FS from 'mz/fs';
import * as Path from 'path';

import * as Inquirer from 'inquirer';

import Resources, { Resource } from './resources';
import Templates from './templates';

import { getTimestamp, operationSuccess as success, operationFailure as failure, hookList } from './utils';

interface PromptResponse extends Inquirer.Answers {
  shouldReplace?: boolean;
}

class Initializer {
  cwd: string;

  constructor() {
    this.cwd = process.cwd();
  }

  private async replaceOrAbort(resource: Resource) {
   const prompt = {
      type: 'confirm',
      name: 'shouldReplace',
      message: `${resource.name} already exists. Would you like to replace it?`,
      default: false,
    };

    if(resource.exists) {
      const response = (await Inquirer.prompt([prompt])) as PromptResponse;
      if (!response.shouldReplace) {
        console.log('Hookman init aborted.');
        return process.exit(0);
      }
    }

    return;
  }

  async createHookmanFile() {
    await this.replaceOrAbort(Resources.hookmanFile)
    try {
      await FS.writeFile(Resources.hookmanFile.path, Templates.hookmanFile.contents)
      success('hookman file created');
    } catch (e) {
      failure('hookman file could not be created', e);
    }
  }

  async createHooksDir() {
    await this.replaceOrAbort(Resources.hooksDir);
    try {
      await FS.mkdir(Resources.hooksDir.path);
      success('hooks directory created');
    } catch (e) {
      failure('hooks directory could not be created', e);
    }
  }

  async createHooksBackupsDir() {  
    await this.replaceOrAbort(Resources.hooksBackupsDir);
    try {
      await FS.mkdir(Resources.hooksBackupsDir.path);
      success('hooks backup directory created');
    } catch (e) {
      failure('hooks backup directory could not be created', e);
    }
  }

  async backupExistingGitHooks() {
    const subFolder = Path.join(Resources.hooksBackupsDir.path, getTimestamp());

    try {
      await FS.mkdir(subFolder);
      for(let fileName of Resources.gitHooksDir.files) {
        const currentPath = Path.join(Resources.gitHooksDir.path, fileName);
        const newPath = Path.join(subFolder, fileName);
        await FS.rename(currentPath, newPath);
      }
      success('hooks backed up');
    } catch (e) {
      failure('hooks could not be backed up', e);
    }
  }

  async createHookEntries() {
    try {
      for(let fileName of hookList) {
        await FS.writeFile(Path.join(Resources.gitHooksDir.path, fileName), Templates.hook.contents);
      }
      success('hook entries created');
    } catch (e) {
      failure('hooks entries could not be created', e);
    }
  }

  async makeHookEntriesExecutable() {
    try {
      for(let fileName of Resources.gitHooksDir.files) {
        await FS.chmod(Path.join(Resources.gitHooksDir.path, fileName), 0o777);
      }
      success('hook entries now executable');
    } catch (e) {
      failure('hooks entries could not be make executable', e);
    }
  }
}

export default new Initializer();