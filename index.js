const moment = require('moment');
const findit = require('findit');
const path = require('path');

const badPatterns = [
	/_stl_/,
	/_slu_/,
	/_stlawrence_/,
];

function checkFormat(filename) {
	// filenames must be e.g. 20170208_hockey_union
	var pattern = /^(\d{8})_[a-z0-9_]+\./;
	var m = filename.match(pattern);

	if (!m) {
		return "incorrect format";
	}

	var datestr = m[1];
	if (!moment(datestr, 'YYYYMMDD').isValid()) {
		return "invalid date";
	}

	return null;
}

function checkBadPatterns(filename) {
	for (var i = 0; i < badPatterns.length; i++) {
		if (filename.match(badPatterns[i])) {
			return "matched known bad pattern";
		}
	}

	return null;
}

function checkFile(filename) {
	var checkers = [checkFormat, checkBadPatterns];
	var basename = path.basename(filename);
	for (var i = 0; i < checkers.length; i++) {
		var fn = checkers[i];
		var result = fn(basename);
		if (result) {
			console.log("%s: %s", filename, result);
		}
	}
}

findit(process.argv[2] || '.').on('file', checkFile);
