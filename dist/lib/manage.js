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
const Inquirer = require('inquirer');
const templates_1 = require('./templates');
const utils_1 = require('./utils');
const abortMessage = 'Hook creation aborted';
function promptForHookName() {
    return __awaiter(this, void 0, void 0, function* () {
        const prompt = {
            choices: utils_1.hookList,
            message: 'Which type of hook would you like to create?',
            name: 'chosenHook',
            type: 'list',
        };
        const response = (yield Inquirer.prompt([prompt]));
        return response.chosenHook;
    });
}
exports.promptForHookName = promptForHookName;
function createHook(hook) {
    return __awaiter(this, void 0, void 0, function* () {
        yield utils_1.replaceOrAbort(hook, abortMessage);
        try {
            yield FS.writeFile(hook.path, templates_1.default.userHook.contents);
            utils_1.operationSuccess(`${hook.name} hook created`);
        }
        catch (e) {
            utils_1.operationFailure(`${hook.name} hook could not be created`, e);
        }
    });
}
exports.createHook = createHook;
function makeHookExecutable(hook) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield FS.chmod(hook.path, 0o777);
            utils_1.operationSuccess(`${hook.name} hook is now executable`);
        }
        catch (e) {
            utils_1.operationFailure(`${hook.name} hook could not be made executable`, e);
        }
    });
}
exports.makeHookExecutable = makeHookExecutable;
//# sourceMappingURL=manage.js.map