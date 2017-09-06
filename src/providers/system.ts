import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AlertController, LoadingController, Loading } from 'ionic-angular';

// services
// import { TranslateService } from 'ng2-translate';

// platform
import { Backend } from './backend';

// models
import { AccountModel } from '../models/account.model';
import { SpaceModel } from '../models/space.model';
import { ProjectModel } from '../models/project.model';
import { DeviceModel } from '../models/device.model';
import { ProfileModel } from '../models/profile.model';
import { CardModel } from '../models/card.model';
import { ScheduleModel } from '../models/schedule.model';
import { TodoModel } from '../models/todo.model';

import * as moment from 'moment';
import * as dot from 'dot';

export interface userModel {
	id: any;
	uid: string;
	email: string;
	name: string;
	info?: string;
}
export interface appModel {
	isDevice?: boolean;			// device에서 running하는지 아닌지
	device?: DeviceModel;		// device 정보

	languages?: any[];			// 지원하는 language list
	current_language?: string;	// 현재 설정된 language

	token?: string;				// user login token
	user?: userModel;			// user information

    account?: AccountModel;
}

const supportLang = [
		{ disp: 'English', eng: 'English', code: 'en' },
		{ disp: '한국어', eng: 'Korean', code: 'ko' },
		{ disp: '日本語', eng: 'Japanese', code: 'jp' },
		{ disp: '简體中文', eng: 'Chinese, Simplified', code: 'ch' },
		{ disp: '繁體中文', eng: 'Chinese, Traditional', code: 'cht' }
		];


@Injectable()
export class System {
	private appConfig: appModel;	// app running configuration
	public data: any;
	private testdata: any;
	private loading: Loading;
	private tempParam: any;

	private last_timestamp = null;

	constructor(public http: Http,
				// private translate: TranslateService,
				private storage: Storage,
				// private loadingCtrl: LoadingController,
				// private alertCtrl: AlertController,
				private backend: Backend
		) {
		console.log('Hello System Provider, initialize all data structures');
		this.appConfig = {};
		this.initialize();
	}

	initialize() {
		this.appConfig.isDevice = true;
		this.appConfig.user = {id: null, uid: null, email: null, name: null, info: null}
		this.appConfig.languages = supportLang;

		this.data = {
			spaces: [
				{ _id: null, title: 'VIEWALL', color: 'default', member: [], owner: null }
			],
			projects: [],
			favorites: [],
			profiles: [],
            account: {
                '_id': '',
                'id': '',
                'uid': '',
                'first': '',
                'last': '',
                'fullname': '',
                'emails': [{
                    'email': ''
                }],
                'tels': [{
                    'tel': ''
                }],
                'envs': {},

                'created': '',
                'updated': '',
                'projects': [],
                'avatar': '59a3d7da3753406f2c7b915b',
                'cover': '59a3d8c83753406f2c7b915c',
                'device': '59a3d7a93753406f2c7b915a',
                'work': [
                    {
                        'company': '',
                        'job': '',
                        'language': '',
                        'mainArea': ''
                    }
                ],
                // 'agent': null, // 여기는 pointer로 요청 (ObjectId)
                'agent': [{
                    'uid': '',
                    'first': '',
                    'last': '',
                    'fullname': '',
                    'emails': [{
                        'email': ''
                    }],
                    'tels': [{
                        'tel': ''
                    }],
                    // 'envs': [],
                    'avatar': '',
                    'birth': '',
                    'gender': '',
                    'home': '',
                    'work': [
                        {
                            'company': '',
                            'job': '',
                            'language': '',
                            'mainArea': ''
                        }
                    ],
                    'agent': [],
                    'projectAgents': [],
                    'storage': '',
                    'oauth': '',
                    'active': true,

                    '_role': '',
                    // '_hashed_password': '',
                    '_provider': '',
                }],
                'projectAgents': [
                    {
                        'title': '',
                        // 'agent': null, // 여기는 pointer로 요청 (ObjectId)
                        'agents': [
                            {
                                'uid': '',
                                'first': '',
                                'last': '',
                                'fullname': '',
                                'emails': [{
                                    'email': ''
                                }],
                                'tels': [{
                                    'tel': ''
                                }],
                                // 'envs': [],
                                'avatar': '',
                                'birth': '',
                                'gender': '',
                                'home': '',
                                'work': [
                                    {
                                        'company': '',
                                        'job': '',
                                        'language': '',
                                        'mainArea': ''
                                    }
                                ],
                                'agent': [],
                                'projectAgents': [],
                                'storage': '',
                                'oauth': '',
                                'active': true,

                                '_role': '',
                                // '_hashed_password': '',
                                '_provider': '',
                            },
                            // {
                            //     'uid': '',
                            //     'first': '',
                            //     'last': '',
                            //     'fullname': '한수영',
                            //     'emails': [{
                            //         'email': ''
                            //     }],
                            //     'tels': [{
                            //         'tel': ''
                            //     }],
                            //     // 'envs': [],
                            //     'avatar': 'http://cfile9.uf.tistory.com/image/2128314352A84B4D268B9D',
                            //     'birth': '',
                            //     'gender': '',
                            //     'home': '',
                            //     'work': [
                            //         {
                            //             'company': '',
                            //             'job': '',
                            //             'language': '',
                            //             'mainArea': ''
                            //         }
                            //     ],
                            //     'agent': [],
                            //     'projectAgents': [],
                            //     'storage': '',
                            //     'oauth': '',
                            //     'active': true,

                            //     '_role': '',
                            //     // '_hashed_password': '',
                            //     '_provider': '',
                            // }
                        ],
                        'vehiclePlate': '',
                    },
                    {
                        'title': '',
                        // 'agent': null, // 여기는 pointer로 요청 (ObjectId)
                        'agents': [
                            // {
                            //     'uid': '',
                            //     'first': '',
                            //     'last': '',
                            //     'fullname': '한설아',
                            //     'emails': [{
                            //         'email': ''
                            //     }],
                            //     'tels': [{
                            //         'tel': ''
                            //     }],
                            //     // 'envs': [],
                            //     'avatar': 'http://cfile9.uf.tistory.com/image/2128314352A84B4D268B9D',
                            //     'birth': '',
                            //     'gender': '',
                            //     'home': '',
                            //     'work': [
                            //         {
                            //             'company': '',
                            //             'job': '',
                            //             'language': '',
                            //             'mainArea': ''
                            //         }
                            //     ],
                            //     'agent': [],
                            //     'projectAgents': [],
                            //     'storage': '',
                            //     'oauth': '',
                            //     'active': true,

                            //     '_role': '',
                            //     // '_hashed_password': '',
                            //     '_provider': '',
                            // },
                            {
                                'uid': '',
                                'first': '',
                                'last': '',
                                'fullname': '',
                                'emails': [{
                                    'email': ''
                                }],
                                'tels': [{
                                    'tel': ''
                                }],
                                // 'envs': [],
                                'avatar': '',
                                'birth': '',
                                'gender': '',
                                'home': '',
                                'work': [
                                    {
                                        'company': '',
                                        'job': '',
                                        'language': '',
                                        'mainArea': ''
                                    }
                                ],
                                'agent': [],
                                'projectAgents': [],
                                'storage': '',
                                'oauth': '',
                                'active': true,

                                '_role': '',
                                // '_hashed_password': '',
                                '_provider': '',
                            }
                        ],
                        'vehiclePlate': '',
                    },
                ],

                'storage': '',
                'oauth': '',
                'active': true,

                '_role': '',
                // '_hashed_password': '',
                '_provider': '',

                // server not yet
                'birth': '',
                'gender': '',
                'home': '59a3d8db3753406f2c7b915d',
            }
		};

        // this.initNoti();
	}


    // ---------------------------------
    // user token related
    //
    // Token system control
    setToken(t) {
        this.backend.token = t;                // backend용 token header를 제거한다.
        this.appConfig.token = t;
    }
    // // token storage control
    storeToken(t) { this.setToken(t); this.storage.set('currentUserToken', t); }
    removeToken() { this.setToken(null); this.storage.remove('currentUserToken'); }
    getToken: Observable<any> =
        Observable.fromPromise(this.storage.get('currentUserToken').then(token => {
            //maybe some processing logic like JSON.parse(token)
            // this._loggedIn = (token ? true : false);
            if (token) {
                this.appConfig.token = token;
                this.backend.token = this.appConfig.token;
            }
            return token;
        }));

    // // user information
    get user(): any { return this.appConfig.user; }
    set user(user: any) { this.appConfig.user = user; if (user.token) this.storeToken(user.token); }


    // -----------------------
    // Account

    listAccount(query?: string) {
        return this.backend.listAccount(query);
    }
    getAccount(id: string ) {
        return this.backend.getAccount(id);
    }
    updateAccount(account: AccountModel) {
        // return this.backend.updateAccount(account);
        this.backend.updateAccount(account).first().subscribe((res) => {
            if (res.success) {
                this.user.name = account.fullname;
                this.data.account = account;
                // console.log('res', res);
                console.log(this.data.account)
            }
        });

    }
    deleteAccount(id: string) {    // inactivate
        return this.backend.deleteAccount(id);
    }


    get account(): AccountModel {
        return this.data.account;
    }
    set account(accounts: AccountModel) {
        this.mergeObjectData(this.data.account, accounts);
    }

    mergeObjectData(target, data) {
        let keys = Object.keys(data);
        let key;

        for (let i = 0; i < keys.length; i++) {
            key = keys[i];
            if (data[key] != undefined && data[key] != '' && key != '_hashed_password') {
                target[key] = data[key];
            }

        }
    }

    // for test










	// // database validation의 error의 경우 object로 return된다.
	// // code가 1000을 넘어가거나 message가 object일 경우 해당된다.
	// // { success: false, code: 1xxx, message: {
	// // 		message: "전체 title",
	// // 		name: "ValidationError",
	// // 		errors: {
	// // 			field: {
	// // 				message: "에러 메세지",
	// // 				...
	// // 				value: "보내온 값"
	// // 			}
	// // 		}
	// // }}
	// databaseError(msg) {
	// 	for (let key in msg.errors) {
	// 		let message = msg.errors[key];
	// 		return message.message;
	// 	}
	// }


	// // ---------------------------
	// // Backend interface
	// //
	// // 초기에 token을 읽어서 서버로부터 사용자 정보를 가져온다.
	// isLoggedIn() {
	// 	return Observable.fromPromise(this.storage.get('currentUserToken').then((token: string) => { return token; }))
	// 			.map((token: string) => {
	// 				if (!token) throw new Error();
	// 				else return token;
	// 			})
	// 			.flatMap((token: any) => {
	// 				this.setToken(token);
	// 				return this.backend.getuserinfo();
	// 			})
	// 			.map((result: any) => {
	// 				console.log('currentUserToken: ', result.data, result);
	// 				this.user = result.data.user;
	// 				this.account = result.data.account;

	// 				return result;
	// 			}).first();
	// }

	// // bug reporting
	// bugReport(body) {
	// 	this.backend.sendReport(body).subscribe(data => {
	// 			console.log("sendReport return: " + JSON.stringify(data));
	// 	});
	// }

	// // LOGIN: login 요청을 보내고 돌아오는 정보를 user에 넣는다. (더불어 space와 project 정보를 연속해서 받는다.)
	// login(data) {
	// 	this.showLoading();
	// 	return this.backend.login(data).map(res => {
	// 		if (res.success) {
	// 			this.user = {id: res.data.account.id, uid: res.data.account.uid, name: res.data.account.fullname, token: res.data.token};
	// 			this.account = res.data.account;

	// 			this.getSpaces();
	// 			setTimeout(() => {
	// 				if (this.loading) this.loading.dismiss();
	// 				return true;
	// 			}, 1000);
	// 		} else {
	// 			if (this.loading) this.loading.dismiss();
	// 		    throw new Error(res.message);
	// 		}
	// 	})
	// }
	// // SIGNUP: sigup 요청을 보내고 돌아오는 정보를 user에 넣는다. (기본적으로 login과 같은 정보가 온다.)
	// signup(data) {
	// 	this.showLoading();
	// 	return this.backend.signup(data).map(res => {
	// 		if (this.loading) this.loading.dismiss();
	// 		if (res.success) {
	// 			this.user = res.data;
	// 			this.account = res.data.account;

	// 			return true;
	// 		}
	// 		else throw new Error((typeof res.message === 'object' ? this.databaseError(res.message) : res.message));
	// 	})
	// }
	// idcheck(data) {
	// 	return this.backend.idcheck(data);
	// }
	// spacedata(data) {
	// 	return this.backend.spacedata(data);
	// }
	// logout() {
	// 	this.showLoading();
	// 	return this.backend.logout().map(res => {
	// 		if (this.loading) this.loading.dismiss();
	// 		if (res.success) {
	// 			this.initialize();
	// 			this.removeToken();
	// 			return true;
	// 		}
	// 		else throw new Error((typeof res.message === 'object' ? this.databaseError(res.message) : res.message));
	// 	})
	// }
	// // space 생성
	// createSpace(space: SpaceModel) {
	// 	this.showLoading();
	// 	return this.backend.createSpace(space).map(res => {
	// 		if (this.loading) this.loading.dismiss();
	// 		if (res.success) { this.data.spaces.push(res.data); return true; }
	// 		else throw new Error(res.message);
	// 	})
	// }

	// // ------------------------------
	// // running environment
	// //
	// get onDevice(): boolean { return this.appConfig.isDevice; }
	// set onDevice(flag: boolean) { this.appConfig.isDevice = flag; }
	// get device(): DeviceModel { return this.appConfig.device; }
	// set device(info: DeviceModel) {
	// 	this.appConfig.device = info;
	// 	this.backend.uuid = (this.appConfig.device.uuid ? this.appConfig.device.uuid : 'browser');
	// 	console.log("global device: " + JSON.stringify(info));
	// }

	

	// // ------------------------------
	// // internationalize
	// //
	// initializeLanguage() {
	// 	// 초기에 device에서 설정된 언어로 setting한다.
	// 	let lang = this.deviceLanguage;
	// 	// this.translate.setDefaultLang(lang);
	// 	// 사용자가 app을 위해서 설정한 언어가 있으면 변경한다.
	// 	this.storedLanguage().subscribe(value => {
 //            value
	// 		// this.translate.use(value);
	// 	})
	// }
	// // device에서 설정된 언어를 가져온다
	// get deviceLanguage(): any { let l = navigator.language.split('-'); return l[0]; }
	// // 지원하는 언어 가져오기
	// get supportLanguages(): any[] { return this.appConfig.languages; }
	// // 현재 언어 설정, 가져오기 (초기에 한변은 loadLanguage를 해야 한다.)
	// get language() { return this.appConfig.current_language; }
	// // 사용하는 언어를 변경한다. (storage에 저장하면 )
	// set language(lang: string) {
	// 	this.appConfig.current_language = lang;
	// 	// this.translate.use(this.appConfig.current_language);
 //        this.appConfig.current_language;
	// 	this.storage.set('language', lang);
	// }
	// // 언어 설정을 storage에서 초기에 가져오기 (이후도 사용할 수 있다. 단, subcribe 형태로 접근한다.)
	// storedLanguage(): Observable<any> {
	// 	// 현재 설정된 language가 있으면 그냥 return
	// 	if (this.language)
	// 		return Observable.create(observer => {
	// 			observer.next(this.language);
	// 			observer.complete();
	// 		})
	// 	else {
	// 		return Observable.fromPromise(this.storage.get('language').then((value) => {
	// 			if (!value) { this.language = value = this.deviceLanguage; }
	// 			else this.language = value;
	// 			return value;
	// 		}));
	// 	}
	// }


	// // ---------------------------------
	// // Space

 //    // create
 //    insertSpace(space: SpaceModel) {
 //        return this.backend.insertSpace(space);
 //    }
 //    // read list of items
 //    listSpace(query?: string) {
 //        return this.backend.listSpace(query);
 //    }
 //    // read one of items
 //    getSpace(id: string) {
 //        return this.backend.getSpace(id);
 //    }
 //    // update
 //    updateSpace(space: SpaceModel) {
 //        return this.backend.updateSpace(space);
 //    }
 //    // delete
 //    deleteSpace(id: string) {	// inactivate
 //        this.backend.deleteSpace(id).first().subscribe((res) => {
 //        	if (res.success) {
	// 			for (let i = 0; i < this.data.spaces.length; i++) {
	// 				if (this.data.spaces[i]._id === res.data._id) {
	// 					this.data.spaces.splice(i, 1);
	// 					break;
	// 				}
	// 			}
 //        	}
 //        });
 //    }
 //    // get member
 //    getMemberToSpace(spaceID: string) {
 //        return this.backend.getMemberToSpace(spaceID);
 //    }
 //    // add member
 //    addMemberToSpace(spaceID: string, userID: string) {
 //        return this.backend.addMemberToSpace(spaceID, userID);
 //    }
 //    // delete member
 //    deleteMemberToSpace(spaceID: string, userID: string) {
 //        return this.backend.deleteMemberToSpace(spaceID, userID);
 //    }
 //    // // inactive
 //    // inactiveSpace(space: SpaceModel) {
 //    //     space['active'] = false;
 //    //     return this.updateSpace(space);
 //    // }


 //    // To Be Deprecated

	// // 전체 space들 가져오기, 설정하기.
	// get spaces(): SpaceModel[] { return this.data.spaces; }
	// // 초기에 서버로 부터 데이타를 받아와 넣는다.
	// set spaces(spaces: SpaceModel[]) { this.data.spaces = this.data.spaces.concat(spaces); }
	// // 전체 프로젝트 가져오기
	// get projects(): ProjectModel[] { return this.data.projects; }
	// // 초기에 서버로 부터 데이타를 받아와 넣는다.
	// set projects(projects: ProjectModel[]) { this.data.projects = projects; }
	// // return current space when id==null, else return specified space
	// space(id: any): SpaceModel {
	// 	console.log("spaces in global: ", this.data.spaces);
	// 	if (id) {
	// 		for (let i=0; i<this.data.spaces.length; i++) {
	// 			// console.log("compare ", this.data.spaces[i]._id, "and input", id);
	// 			if (this.data.spaces[i]._id === id) {
	// 				return this.data.spaces[i];
	// 			}
	// 		}
	// 	} else {
	// 		return this.data.spaces[0];
	// 	}
	// }
	// spaceName(id: any) {
	// 	for (let i=0; i<this.data.spaces.length; i++)
 //            // if (this.data.spaces[i]._id === id) return this.translate.instant(this.data.spaces[i].title);
	// 		if (this.data.spaces[i]._id === id) return this.data.spaces[i].title;
	// }
	// spaceColor(id: any) {
	// 	for (let i=0; i<this.data.spaces.length; i++)
	// 		if (this.data.spaces[i]._id === id) return this.data.spaces[i].color;
	// }
	// // 초기에 space들의 list를 가져와서 data structure를 만든다.
	// getSpaces() {
	// 	this.backend.listSpace()
	// 		.subscribe(
	// 			data => { this.spaces = data.data; },
	// 			err => { console.log(err); }
	// 		)
	// }
	// defaultSpace(): SpaceModel {
	// 	for (let i=0; i<this.data.spaces.length; i++) {
	// 		// console.log("compare ", this.data.spaces[i]._id, "and input", id);
	// 		if (this.data.spaces[i].title === 'DEFAULTSPACE') {
	// 			return this.data.spaces[i];
	// 		}
	// 	}
	// }

 //    // space info update
 //    updateSpaceSettingData(spaceSetting) {
 //        this.backend.updateSpaceSettingData(spaceSetting);
 //    }

 //    // space info delete
 //    deleteSpaceSettingData(id) {
 //        this.backend.deleteSpaceSettingData(id);
 //    }


	// // ---------------------------------
	// // Project

 //    // create
 //    insertProject(project: ProjectModel) {
 //        return this.backend.insertProject(project);
 //    }
 //    // read list of items
 //    listProject(query?: string) {
 //        return this.backend.listProject(query);
 //    }
 //    // read one of items
 //    getProject(id: string) {
 //        return this.backend.getProject(id);
 //    }
 //    // update
 //    updateProject(project: ProjectModel) {
 //        return this.backend.updateProject(project);
 //    }
 //    // delete
 //    deleteProject(id: string) {	// inactivate
 //        return this.backend.deleteProject(id);
 //    }
 //    // // inactive
 //    // inactiveProject(project: ProjectModel) {
 //    //     project['active'] = false;
 //    //     return this.updateProject(project);
 //    // }


	// // ---------------------------------
	// // Device

 //    // create
 //    insertDevice(device: DeviceModel) {
 //        return this.backend.insertDevice(device);
 //    }
 //    // read list of items
 //    listDevice(query?: string) {
 //        return this.backend.listDevice(query);
 //    }
 //    // read one of items
 //    getDevice(id: string) {
 //        return this.backend.getDevice(id);
 //    }
 //    // update
 //    updateDevice(device: DeviceModel) {
 //        return this.backend.updateDevice(device);
 //    }
 //    // delete
 //    deleteDevice(id: string) {
 //        return this.backend.deleteDevice(id);
 //    }


 //    // -----------------------
 //    // Board/Card

 //    // create
 //    insertBoard(board: CardModel) {
 //        return this.backend.insertBoard(board);
 //    }
 //    // read list of items
 //    listBoard(query?: string) {
 //        return this.backend.listBoard(query);
 //    }
 //    // read one of items
 //    getBoard(id: string) {
 //        return this.backend.getBoard(id);
 //    }
 //    // update
 //    updateBoard(board: CardModel) {
 //        return this.backend.updateBoard(board);
 //    }
 //    // delete
 //    deleteBoard(id: string) {
 //        return this.backend.deleteBoard(id);
 //    }
 //    // read list of items
 //    listBoardAppendable(model: string, itemid: string, query?: string) {
 //        return this.backend.listBoardAppendable(model, itemid, query);
 //    }

 //    // To Be Deprecated

	// // addCard를 어디에서 쓸 지 몰라서 일단 남겨둠. (Heeam 2017.6.14.)
	// addCard(card) {
	// 	this.data.card.push(card);
	// }

 //    // -----------------------
	// // Schedule

 //    // create
 //    insertSchedule(schedule: ScheduleModel) {
 //        return this.backend.insertSchedule(schedule);
 //    }
 //    // read list of items
 //    listSchedule(query?: string) {
 //        return this.backend.listSchedule(query);
 //    }
 //    // read one of items
 //    getSchedule(id: string) {
 //        return this.backend.getSchedule(id);
 //    }
 //    // update
 //    updateSchedule(schedule: ScheduleModel) {
 //        return this.backend.updateSchedule(schedule);
 //    }
 //    // delete
 //    deleteSchedule(id: string) {
 //        return this.backend.deleteSchedule(id);
 //    }
 //    // // between A and B
 //    // listScheduleBetween(timeStart: string, timeEnd: string) {
 //    //     return this.listSchedule(`?starttime>=${timeStart}&endtime<${timeEnd}`);
 //    // }
 //    // lazy loading
 //    listScheduleLazyLoading(lastItemCount: number, pageSize: number) {
 //        return this.listSchedule(`?offset=${lastItemCount}&limit=${pageSize}`);
 //    }
	// listScheduleBetween(startDate: string, endDate: string, space?: string) {
	// 	startDate = moment(startDate).add(new Date().getTimezoneOffset() / 60, 'hours').format('YYYY-MM-DDTHH:mm');
	// 	endDate = moment(endDate).add(new Date().getTimezoneOffset() / 60, 'hours').format('YYYY-MM-DDTHH:mm');
	// 	return this.backend.listScheduleBetween(startDate, endDate, space);
	// }


 //    // -----------------------
 //    // Todo
 //    // create
	// insertTodo(todo: TodoModel) {
 //    	return this.backend.insertTodo(todo)
	// 		// .subscribe(
	// 		// 	res => { console.log(res) },
	// 		// 	err => { console.log(err) },
	// 		// 	() => { console.log('complete') }
	// 		// )

	// 		// .map((res: any) => {
	// 		// 	if (res.success) {
	// 		// 		console.log(JSON.stringify(res, null, 4));
	// 		// 		// this.addTodo(res.data);
	// 		// 		this.data.todo.push(res.data);
	// 		// 		console.log(this.data);
	// 		// 		return res.data;
	// 		// 	}
	// 		// 	else {
	// 		// 		console.log(res.message);
	// 		// 		throw new Error(res.message);
	// 		// 	}
	// 		// })

	// 		// .map((res: any) => {
	// 		// 	console.log('result: ', res);
	// 		// 	if (res.success) { this.data.todo.push(res.data); return res.data; }
	// 		// 	else throw new Error(res.message);
	// 		// })
	// 		// .first()
	// }
 //    // read list of items
 //    listTodo(query?: string) {
 //        return this.backend.listTodo(query);
 //    }
 //    // read one of items
 //    getTodo(id: string) {
 //        return this.backend.getTodo(id);
 //    }
 //    // update
 //    updateTodo(todo: TodoModel) {
 //        return this.backend.updateTodo(todo);
 //    }
 //    // delete
 //    deleteTodo(id: string) {
 //        return this.backend.deleteTodo(id);
 //    }
 //    // between A and B
 //    listTodoBetween(timeStart: string, timeEnd: string) {
 //        return this.listTodo(`?duedate>=${timeStart}&duedate<${timeEnd}`);
 //    }
 //    // lazy loading
 //    listTodoLazyLoading(lastItemCount: number, pageSize: number) {
 //        return this.listTodo(`?offset=${lastItemCount}&limit=${pageSize}`);
 //    }

 //    // To Be Deprecated

	// // addTodo를 어디에서 쓸 지 몰라서 일단 남겨둠. (Heeam 2017.6.14.)
	// addTodo(todo) {
	// 	this.data.todo.push(todo);
	// }


 //    // -----------------------
 //    // History

 //    // read list of items
 //    listTodoHistory(id: string,  query?: string) {
 //    	const alias = 'todo';
 //        return this.backend.listHistory(alias, id, query);
 //    }
 //    // read one of items
 //    getTodoHistory(id: string, historyid: string) {
 //    	const alias = 'todo';
 //        return this.backend.getHistory(alias, id, historyid);
 //    }

 //    // read list of items
 //    listScheduleHistory(id: string,  query?: string) {
 //    	const alias = 'schedule';
 //        return this.backend.listHistory(alias, id, query);
 //    }
 //    // read one of items
 //    getScheduleHistory(id: string, historyid: string) {
 //    	const alias = 'schedule';
 //        return this.backend.getHistory(alias, id, historyid);
 //    }

 //    // read list of items
 //    listBoardHistory(id: string,  query?: string) {
 //    	const alias = 'card';
 //        return this.backend.listHistory(alias, id, query);
 //    }
 //    // read one of items
 //    getBoardHistory(id: string, historyid: string) {
 //    	const alias = 'card';
 //        return this.backend.getHistory(alias, id, historyid);
 //    }


	// // Profile --------------
	// get profiles(): ProfileModel[] {
	// 	return this.data.profiles; }

	// set profiles(profiles: ProfileModel[]) {
	// 	this.data.profiles = this.data.profiles.concat(profiles); }

	// getProfile() {
	// 	return this.backend.getProfile();
	// }

	// getProfileData(uid) {
	// 	return this.backend.getProfileData(uid);
	// }



 //    // To Be Deprecated
 //    // getAccount() {
 //    //     return this.backend.getAccount();
 //    // }
 //    // getAccountData(uid) {
 //    //     return this.backend.getAccountData(uid);
 //    // }
 //    // updateAccountData(account) {
 //    //     this.backend.updateAccountData(account);
 //    // }


	

	// // temp parameter passing from child to parent
	// get passParam(): any { return this.tempParam; }
	// set passParam(param: any) { this.tempParam = param; }

	// // --------------------------
	// // progress & error display for system
	// showLoading() {
	// 	this.loading = this.loadingCtrl.create({
 //            spinner: 'ios',
	// 		content: 'Please wait...',
 //            duration: 3000
	// 	});
	// 	this.loading.present();
	// }
	// showError(text, code) {
	// 	let alert = this.alertCtrl.create({
	// 		title: (code ? 'Fail[' + code + ']' : 'Fail'),
	// 		subTitle: text,
	// 		buttons: ['OK']
	// 	});
	// 	alert.present(prompt);
	// }

	// // ----------------
	// // util parts
	// // datetime-util
	// isoDateToNgFormat(isoDate: string, format?: string) {
	// 	const date = moment(isoDate);
	// 	// moment.locale('ko');
	// 	return (isoDate ? (format ? date.format(format) : date.format('YYYY-MM-DD A h:mm')) : '');
	// }
	// isoDateToTimesAgo(isoDate: string, locale: string) {
	// 	// const date = moment(isoDate, moment.ISO_8601);
	// 	const date = moment(isoDate);
	// 	// return date.from(todayMoment);
	// 	return date.locale(locale).fromNow();
	// }
	// template(templ: string) {
	// 	return dot.template(templ);
	// }

	// // ----------------
	// // test parts
	// disp() {
	// 	console.log("globals: ", JSON.stringify(this.appConfig, null, 4));
	// 	console.log("datas: ", JSON.stringify(this.data, null, 4));
	// }
	// timestamp(str) {
	// 	let t = (new Date()).getTime();
	// 	if (this.last_timestamp) {
	// 		console.log(str + ': ' +  t + ' [' + (t-this.last_timestamp) + 'ms]');
	// 	} else {
	// 		console.log(str + ': ' +  t );
	// 	}
	// 	this.last_timestamp = t;
	// }
	// // observable test
	// test() {
	// 	if (this.testdata) {
	// 		// already loaded
	// 		return Observable.create(observer => {
	// 			observer.next(this.testdata);
	// 			observer.complete();
	// 		})
	// 	}

	// 	return Observable.create(observer => {
	// 		setTimeout(() => {
	// 			this.testdata = 1000;
	// 			observer.next(this.testdata);
	// 			observer.complete();
	// 		}, 3000);
	// 	})
	// }

 //    initNoti() {
 //        if (!window.localStorage.getItem('notification')) {
 //            window.localStorage.setItem('notification', JSON.stringify([]));
 //        }
 //    }

 //    addNoti(message: any) {
 //        let notification: any[] = [];
 //        notification = JSON.parse(window.localStorage.getItem('notification'));
 //        notification.push(message);
 //        window.localStorage.setItem('notification', JSON.stringify(notification));
 //    }

 //    listNoti(): any[] {
 //        let notification: any[] = [];
 //        notification = JSON.parse(window.localStorage.getItem('notification'));
 //        return notification;
 //    }

 //    countNoti(): number {
 //        let notification: any[] = [];
 //        notification = JSON.parse(window.localStorage.getItem('notification'));
 //        return notification.length;
 //    }

 //    removeNoti(message: any) {
 //        let notification: any[] = [];
 //        notification = JSON.parse(window.localStorage.getItem('notification'));
 //        if (notification.indexOf(message) > -1) notification.splice(notification.indexOf(message), 1);
 //        window.localStorage.setItem('notification', JSON.stringify(notification));
 //    }

	// deleteSpaceData(id: string) {
	// 	for (let i = 0; i < this.data.spaces.length; i++) {
	// 		if (this.data.spaces[i]._id === id) {
	// 			this.data.spaces.splice(i, 1);
	// 			break;
	// 		}
	// 	}
	// }


}
