// Test cases for archivelint.

var assert = require('assert');
var archivelint = require('../archivelint');

describe('checkFormat', function() { 
	it('should return nothing for a valid filename', function() {
		var result = archivelint.checkFormat('20170529_test.mp4');
		assert.deepEqual(result, []);
	});

	it('should return incorrect format if the format is not ########_name_etc', function () {
		var result = archivelint.checkFormat('2017_test.mp4');
		assert.deepEqual(result, ['incorrect format']);
	});

	it('should return incorrect format if there are capital letters', function() {
		var result = archivelint.checkFormat('20170529_Test.mp4');
		assert.deepEqual(result, ['incorrect format']);
	});

	it('should return incorrect format if there are strange symbols', function() {
		var result = archivelint.checkFormat('20170529_hockey_is_cool!.mp4');
		assert.deepEqual(result, ['incorrect format']);
	});

	it('should return invalid date if the date does not exist', function() {
		var result = archivelint.checkFormat('20170533_blah.mp4');
		assert.deepEqual(result, ['invalid date']);
	});
});

describe('checkBadPatterns', function() {
	it('should allow filenames that contain no bad patterns', function() {
		var result = archivelint.checkBadPatterns('20170529_idiocy.mp4');
		assert.deepEqual(result, []);
	});

	it('should not allow filenames that contain a simple bad pattern', function() {
		var result = archivelint.checkBadPatterns('20170529_hockey_stl_p1.mp4');
		assert.deepEqual(result, ["'_stl_' is a bad pattern, '_st_lawrence_' is preferred"]);
	});

	it('should flag all bad patterns in a filename', function() {
		var result = archivelint.checkBadPatterns('20170529_hockey_acha_slu_stl_p1.mp4');
		assert.deepEqual(result, [
			"'_hockey_acha_' is a bad pattern, '_achahockey_' is preferred",
			"'_stl_' is a bad pattern, '_st_lawrence_' is preferred",
			"'_slu_' is a bad pattern, '_st_lawrence_' is preferred"
		]);
	});

	it('should allow sports that do not need a split', function () {
		var result = archivelint.checkIfThen('20170529_wdiving.mp4');
		assert.deepEqual(result, []);
	});

	it('should allow filenames that split correctly', function () {
		var result = archivelint.checkIfThen('20170529_whockey_uconn_p1.avi');
		assert.deepEqual(result, []);
	});

	it('should allow filenames that do intermissions correctly', function () {
		var result = archivelint.checkIfThen('20170529_whockey_union_p2_x1.avi');
		assert.deepEqual(result, []);
	});

	it('should not allow filenames that use the wrong pregame indicator', function () {
		var result = archivelint.checkIfThen('20170529_football_pre.avi');
		assert.deepEqual(result, ['sports must end in _p# or _p#_x# if any split is needed']);
	})

	it('should not allow filenames that use the wrong split character', function () {
		var result = archivelint.checkIfThen('20170529_football_q1.avi');
		assert.deepEqual(result, ['sports must end in _p# or _p#_x# if any split is needed']);
	});

	it('should not allow filenames that use the wrong intermission indicator', function () {
		var result = archivelint.checkIfThen('20170529_whockey_rit_p1_1.avi');
		assert.deepEqual(result, ['sports must end in _p# or _p#_x# if any split is needed']);
	});
});
