// interface IAccount
export interface AccountModel {
	// ==========
	// backend model replication
	// _id: account ObjectID. 계정 unique key
	// uid: 계정 아이디
	// first: given name. 이름
	// last: family name. 성
	// emails: 이메일 리스트. 여러 개 허용 대비
	// tels: 전화번호 리스트. 여러 개 허용 대비
	// envs: 환경설정 리스트. 여러 개 허용 대비
	// created: 계정 생성일시
	// projects: 프로젝트 리스트. 여러 개 허용 대비
	//
	// user section
	_id?: any;
	id?: any;
	uid: string;	// required
	first?: string;	// default
	last?: string;	// default
	fullname?: string;
	emails?: any[];
	tels?: any[];
	envs?: any[];

	created?: string;	// default
	updated?: string;
	projects?: any[];	// default
	avatar?: any;
	cover?: any;
	device?: any;
	work?: any[];
	agent?: any[];
	projectAgents?: any[];
	
	storage?: any;
	oauth?: any;
	active?: boolean;

	birth?: any;
	gender?: any;
	home?: string;
	// vehiclePlate?: string;

	_role?: any;
	_hashed_password?: any;
	_provider?: any;

	// career?: any[]; // 다른 db로 뺌
	// spaces?: any[];		// default 
	// selected?: boolean;
	// // system section
	// _hashed_password: string;	// default
	// _provider: string;	// default
	// _facebook?: any;
	// _google?: any;
	// _linkedin?: any;
	//
	// ==========
}
