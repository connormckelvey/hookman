"use strict";
const Path = require('path');
const resources_1 = require('./resources');
const templatesDir = Path.join(__dirname, '_templates');
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    hook: new resources_1.Resource('hook', templatesDir),
    hookmanFile: new resources_1.Resource('hookman.json', templatesDir),
    userHook: new resources_1.Resource('userHook', templatesDir),
};
