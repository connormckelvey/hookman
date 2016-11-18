"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const Setup = require('../setup');
const resources_1 = require('../resources');
const utils_1 = require('../utils');
const install = (argv) => __awaiter(this, void 0, void 0, function* () {
    if (!resources_1.default.gitDir.exists) {
        console.log('Current directory is not a Git repository.');
        return;
    }
    if (!resources_1.default.gitHooksDir.exists) {
        yield Setup.createGitHooksDir();
    }
    if (!utils_1.hookmanAlreadyInstalled()) {
        console.log('Hookman is not yet configured for this project.');
        return;
    }
    yield Setup.backupExistingGitHooks();
    yield Setup.createHookEntries();
    yield Setup.makeHookEntriesExecutable();
    console.log(`\r\nSetup complete. Your project's hooks are now configured for use with Git.`);
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = install;
exports.command = 'install';
exports.desc = 'Configure existing hook files with git';
exports.builder = {};
exports.handler = utils_1.asyncWrapper(install);
