// interface IDevice
//
//	동작하는 device 정보를 읽어서 서버로 전송한다.
//	login보다 먼저 동작한다.
//
export interface DeviceModel {
	// ==========
	// backend model replication
	// _id: device ObjectID. 디바이스 unique key
	// uuid: 디바이스 unique 아이디
	// platform: ???
	// model: ???
	// osVersion: ???
	// serial: ???
	// version: ???
	// build: ???
	// cordova: ???
	// date: ???
	// 
	_id?: any;
	// [To Be Determined] How to know uniqueness of device uuid ??
	uuid?: string;	// default
	platform?: string;	// default
	model?: string;	// default
	osVersion?: string;	// default
	serial?: string;	// default
	version?: string;	// default
	build?: string;	// default
	cordova?: string;	// default
	// [To Be Determined] date 속성 이름 충돌할 가능성은 없는지, 좀 더 명확한 이름을 찾을 기회는 없는지
	date?: string;	// default
	//
	// ==========
}

