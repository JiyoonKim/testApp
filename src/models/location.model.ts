export interface LocationModel {
	name:		string;	// required
	address?:	any[];
	geometry?:	any;
	viewport?:	any;
	created?:	string;	// required, default (to ISODATE)
	updated?:	string;	// required, default (to ISODATE)
	space:		any;	// required
	creater:	any;	// required
	parent?:	any;
}