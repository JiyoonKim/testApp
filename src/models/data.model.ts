export interface UserModel {
	name: string;
	id: any;
}

export interface SpaceModel {
	name: string;
	id: any;
}

export interface ScheduleModel {
	id?: any;
	creater?: any;
	title: string;
	space: any;
	starttime: string;
	endtime: string;
	location: string;
	created?: any;
	index?: number;
	status?: string;
}

export interface TodoModel {
	id: any;
	title: string;
	status: string;
	duedate: string;
	creator: any;
	assigned: any;
}

export interface CardModel {
	id: any;
	title: string;
	creator: any;
	content: string;
	attached: any[];
}

// app configurations
export interface AppConfigModel {
	useLock: boolean;		// app lock
	useFinger: boolean;		// useLock == true && useFinger == true
	passCode: string;		// useLock == true && useFinder != true

}