const findit = require('findit');
const path = require('path');
const archivelint = require('archivelint');

function checkFile(filename) {
	var checkers = Object.keys(archivelint);
	var basename = path.basename(filename);

	for (var i = 0; i < checkers.length; i++) {
		var func = archivelint[checkers[i]];
		var results = func(filename);
		for (var j = 0; j < results.length; j++) {
			console.log("%s: %s", filename, results[j]);	
		}
	}
}

findit(process.argv[2] || '.').on('file', checkFile);
