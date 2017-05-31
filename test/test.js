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
			"'_stl_' is a bad pattern, '_st_lawrence_' is preferred",
			"'_slu_' is a bad pattern, '_st_lawrence_' is preferred",
			"'_hockey_acha_' is a bad pattern, '_achahockey_' is preferred"
		]);
	});

	it('should not allow filenames that lack a required pattern', function () {
		var result = archivelint.checkIfThen('20170529_hockey_st_lawrence.mp4');
		assert.deepEqual(result, ['Hockey must end in _pN or _pN_xN and be mp4 or mxf files.']);
	});

	it('should not allow filenames that lack a required file extension', function () {
		var result = archivelint.checkIfThen('20170529_whockey_st_lawrence.avi');
		assert.deepEqual(result, ['Hockey must end in _pN or _pN_xN and be mp4 or mxf files.']);
	});
});
