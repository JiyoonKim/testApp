// interface IProject
export interface ProjectModel {
	// ==========
	// backend model replication
	// _id: todo ObjectID. 할일 unique key
	// title: 할일 제목
	// owner: 할일 생성자 계정 ObjectID
	// color: 할일로 할당된 계정 ObjectID
	// category: space ObjectID. 할일이 속한 스페이스
	// created: 프로젝트 생성일시
	// boards: 프로젝트에 속한 보드 Board 데이터셋. 여러 개 허용 대비
	// members: 프로젝트에 속한 멤버 사용자 계정 ObjectID 리스트. 여러 개 허용 대비
	// 
	_id: any;
	title: string;	// required
	owner: string;	// required
	color?: string;
	category?: any;
	created?: string;
	boards?: any[];	// default
	members?: any[];
	//
	// ==========

	// before migration by Heeam 2017.5.29.
	// _id: any;
	// title: string;
	// owner: string;
	// created?: string;
	// member: any[];
}
