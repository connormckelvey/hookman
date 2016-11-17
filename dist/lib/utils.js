"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const Inquirer = require('inquirer');
function pad2(n) {
    return (n < 10 ? '0' : '') + n;
}
function getTimestamp() {
    const now = new Date();
    return now.getFullYear() +
        pad2(now.getMonth() + 1) +
        pad2(now.getDate()) +
        pad2(now.getHours()) +
        pad2(now.getMinutes()) +
        pad2(now.getSeconds());
}
exports.getTimestamp = getTimestamp;
function operationSuccess(message) {
    console.log(message);
}
exports.operationSuccess = operationSuccess;
function operationFailure(message, error) {
    console.log(message, error);
    process.exit(0);
}
exports.operationFailure = operationFailure;
function replaceOrAbort(resource, abortMessage) {
    return __awaiter(this, void 0, void 0, function* () {
        const prompt = {
            type: 'confirm',
            name: 'shouldReplace',
            message: `${resource.name} already exists. Would you like to replace it?`,
            default: false,
        };
        if (resource.exists) {
            const response = (yield Inquirer.prompt([prompt]));
            if (!response.shouldReplace) {
                console.log(abortMessage);
                return process.exit(0);
            }
        }
        return;
    });
}
exports.replaceOrAbort = replaceOrAbort;
exports.hookList = [
    'applypatch-msg',
    'pre-applypatch',
    'post-applypatch',
    'pre-commit',
    'prepare-commit-msg',
    'commit-msg',
    'post-commit',
    'pre-rebase',
    'post-checkout',
    'post-merge',
    'pre-receive',
    'update',
    'post-update',
    'pre-auto-gc',
    'post-rewrite'
];
exports.asyncWrapper = (command) => (argv) => {
    return new Promise((resolve, reject) => {
        command(argv).then(resolve);
    });
};
//# sourceMappingURL=utils.js.map