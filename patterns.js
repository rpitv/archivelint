// bad patterns to reject (simple)
const badPatterns = [
//	[/bad_pattern_regex/, 'preferred_alternative_string'],
	[/_acha_hockey_/, '_achahockey_'],
	[/_hockey_acha_/, '_achahockey_'],
	[/_clubhockey_/, '_achahockey_'],
	[/_hockeyclub_/, '_achahockey_'],
	[/_club_hockey_/, '_achahockey_'],
	[/_hockey_club_/, '_achahockey_'],

	[/_pre\./, '_p0'],
	[/_pregame\./, '_p0'],
	[/_pre_game\./, '_p0'],

	[/_stl_/, '_st_lawrence_'],
	[/_slu_/, '_st_lawrence_'],
	[/_stlawrence_/, '_st_lawrence_'],
	[/_quin_/, '_quinnipiac_'],
	[/_bc_/, '_boston_college_'],
	[/_bu_/, '_boston_university_'],
	[/_pei_/, '_upei_'],
	[/_minnstate_/, '_minnesota_state_'],
	[/_merch_/, '_usmma_'],

	[/_acapella/, '_acappella'],
	[/_a_capella/, '_acappella'],
	[/_a_cappella/, '_acappella'],
	[/_partialcredit/, '_partial_credit'],
	[/_rustypipes/, '_rusty_pipes'],
	[/_dulynoted/, '_duly_noted'],
];

// bad patterns to reject (complex)
const ifThenRules = [
	{
		ifPattern: /_((w|acha|field)?hockey|w?(soccer|lacrosse|diving|tennis|rugby)|(soft|base|foot|broom|w?basket)ball|curling|quidditch)_/,
		thenPattern: /_p\d+(_x\d+)?\./,
		message: 'sports must end in _p# or _p#_x# if any split is needed'
	}
];

module.exports = {
	badPatterns: badPatterns,
	ifThenRules: ifThenRules,
};