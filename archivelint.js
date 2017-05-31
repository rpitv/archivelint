const moment = require('moment');
const patterns = require('./patterns');

// Each checkX function (checkFormat, checkBadPatterns, checkIfThen)
// returns an array of problems it's found. index.js will iterate through
// all the functions this module exports, and run each function on each file.
// The filename that is passed in is the base name of the file - with any
// leading directory components removed 
// (e.g. 20170529_test.mp4, not a/b/20170529_test.mp4).
exports.checkFormat = function(filename) {
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

exports.checkBadPatterns = function(filename) {
	var ret = [];

	patterns.badPatterns.forEach(function (badPattern) {
		if (filename.match(badPattern[0])) {
			ret.push("'" + String(badPattern[0]).slice(1, -1) + "' is a bad pattern, '" + badPattern[1] + "' is preferred");
		}
	});

	return ret;
}

exports.checkIfThen = function(filename) {
	var ret = [];
	for (var i = 0; i < patterns.ifThenRules.length; i++) {
		var rule = patterns.ifThenRules[i];
		if (
			filename.match(rule.ifPattern)
			&& !filename.match(rule.thenPattern)
		) {
			ret.push(rule.message);
		}
	}
	return ret;
}

