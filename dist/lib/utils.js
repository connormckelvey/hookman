"use strict";
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