export interface ImageModel {
	name: 		string;	// required
	original: 	any;	// required
	large?: 	any;
	desktop?: 	any;
	mobile?: 	any;
	icon?: 		any;
	location?: 	any;
	created?: 	string;	// required, default (to ISODATE)
	updated?:	string;	// required, default (to ISODATE)
	space:		any;	// required
	creator:	any;	// required
	with?:		any[];
}