import * as Yargs from 'yargs';
import { getPackageJSON } from './utils';

const meta = getPackageJSON();

const App = Yargs
  .usage('$0 <cmd> [args]')
  .commandDir('commands')
  .help()
  .version(meta.version)
  .argv;

export default App;