export interface ProfileModel {
	_id?: any;				// unique ID
	uid: string;
	projects?: any[];
	envs?: any[];
	tels?: any[];
	emails?: any[];
	last: string;
	first: string;
}
