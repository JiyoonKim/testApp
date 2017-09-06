// interface ICard
export interface CardModel {
	// ==========
	// backend model replication
	// _id: card ObjectID. 카드 unique key
	// title: 카드 제목
	// contents: 카드 내용. schedule의 경우 link://schedule/{schedule-ObjectID}로 생성하기로 약속
	// updater: (과거 writer) history 상에서 생성(i), 수정(u), 삭제(r)한 수정자 계정 ObjectID
	// _starred: favorite 리스트. 여러 개 허용 대비
	// _type: cardtype. cardtype ObjectID
	// _date: {created, updated(과거 edited)} 데이터셋. history 상에서 생성,수정,삭제되면 updated 변함
	// _is_updated: (과거 _is_edited)
	// space: space ObjectID. 카드가 속한 스페이스
	// 
	_id?: any;
	title: string;	// required, default
	contents: string;	// required, default
	linkto?: any,
	writer: any;	// required
	_starred?: string[];	// default
	_type: string;	// required, default
	_date?: string[];	// default
	_is_edited?: boolean;	// default
	space: any;	// required
	comment?: any;
	//
	// ==========
}
