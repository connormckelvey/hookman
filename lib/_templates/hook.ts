import * as Path from'path';
import * as FS from'fs';
import { exec, execFile } from 'child_process';
const hookName = Path.basename(__filename);
const userHooks = Path.join(__dirname, '../../hooks');
const hookFile = require('../../hookman.json');
const hookExecutable = Path.join(userHooks, hookName);
const hookExecutableExists = FS.existsSync(hookExecutable); 
const hookScript = hookFile[hookName]; 

export function handler(error: any, stdout: string, stderr: string) {

  if (stdout) {
    console.log(stdout);
  }

  if (stderr) {
    console.log(stderr);
  }
  if (error || stderr) {
    console.log(`Hookman: ${hookName} check failed.`);
    process.exit(1); 
  }

  process.exit(0);    
}

if (hookScript) {
  exec(hookScript, handler);
}

if (hookExecutableExists) {
  execFile(hookExecutable, [], handler);
}
