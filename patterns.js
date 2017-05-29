// bad patterns to reject (simple)
const badPatterns = [
	/_stl_/,
	/_slu_/,
	/_stlawrence_/,
];

// bad patterns to reject (complex)
const ifThenRules = [
	{
		ifPattern: /_w?hockey_/,
		thenPattern: /_p\d+(_x\d+)?\.(mp4|mxf)/,
		message: "Hockey must end in _pN or _pN_xN " +
		"and be mp4 or mxf files."
	}
];