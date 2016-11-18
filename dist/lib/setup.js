"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const FS = require('mz/fs');
const Path = require('path');
const resources_1 = require('./resources');
const templates_1 = require('./templates');
const utils_1 = require('./utils');
const abortMessage = 'Hookman init aborted';
function createHookmanFile() {
    return __awaiter(this, void 0, void 0, function* () {
        yield utils_1.replaceOrAbort(resources_1.default.hookmanFile, abortMessage);
        try {
            yield FS.writeFile(resources_1.default.hookmanFile.path, templates_1.default.hookmanFile.contents);
            utils_1.operationSuccess('hookman file created');
        }
        catch (e) {
            utils_1.operationFailure('hookman file could not be created', e);
        }
    });
}
exports.createHookmanFile = createHookmanFile;
function createHooksDir() {
    return __awaiter(this, void 0, void 0, function* () {
        yield utils_1.replaceOrAbort(resources_1.default.hooksDir, abortMessage);
        try {
            yield FS.mkdir(resources_1.default.hooksDir.path);
            utils_1.operationSuccess('hooks directory created');
        }
        catch (e) {
            utils_1.operationFailure('hooks directory could not be created', e);
        }
    });
}
exports.createHooksDir = createHooksDir;
function createHooksBackupsDir() {
    return __awaiter(this, void 0, void 0, function* () {
        yield utils_1.replaceOrAbort(resources_1.default.hooksBackupsDir, abortMessage);
        try {
            yield FS.mkdir(resources_1.default.hooksBackupsDir.path);
            utils_1.operationSuccess('hooks backup directory created');
        }
        catch (e) {
            utils_1.operationFailure('hooks backup directory could not be created', e);
        }
    });
}
exports.createHooksBackupsDir = createHooksBackupsDir;
function createGitHooksDir() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield FS.mkdir(resources_1.default.gitHooksDir.path);
            utils_1.operationSuccess('git hooks directory created');
        }
        catch (e) {
            utils_1.operationFailure(`git hooks directory could not be created, please create a "hooks" directory in ${resources_1.default.gitDir.path}`, e);
        }
    });
}
exports.createGitHooksDir = createGitHooksDir;
function backupExistingGitHooks() {
    return __awaiter(this, void 0, void 0, function* () {
        const subFolder = Path.join(resources_1.default.hooksBackupsDir.path, utils_1.getTimestamp());
        if (resources_1.default.gitHooksDir.files.length === 0) {
            return utils_1.operationSuccess('no existing git hooks to back up');
        }
        try {
            yield FS.mkdir(subFolder);
            for (let fileName of resources_1.default.gitHooksDir.files) {
                const currentPath = Path.join(resources_1.default.gitHooksDir.path, fileName);
                const newPath = Path.join(subFolder, fileName);
                yield FS.rename(currentPath, newPath);
            }
            utils_1.operationSuccess('hooks backed up');
        }
        catch (e) {
            utils_1.operationFailure('hooks could not be backed up', e);
        }
    });
}
exports.backupExistingGitHooks = backupExistingGitHooks;
function createHookEntries() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            for (let fileName of utils_1.hookList) {
                yield FS.writeFile(Path.join(resources_1.default.gitHooksDir.path, fileName), templates_1.default.hook.contents);
            }
            utils_1.operationSuccess('hook entries created');
        }
        catch (e) {
            utils_1.operationFailure('hooks entries could not be created', e);
        }
    });
}
exports.createHookEntries = createHookEntries;
function makeHookEntriesExecutable() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            for (let fileName of resources_1.default.gitHooksDir.files) {
                yield FS.chmod(Path.join(resources_1.default.gitHooksDir.path, fileName), 0o777);
            }
            utils_1.operationSuccess('hook entries now executable');
        }
        catch (e) {
            utils_1.operationFailure('hooks entries could not be made executable', e);
        }
    });
}
exports.makeHookEntriesExecutable = makeHookEntriesExecutable;
