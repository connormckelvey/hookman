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
const init = (argv) => __awaiter(this, void 0, void 0, function* () {
    if (!resources_1.default.gitDir.exists) {
        console.log('Current directory is not a Git repository.');
        return;
    }
    if (!resources_1.default.gitHooksDir.exists) {
        yield Setup.createGitHooksDir();
    }
    if (utils_1.hookmanAlreadyInstalled()) {
        console.log('Hookman already configured. Did you mean hookman install?');
        return;
    }
    yield Setup.createHookmanFile();
    yield Setup.createHooksDir();
    yield Setup.createHooksBackupsDir();
    yield Setup.backupExistingGitHooks();
    yield Setup.createHookEntries();
    yield Setup.makeHookEntriesExecutable();
    console.log(`\r\nSetup complete. You can now add command line executables to ${resources_1.default.hooksDir.path}`);
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = init;
exports.command = 'init';
exports.desc = 'Set up hookman';
exports.builder = {};
exports.handler = utils_1.asyncWrapper(init);
//# sourceMappingURL=init.js.map