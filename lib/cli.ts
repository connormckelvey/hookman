import * as Yargs from 'yargs';

import { asyncWrapper } from './utils';
import * as Commands from './commands';

const App = Yargs
  .usage('$0 <cmd> [args]')
  .command('init', 'Set up hookman', {}, asyncWrapper(Commands.init))
  .command('create', 'Create new hook executable', {}, asyncWrapper(Commands.create))
  .command('install', 'Install scripts to .git', {}, (argv: Yargs.Argv) => {
    console.log('hello', argv.name, 'welcome to yargs!')
  })
  .help()
  .argv;

export default App;