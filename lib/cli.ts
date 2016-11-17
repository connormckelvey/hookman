import * as FS from 'mz/fs';
import * as Path from 'path';

import * as Yargs from 'yargs';

import Initializer from './initializer';
import Resources from './resources';
import { asyncWrapper } from './utils';
import * as Commands from './commands';

const App = Yargs
  .usage('$0 <cmd> [args]')
  // .command('poo', 'poos', {}, function () { 
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       console.log('poo');
  //       resolve();
  //     }, 1000);´
  //   });
  //  })
  
  .command('init', 'Set up hookman', {}, asyncWrapper(Commands.init))
  .command('install', 'Install scripts to .git', {}, (argv: Yargs.Argv) => {
    console.log('hello', argv.name, 'welcome to yargs!')
  })
  .help()
  .argv;

export default App;