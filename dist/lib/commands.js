"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const initializer_1 = require('./initializer');
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
        console.log('Error: Current directory is not a Git repository.');
        return;
    }
    if (hookmanAlreadyInstalled()) {
        console.log('Error: Hookman already installed.');
        return;
    }
    yield initializer_1.default.createHookmanFile();
    yield initializer_1.default.createHooksDir();
    yield initializer_1.default.createHooksBackupsDir();
    yield initializer_1.default.backupExistingGitHooks();
    yield initializer_1.default.createHookEntries();
    yield initializer_1.default.makeHookEntriesExecutable();
    return;
});
//# sourceMappingURL=commands.js.map