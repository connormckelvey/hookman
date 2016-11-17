"use strict";
const Yargs = require('yargs');
const utils_1 = require('./utils');
const Commands = require('./commands');
const App = Yargs
    .usage('$0 <cmd> [args]')
    .command('init', 'Set up hookman', {}, utils_1.asyncWrapper(Commands.init))
    .command('create', 'Create new hook executable', {}, utils_1.asyncWrapper(Commands.create))
    .command('install', 'Install scripts to .git', {}, (argv) => {
    console.log('hello', argv.name, 'welcome to yargs!');
})
    .help()
    .argv;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = App;
//# sourceMappingURL=cli.js.map