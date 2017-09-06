// interface ISpace
export interface SpaceModel {
	// ==========
	// backend model replication
	// _id: space ObjectID. 스페이스 unique key
	// title: 스페이스 제목
	// owner: 스페이스 소유자 계정 ObjectID
	// admin: 스페이스 관리자 계정 ObjectID
	// members: (과거 member) 스페이스에 초대된 서비스 사용자 Person ObjectID 리스트. 여러 개 허용 대비
	// guests: (과거 guest 객체) 스페이스에 초대된 서비스 사용자 계정(Account) ObjectID 리스트. 여러 개 허용 대비
	// color: 스페이스 색상
	// created: 스페이스 생성일시
	// 
	_id?: any;
	title: string;	// required
	owner: any;	// required
	admin?: any;
	// [To Be Determined] member (X), members (O)
	members?: any[];
	guests?: any[];
	color?: string;	// default
	created?: string;	// default
	//
	// ==========

	noti?: boolean; // 사용자 view (notification)
}
