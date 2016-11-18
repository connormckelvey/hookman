"use strict";
const Path = require('path');
const FS = require('mz/fs');
class Resource {
    constructor(name, workingDirectory = process.cwd()) {
        this.name = name;
        this.workingDirectory = workingDirectory;
        this.path = this.joinCWD(name);
    }
    joinCWD(...fragments) {
        return Path.join.apply(this, [this.workingDirectory].concat(fragments));
    }
    toString() {
        return this.path;
    }
    get exists() {
        return FS.existsSync(this.path);
    }
    get isDir() {
        return this.exists && FS.lstatSync(this.path).isDirectory();
    }
    get isFile() {
        return this.exists && FS.lstatSync(this.path).isFile();
    }
    get contents() {
        if (!this.exists) {
            return null;
        }
        if (this.isFile) {
            return FS.readFileSync(this.path);
        }
    }
    get files() {
        if (!this.exists) {
            return null;
        }
        if (this.isDir) {
            return FS.readdirSync(this.path);
        }
    }
}
exports.Resource = Resource;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    gitDir: new Resource('.git'),
    gitHooksDir: new Resource('.git/hooks'),
    hookmanFile: new Resource('hookman.json'),
    hooksBackupsDir: new Resource('hooks/.backups'),
    hooksDir: new Resource('hooks'),
};
