const os = require('os');
const fs = require('fs');
const path = require('path');

function parse(str) {
	const reBashHistory = /^: \d+:0;/;

	return str.trim().split('\n').map(x => {
		if (reBashHistory.test(x)) {
			return x.split(';').slice(1).join(';');
		}

		// ZSH just places one command on each line
		return x;
	});
}

function getPath(opts) {
	opts = opts || {};

	if (process.platform === 'win32') {
		return '';
	}

	if (process.env.HISTFILE) {
		return process.env.HISTFILE;
	}

	const homeDir = os.homedir();

	const paths = new Set([
		path.join(homeDir, '.bash_history'),
		path.join(homeDir, '.zsh_history'),
		path.join(homeDir, '.history')
	]);

	if (opts.extraPaths) {
		for (const path of opts.extraPaths) {
			paths.add(path);
		}
	}

  return Array.from(paths).map(fp => {
		try {
			return {fp, size: fs.statSync(fp).size};
		} catch (err) {
			return;
		}
	})
  .filter((item) => item && item.size && item)
  .reduce((a, b) => {
    return (a.size > b.size ? a : b).fp
  });   
} 

function getHistory(opts) {
  const p = getPath(opts);
	return parse(fs.readFileSync(p, 'utf8'));
};

module.exports = getHistory;