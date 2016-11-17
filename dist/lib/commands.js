"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const Initializer = require('./initializer');
const Creator = require('./creator');
const resources_1 = require('./resources');
const hookmanAlreadyInstalled = () => {
    return resources_1.default.gitDir.exists &&
        resources_1.default.gitHooksDir.exists &&
        resources_1.default.gitHooksDir.files.length &&
        resources_1.default.hookmanFile.exists &&
        resources_1.default.hooksDir.exists &&
        resources_1.default.hooksDir.files.length;
};
exports.init = (argv) => __awaiter(this, void 0, void 0, function* () {
    if (!resources_1.default.gitDir.exists) {
        console.log('Current directory is not a Git repository.');
        return;
    }
    if (hookmanAlreadyInstalled()) {
        console.log('Hookman already installed.');
        return;
    }
    yield Initializer.createHookmanFile();
    yield Initializer.createHooksDir();
    yield Initializer.createHooksBackupsDir();
    yield Initializer.backupExistingGitHooks();
    yield Initializer.createHookEntries();
    yield Initializer.makeHookEntriesExecutable();
    console.log(`\r\nSetup complete. You can now add command line executables to ${resources_1.default.hooksDir.path}`);
    return;
});
exports.create = (argv) => __awaiter(this, void 0, void 0, function* () {
    if (!resources_1.default.gitDir.exists) {
        console.log('Current directory is not a Git repository.');
        return;
    }
    if (!hookmanAlreadyInstalled()) {
        console.log('Hookman is not yet configured for this project.');
        return;
    }
    const hook = new resources_1.Resource(yield Creator.promptForHookName(), resources_1.default.hooksDir.path);
    yield Creator.createHook(hook);
    yield Creator.makeHookExecutable(hook);
});
//# sourceMappingURL=commands.js.map