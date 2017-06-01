// Test cases for archivelint.

var assert = require('assert');
var archivelint = require('../archivelint');

describe('checkFormat', function() { 
	it('should return nothing for a valid filename', function() {
		var result = archivelint.checkFormat('20140412_rusty_pipes.mp4'); // real
		assert.deepEqual(result, []);
	});

	it('should return incorrect format if the format is not ########_name_etc', function () {
		var result = archivelint.checkFormat('201111112_dance_multi.mov');
		assert.deepEqual(result, ['incorrect format']);
	});

	it('should return incorrect format if there are capital letters', function() {
		var result = archivelint.checkFormat('20060824_NRB.m4v'); // real
		assert.deepEqual(result, ['incorrect format']);
	});

	it('should return incorrect format if there are strange symbols', function() {
		var result = archivelint.checkFormat('20100123_hockey_harvard_b-roll.mpeg'); // real
		assert.deepEqual(result, ['incorrect format']);
	});

	it('should return invalid date if the date does not exist', function() {
		var result = archivelint.checkFormat('20140229_wdiving_ncaa.avi');
		assert.deepEqual(result, ['invalid date']);
	});
});

describe('checkBadPatterns', function() {
	it('should allow filenames that contain no bad patterns', function() {
		var result = archivelint.checkBadPatterns('20140913_football_alfred_q2.avi'); // real
		assert.deepEqual(result, []);
	});

	it('should not allow filenames that contain a simple bad pattern', function () {
		var result = archivelint.checkBadPatterns('20121006_football_stl_q0.mov'); // real
		assert.deepEqual(result, ['"_stl_" is a bad pattern, "_st_lawrence_" is preferred']);
	});

	it('should not allow filenames that use the wrong split character', function () {
		var result = archivelint.checkBadPatterns('20150228_cssa_2.mp4'); // real
		assert.deepEqual(result, ['"_\\d+\\." is a bad pattern, "_p#" or "_p#_x#" is preferred']);
	});

	it('should flag all bad patterns in a filename', function() {
		var result = archivelint.checkBadPatterns('20170529_hockey_acha_slu_stl_p1.mp4');
		assert.deepEqual(result, [
			'"_hockey_acha_" is a bad pattern, "_achahockey_" is preferred',
			'"_stl_" is a bad pattern, "_st_lawrence_" is preferred',
			'"_slu_" is a bad pattern, "_st_lawrence_" is preferred'
		]);
	});

	it('should allow sports that do not need a split', function () {
		var result = archivelint.checkIfThen('20140229_wdiving_ncaa.avi'); // real
		assert.deepEqual(result, []);
	});

	it('should allow filenames that split correctly', function () {
		var result = archivelint.checkIfThen('20151106_whockey_st_lawrence_p2.mp4'); // real
		assert.deepEqual(result, []);
	});

	it('should allow filenames that do intermissions correctly', function () {
		var result = archivelint.checkIfThen('20170128_whockey_st_lawrence_p1_x1_alumni.mp4'); // real
		assert.deepEqual(result, []);
	});

	it('should not allow filenames that use the wrong pregame indicator', function () {
		var result = archivelint.checkIfThen('20120908_football_alfred_pre.mpg'); // real
		assert.deepEqual(result, ['sports must end in "_p#" or "_p#_x#" if any split is needed']);
	})

	it('should not allow filenames that use the wrong split character', function () {
		var result = archivelint.checkIfThen('20120908_football_alfred_q1.mpg'); // real
		assert.deepEqual(result, ['sports must end in "_p#" or "_p#_x#" if any split is needed']);
	});

	it('should not allow filenames that use the wrong intermission indicator', function () {
		var result = archivelint.checkIfThen('20121020_football_hobart_q2_75.mov'); // real
		assert.deepEqual(result, ['sports must end in "_p#" or "_p#_x#" if any split is needed']);
	});

	it('should allow disambiguated umass', function () {
		var result = archivelint.checkIfThen('20170103_hockey_umass_lowell_p1.mxf'); // real
		assert.deepEqual(result, []);
	});

	it('should not allow ambiguous umass', function () {
		var result = archivelint.checkIfThen('20170103_hockey_umass_p1.mxf');
		assert.deepEqual(result, ['umass must be disambiguated']);
	});
});
