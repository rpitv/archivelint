const moment = require('moment');
const findit = require('findit');
const path = require('path');

const badPatterns = [
	/_stl_/,
	/_slu_/,
	/_stlawrence_/,
];

const ifThenRules = [
	{ 
		ifPattern: /_w?hockey_/, 
		thenPattern: /_p\d+(_x\d+)\.(mp4|mxf)/,
		message: "Hockey must end in _pN or _pN_xN " +
		         "and be mp4 or mxf files."
	}
];

// Each checkX function (checkFormat, checkBadPatterns, checkIfThen)
// returns an array of problems it's found.
function checkFormat(filename) {
	// filenames must be e.g. 20170208_hockey_union
	var pattern = /^(\d{8})_[a-z0-9_]+\./;
	var m = filename.match(pattern);

	if (!m) {
		return ["incorrect format"];
	}

	var datestr = m[1];
	if (!moment(datestr, 'YYYYMMDD').isValid()) {
		return ["invalid date"];
	}

	return [];
}

function checkBadPatterns(filename) {
	var ret = [];
	for (var i = 0; i < badPatterns.length; i++) {
		var badPattern = badPatterns[i];
		if (filename.match(badPattern)) {
			ret.push("matched known bad pattern " + badPattern);
		}
	}

	return ret;
}

function checkIfThen(filename) {
	var ret = [];
	for (var i = 0; i < ifThenRules.length; i++) {
		var rule = ifThenRules[i];
		if (
			filename.match(rule.ifPattern)
			&& !filename.match(rule.thenPattern)
		) {
			ret.push(rule.message);
		}
	}
	return ret;
}

function checkFile(filename) {
	var checkers = [checkFormat, checkBadPatterns];
	var basename = path.basename(filename);

	for (var i = 0; i < checkers.length; i++) {
		var fn = checkers[i];
		var results = fn(filename);
		for (var j = 0; j < newResults.length; j++) {
			console.log(results[j]);	
		}
	}
}

findit(process.argv[2] || '.').on('file', checkFile);
