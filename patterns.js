// bad patterns to reject (simple)
const badPatterns = [
//	[/bad_pattern_regex/, 'preferred_alternative_string'],
	[/_acha_hockey_/, '_achahockey_'],
	[/_hockey_acha_/, '_achahockey_'],
	[/_clubhockey_/, '_achahockey_'],
	[/_hockeyclub_/, '_achahockey_'],
	[/_club_hockey_/, '_achahockey_'],
	[/_hockey_club_/, '_achahockey_'],
	[/_wbb_/, '_wbasketball_'],
	[/_bb_/, '_basketball_'],

	[/_pre\./, '_p0'],
	[/_pregame\./, '_p0'],
	[/_pre_game\./, '_p0'],
	[/_\d+\./, '_p#" or "_p#_x#'],

	[/_stl_/, '_st_lawrence_'],
	[/_slu_/, '_st_lawrence_'],
	[/_stlawrence_/, '_st_lawrence_'],
	[/_quin_/, '_quinnipiac_'],
	[/_bc_/, '_boston_college_'],
	[/_bu_/, '_boston_university_'],
	[/_pei_/, '_upei_'],
	[/_neu_/, '_northeastern_'],
	[/_nu_/, '_northeastern_'],
	[/_minnstate_/, '_minnesota_state_'],
	[/_merch_/, '_usmma_'],
	[/\d_lowell_/, '_umass_lowell_'],
	[/_vermont_/, '_uvm_'],
	[/_rm_/, '_robert_morris_'],
	[/_urochester_/, '_u_of_r_'],
	[/_univ_rochester_/, '_u_of_r_'],
	[/\d_rochester_/, '_u_of_r_" or "_rit_'],
	[/_univ_michigan_/, '_umich_'],
	[/\d_michigan_/, '_umich_" or "_michigan_state_'],
	[/_u_of_m_/, '_umich_'],
	[/_umichigan_/, '_umich_'],
	[/_msu_/, '_minnesota_state_" or "_michigan_state_'],

	[/_acapella/, '_acappella'],
	[/_a_capella/, '_acappella'],
	[/_a_cappella/, '_acappella'],
	[/_partialcredit/, '_partial_credit'],
	[/_rustypipes/, '_rusty_pipes'],
	[/_dulynoted/, '_duly_noted'],
	[/_lyrics/, '_rensselyrics'],
	[/_russel_/, '_russell_'],
	[/_communitysponsoredevent/, '_community_sponsored_event'],
	[/_players\./, '_players_name_of_show'],
	[/_rcos\./, '_rcos_name_of_project'],
	[/_wnl\./, '_wnl_name_of_band'],
	[/_nuestra\./, '_nuestra_belleza'],
	[/_rpa_drag\./, '_rpa_drag_show'],
	[/_drag\./, '_rpa_drag_show'],
	[/\d_drag_show/, '_rpa_drag_show'],
	[/\d_drag\./, '_rpa_drag_show'],
	[/_paksa_jashn\./, '_paksa_jashn_show'],
	[/_paksa_jashn_p/, '_paksa_jashn_show_p'],
	[/_jashn\./, '_paksa_jashn_show'],
	[/_jashn_p/, '_paksa_jashn_show_p'],
	[/\d_jashn_show/, '_paksa_jashn_show'],
	[/_isa_diwali\./, '_isa_diwali_show'],
	[/_isa_diwali_p/, '_isa_diwali_show_p'],
	[/_diwali\./, '_isa_diwali_show'],
	[/_diwali_p/, '_isa_diwali_show_p'],
	[/\d_diwali_show/, '_isa_diwali_show'],
	[/_upe_io_/, '_upeio_'],
	[/_upe_i_o_/, '_upeio_'],
];

// bad patterns to reject (complex)
const ifThenRules = [
	{
		ifPattern: /_((w|acha|field)?hockey|w?(soccer|lacrosse|diving|tennis|rugby)|(soft|base|foot|broom|w?basket)ball|curling|quidditch)_/,
		thenPattern: /_((p\d+(_x\d+(_[a-z]*)*)?\.)|(w?diving|broomball))/,
		message: 'sports must end in "_p#" or "_p#_x#" if split'
	}, {
		ifPattern: /_umass_/,
		thenPattern: /_umass_(amherst|lowell)_/,
		message: 'umass must be disambiguated'
	},
];

module.exports = {
	badPatterns: badPatterns,
	ifThenRules: ifThenRules,
};