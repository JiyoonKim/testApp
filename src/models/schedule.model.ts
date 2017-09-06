// interface ISchedule
export interface ScheduleModel {
	// ==========
	// backend model replication
	// _id: schedule ObjectID. 스케줄 unique key
	// title: 스케줄 제목
	// creater: 스케줄 생성자 계정 아이디
	// space: 스케줄을 생성한 스페이스 ObjectID
	// starttime: 스케줄 시작일시
	// endtime: 스케줄 종료일시
	// location: 스케줄 장소
	// created: 스케줄 생성일시
	// column: 스케쥴이 그려질 때 column 값
	// width: 스케쥴이 그려질 때 길이 (% 단위임)
	// startOfMatrix: matrix[288]의 시작 지점
	// endOfMatrix: matrix[288]의 종료 지점
	// recurrence: 반복 일정 정보
	// originalStarttime: 반복 일정일 때 반복의 시작 시점
	// originalEndtime: 반복 일정일 때 반복의 종료 시점
	// index: 반복 일정일 때 일정의 시작인지 확인하기 위한 flag
	//		  boolean으로 처리해도 되고, 명확한 변수명으로 바꿔야함
	// mySchedule: 내 일정 = true, 전체 일정 = false
	// 
	_id?: any;
	creater?: any;
	title: string;
	space: any;
	starttime: string;
	endtime: string;
	location: string;
	memo?: string;
	created?: any;
	column?: number;
	allday? : boolean;
	startOfMatrix?: number;
	endOfMatrix?: number;
	width?: number;
	status?: string;
	recurrence?: string[];
	attendee?: any[];
	appendto?: any;
	originalStarttime?: string;
	originalEndtime?: string;
	index?: number;
	mySchedule?: boolean;
	// left?: number;
	//
	// ==========
}

