"use strict";
const Yargs = require('yargs');
const utils_1 = require('./utils');
const meta = utils_1.getPackageJSON();
const App = Yargs
    .usage('$0 <cmd> [args]')
    .commandDir('commands')
    .help()
    .version(meta.version)
    .argv;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = App;
//# sourceMappingURL=cli.js.map