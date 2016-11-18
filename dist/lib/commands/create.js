"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const Manage = require('../manage');
const resources_1 = require('../resources');
const utils_1 = require('../utils');
const create = (argv) => __awaiter(this, void 0, void 0, function* () {
    if (!resources_1.default.gitDir.exists) {
        console.log('Current directory is not a Git repository.');
        return;
    }
    if (!utils_1.hookmanAlreadyInstalled()) {
        console.log('Hookman is not yet configured for this project.');
        return;
    }
    const hook = new resources_1.Resource(yield Manage.promptForHookName(), resources_1.default.hooksDir.path);
    yield Manage.createHook(hook);
    yield Manage.makeHookExecutable(hook);
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = create;
exports.command = 'create';
exports.desc = 'Create new hook executable';
exports.builder = {};
exports.handler = utils_1.asyncWrapper(create);
//# sourceMappingURL=create.js.map