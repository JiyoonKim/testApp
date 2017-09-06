// interface ITodo
export interface TodoModel {
	// ==========
	// backend model replication
	// _id: todo ObjectID. 할일 unique key
	// title: 할일 제목
	// creater: 할일 생성자 계정 ObjectID
	// assign: 할일로 할당된 계정 ObjectID
	// space: space ObjectID. 할일이 속한 스페이스
	// status: ???
	// duedate: 할일 기한일시
	// created: 할일 생성일시
	// 
	_id?: 		any;
	title: 		string;	// required
	creater: 	any;	// required
	assign?: 	any;
	memo?: 	string;
	attachment?: 	any;
	space: 		any;	// required
	status?: 	string;	// default
	duedate?: 	string;
	created?: 	string;	// default
	updated?: 	string;	// default
	appendto?: 	any;
	//
	// ==========
}
