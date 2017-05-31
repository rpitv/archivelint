// bad patterns to reject (simple)
const badPatterns = [
	[/_stl_/, '_st_lawrence_'],
	[/_slu_/, '_st_lawrence_'],
	[/_stlawrence_/, '_st_lawrence_'],
	[/_acha_hockey_/, '_achahockey_'],
	[/_hockey_acha_/, '_achahockey_'],
	[/_clubhockey_/, '_achahockey_'],
	[/_club_hockey_/, '_achahockey_'],
	[/_hockey_club_/, '_achahockey_'],
	[/_pre\./, '_p0'],
	[/_partialcredit/, '_partial_credit'],
	[/_rustypipes/, '_rusty_pipes'],
	[/_acapella/, '_acappella'],
	[/_a_capella/, '_acappella'],
	[/_a_cappella/, '_acappella']
];

// bad patterns to reject (complex)
const ifThenRules = [
	{
		ifPattern: /_w?hockey_/,
		thenPattern: /_p\d+(_x\d+)?\.(mp4|mxf)/,
		message: "Hockey must end in _pN or _pN_xN and be mp4 or mxf files."
	}
];

module.exports = {
	badPatterns: badPatterns,
	ifThenRules: ifThenRules,
};