// interface ICardtype
export interface CardtypeModel {
	// ==========
	// backend model replication
	// _id: cartype ObjectID. 카드타입 unique key
	// name: 카드타입 제목
	// attr: ???. 데이터셋
	// parent: ???
	// writer: ??? (속성 이름 변경하기를 기대함)
	// created: 카드타입 생성일시
	// 
	_id?: any;	// required
	title: string;	// required
	// [To Be Determined] 왜 attr 속성 데이터셋이 object key:value map 아닌 string 배열인가
	attr?: string[];
	parent?: any;
	// [To Be Deprecated] writer property에 어떤 의미가 있는지
	// writer: string;
	created?: string;	// default
	//
	// ==========
}
