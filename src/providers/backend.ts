import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
// import { Storage } from '@ionic/storage';
import { Subject, Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

// import { ToastController } from 'ionic-angular';

import { AccountModel } from '../models/account.model';

// import * as config from '../../build';


@Injectable()
export class Backend {
    apiUrl: string = 'https://office.o2palm.com';

    private headers = new Headers();
    /**
     * http error 를 수집하는 subject 입니다.
     * rxHttpError() 를 통해 subscribe 할 수 있습니다.
     */
    private _httpError$: Subject<any> = new Subject<any>();

    constructor(public http: Http,
                // private storage: Storage,
                // private global: Global,
                // private toastCtrl: ToastController
                ) {
        console.log('Hello Backend Provider');

        // build파일 못잡아서 강제로 써줌
        this.apiUrl = 'https://192.168.1.230';

        // gulp builder에서 자동 입력한 host가 있으면 바꿔준다.
        // if (typeof config.data.host !== undefined) {
        //     this.apiUrl = config.data.host;
        // }
        console.log("connect server: ", this.apiUrl);
    }


    // -----------------------
    // Account

    // create
    insertAccount(account: AccountModel) {
        return this._post('/v2/api/account', account);
    }

    // read list of items
    listAccount(query?: string) {
        return this._get('/v2/api/account' + (query ? query : ''));
    }
    // read one of items
    getAccount(id: string) {
        return this._get(`/v2/api/account/${id}`);
    }
    // update
    updateAccount(account: AccountModel) {
        return this._put(`/v2/api/account/${account.id}`, account);
    }
    // delete
    deleteAccount(id: string) {
        return this._delete(`/v2/api/account/${id}`);
    }

    // for test





    




    // /**
    //  * error 를 핸들링 합니다.
    //  * http 의 error 는 모두 _httpError$ subject 에 publish 합니다
    //  */
    private _handleError = (error: any) => {
        console.error('error', JSON.stringify(error));
        this._httpError$.next(error);
        return Observable.throw(error);
    }

    private handleError(error: any) {
        console.error('error', JSON.stringify(error));
        // Has Error: core.es5.js:1084 ERROR SyntaxError: Unexpected token < in JSON at position 0
        return Observable.throw(error.json().error || 'Server error');
    }

    // /**
    //  * http Error 에 대한 subject 를 리턴합니다.
    //  * 이 subject 를 구독하여 error 를 수집하는 곳에 쓰일 수 있습니다.
    //  */
    // rxHttpError(): Observable<any> {
    //     return this._httpError$;
    // }

    // presentToast() {
    //     let toast = this.toastCtrl.create({
    //         message: 'User was added successfully',
    //         duration: 1000,
    //         position: 'top',
    //         showCloseButton: true
    //     });

    //     toast.onDidDismiss(() => {
    //         console.log('Dismissed toast');
    //     });

    //     toast.present();
    // }

    // set token
    set token(token: string) { this.headers.set('x-access-token', token) }
    get token(): string { return '' }
    set uuid(id: string) { this.headers.set('device-uuid', id) }

    // POST HTTP METHOD: (INSERT/CREATE) Creates an item.
    // http.post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response>;
    // [Example] http.post(this.docUrl, body, options?)
    private _post(url: string, data: Object, cb?: any): Observable<any> {
        let fullUrl        = this.apiUrl + url;       // fullUrl
        // let bodyString    = JSON.stringify(data);     // Stringify payload
        let headers       = this.headers;
        headers.set('Content-Type', 'application/json');                 // Set content type to JSON
        let options       = new RequestOptions({ headers: headers });    // Create a request option

        // Usually
        // return this.http.post(url, data, config).then(successCallback, errorCallback)
        //
        // Or
        // .map(res => res.json()) //or// .map(res => res.text())
        // .subscribe(successCallback, errorCallback, compeletedCallback)
        // Like .subscribe(data => this.saveJwt(data.tokenId), err => this.logError(err), () => console.log('Authentication Complete'))
        //
        // But we are using
        // .map((res: Response) => { res.json() })
        // .catch((error: any) => Observable.throw(error.json().error || 'Server error'))

        console.log('http.post(fullUrl, data, options): ', fullUrl, data, options);
        return this.http.post(fullUrl, data, options)
            .map((res: Response) => { if (cb && res.json().success) cb(); return res.json(); })    // calling .json() on the response to return data
            .catch(this._handleError)                                                              // errors if any
    }

    // GET HTTP METHOD: (GET/READ) Returns an item or (LIST/ALL) items on the specified doc.
    // http.get(url: string, options?: RequestOptionsArgs): Observable<Response>;
    // [Example] http.get(this.docUrl, options?) //or// http.get(`${docUrl}/${id}`, options?)
    private _get(url: string, err?: any): Observable<any> {
        let fullUrl        = this.apiUrl + url;                            // fullUrl
        let headers       = this.headers;
        let options       = new RequestOptions({ headers: headers });      // Create a request option

        console.log('http.get(fullUrl, options): ', fullUrl, options);
        return this.http.get(fullUrl, options)
            .map((res: Response) => { if (res.json().success) return res.json().data; else return err; })    // calling .json().date on the response to return data
            .catch(this._handleError)                                                                        // errors if any
    }

   // PUT HTTP METHOD: (UDATE) Updates an item.
    // http.put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response>;
    // [Example] http.put(`${this.docUrl}/${body['id']}`, body, options?)
    private _put(url: string, data: Object, cb?: any): Observable<any> {
        let fullUrl        = this.apiUrl + url;                          // fullUrl
        // let bodyString    = JSON.stringify(data);                        // Stringify payload
        let headers       = this.headers;
        headers.set('Content-Type', 'application/json');                 // Set content type to JSON
        let options       = new RequestOptions({ headers: headers });    // Create a request option

        console.log('http.put(fullUrl, data, options): ', fullUrl, data, options);
        return this.http.put(fullUrl, data, options)
            .map((res: Response) => { if (cb && res.json().success) cb(); return res.json(); })    // calling .json() on the response to return data
            .catch(this._handleError)                                                              // errors if any
    }

    // DELETE HTTP METHOD: (DELETE) Deletes an item.
    // http.delete(url: string, options?: RequestOptionsArgs): Observable<Response>;
    // [Example] http.delete(`${this.docUrl}/${id}`, options?)
    private _delete(url: string, cb?: any): Observable<any> {
        let fullUrl        = this.apiUrl + url;                          // fullUrl
        let headers       = this.headers;
        let options       = new RequestOptions({ headers: headers });    // Create a request option

        console.log('http.delete(fullUrl, data, options): ', fullUrl, options);
        return this.http.delete(fullUrl, options)
            .map((res: Response) => { if (cb && res.json().success) cb(); return res.json(); })    // calling .json() on the response to return data
            .catch(this._handleError)                                                              // errors if any
    }

    // // PATCH HTTP METHOD: (PATCH) Updates an item. This method supports patch semantics.
    // http.patch(url: string, body: any, options?: RequestOptionsArgs): Observable<Response>;
    // private _patch(url: string, data: any, options?: RequestOptionsArgs): Observable<Response> {
    //    // Not in use
    // }

    // // HEAD HTTP METHOD:
    // http.head(url: string, options?: RequestOptionsArgs): Observable<Response>;
    // private _head(url: string, options?: RequestOptionsArgs): Observable<Response> {
    //    // Not in use
    // }

    // // REQUEST HTTP METHOD:
    // http.request(url: string | Request, options?: RequestOptionsArgs): Observable<Response>;
    // private _request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    //    // Not in use
    // }

    // // --------------------
    // // The below methods are not in use now. Just prepareing for the schedule/calendar implemetation.

    // // (IMPORT) Imports an item. This operation is used to add a private copy of an existing item to a doc.
    // private _import() {
    //     // Not in use
    // }

    // // (INSTANCES) Returns instances of the specified calculated/regenerated item.
    // private _instances() {
    //     // Not in use
    // }

    // // (MOVE) Moves an item to another doc, i.e. changes an item's organizer.
    // private _move() {
    //     // Not in use
    // }

    // // (QUICKADD) Creates an item based on a simple text string.
    // private _quickadd() {
    //     // Not in use
    // }

    // // (WATCH) Watch for changes to item resources.
    // private _watch() {
    //     // Not in use
    // }

    // // --------------------
    // // device 정보
    // registerDevice(data) {
    //     console.log("register device http data: " + JSON.stringify(data));
    //     return this.http.post(this.apiUrl + '/v2/device', data)
    //         .map(res => {
    //             console.log("register device result: ", res);
    //             return res.json()
    //         })
    //         .catch(this.handleError)
    //         .subscribe(ret => {
    //             console.log("return: ", ret);
    //         })
    // }

    // // --------------------
    // // 사용자 관련
    // //
    // // id check
    // idcheck(data) {
    //     return this._get('/v2/idcheck/' + data, true);
    // }
    // // login
    // login(data) {
    //     console.log("http data: " + JSON.stringify(data));
    //     return this.http.post(this.apiUrl + '/v2/signin', data)
    //         .map(res => res.json())
    //         .catch(this.handleError);
    // }
    // logout() {
    //     console.log("http data: logout");
    //     return this.http.post(this.apiUrl + '/v2/api/signout', {}, {headers: this.headers})
    //         .map(res => res.json())
    //         .catch(this.handleError);
    // }
    // signup(data) {
    //     console.log("http data: " + JSON.stringify(data));
    //     return this.http.post(this.apiUrl + '/v2/signup', data)
    //         .map(res => {
    //             let ret = res.json();
    //             if (ret.success) {
    //             }
    //             return ret;
    //         })
    //         .catch(this.handleError);
    // }
    // getuserinfo() {
    //     // return this._get('/v2/api/user', null).map(res => res.json());
    //     return this.http.get(this.apiUrl + '/v2/api/user', {headers: this.headers})
    //         .map(res => res.json())
    //         .catch(this.handleError);
    // }


    // // ----------------------
    // // Space

    // // create
    // insertSpace(space: SpaceModel) {
    //     return this._post(`/v2/api/space`, space);
    // }
    // // read list of items
    // listSpace(query?: string) {
    //     return this._get(`/v2/api/space` + (query ? query : ''));
    // }
    // // read one of items
    // getSpace(id: string) {
    //     return this._get(`/v2/api/space/${id}`);
    // }
    // // update
    // updateSpace(space: SpaceModel) {
    //     return this._put(`/v2/api/space/${space._id}`, space);
    // }
    // // delete
    // deleteSpace(id: string) {
    //     return this._delete(`/v2/api/space/${id}`);
    // }
    // // get member
    // getMemberToSpace(spaceID: string) {
    //     return this._get(`/api/v2/member/space/${spaceID}`);
    // }
    // // add member
    // addMemberToSpace(spaceID: string, userID: string) {
    //     return this._post(`/api/v2/member/space/${spaceID}`, {user: userID});
    // }
    // deleteMemberToSpace(spaceID: string, userID: string) {
    //     return this._delete(`/api/v2/member/space/${spaceID}`, {user: userID});
    // }


    // // To Be Deprecated

    // // get space list (global data에 넣는 처리를 자체적으로 한다.)
    // getSpaces() {
    //     return this._get('/v2/api/space', []);
    // }
    // // get datas in space
    // spacedata(spaceid: any) {
    //     let id = (spaceid ? spaceid : 'all');
    //     return this._get(`/v2/api/space/${id}`, []);
    // }
    // // space 생성
    // createSpace(space: SpaceModel) {
    //     return this.http.post(this.apiUrl + '/v2/api/space', space, {headers: this.headers})
    //         .map(res => res.json())
    //         .catch(this.handleError);
    // }


    // // ----------------------
    // // Project

    // // create
    // insertProject(project: ProjectModel) {
    //     return this._post(`/v2/api/project`, project);
    // }
    // // read list of items
    // listProject(query?: string) {
    //     return this._get(`/v2/api/project` + (query ? query : ''));
    // }
    // // read one of items
    // getProject(id: string) {
    //     return this._get(`/v2/api/project/${id}`);
    // }
    // // update
    // updateProject(project: ProjectModel) {
    //     return this._put(`/v2/api/project/${project._id}`, project);
    // }
    // // delete
    // deleteProject(id: string) {
    //     return this._delete(`/v2/api/project/${id}`);
    // }


    // // ----------------------
    // // Device

    // // create
    // insertDevice(device: DeviceModel) {
    //     return this._post(`/v2/api/device`, device);
    // }
    // // read list of items
    // listDevice(query?: string) {
    //     return this._get(`/v2/api/device` + (query ? query : ''));
    // }
    // // read one of items
    // getDevice(id: string) {
    //     return this._get(`/v2/api/device/${id}`);
    // }
    // // update
    // updateDevice(device: DeviceModel) {
    //     return this._put(`/v2/api/device/${device._id}`, device);
    // }
    // // delete
    // deleteDevice(id: string) {
    //     return this._delete(`/v2/api/device/${id}`);
    // }


    // // -----------------------
    // // Board/Card
    // // 당분간 API 호출은 /v2/api/card를 사용하고 모델도 card.model.ts를 사용하지만
    // // 실제 이름은 board이고 list 화면도 mainboard로 쓰기로 정했다고 함. (2017.6.14. 전체회의)

    // // create
    // insertBoard(board: CardModel) {
    //     return this._post(`/v2/api/card`, board);
    // }
    // // read list of items
    // listBoard(query?: string) {
    //     return this._get(`/v2/api/card` + (query ? query : ''));
    // }
    // // read one of items
    // getBoard(id: string) {
    //     return this._get(`/v2/api/card/${id}`);
    // }
    // // update
    // updateBoard(board: CardModel) {
    //     return this._put(`/v2/api/card/${board._id}`, board);
    // }
    // // delete
    // deleteBoard(id: string) {
    //     return this._delete(`/v2/api/card/${id}`);
    // }
    // // read appendable list of items
    // listBoardAppendable(model: string, itemid: string, query?: string) {
    //     return this._get(`/v2/api/card/appendable/${model}/${itemid}` + (query ? query : ''));
    // }


    // // -----------------------
    // // Calendar 관련

    // // create
    // insertSchedule(schedule: ScheduleModel) {
    //     return this._post(`/v2/api/schedule`, schedule);
    // }
    // // read list of items
    // listSchedule(query?: string) {
    //     return this._get(`/v2/api/schedule` + (query ? query : ''));
    // }
    // // read one of items
    // getSchedule(id: string) {
    //     return this._get(`/v2/api/schedule/${id}`);
    // }
    // // update
    // updateSchedule(schedule: ScheduleModel) {
    //     return this._put(`/v2/api/schedule/${schedule._id}`, schedule);
    // }
    // // delete
    // deleteSchedule(id: string) {
    //     return this._delete(`/v2/api/schedule/${id}`);
    // }
    // listScheduleBetween(startDate: string, endDate: string, spaceId?: string) {
    //     let spaceQuery =  (spaceId) ? `?space=${spaceId}` : '';
    //     return this._get(`/v2/api/schedule/period/${startDate}/${endDate}` + spaceQuery);
    //     // return this._get(`/v2/api/schedule/period/${startDate}/${endDate}/${space}`, []);
    // }


    // // -----------------------
    // // Todo

    // // create
    // insertTodo(todo: TodoModel) {
    //     return this._post(`/v2/api/todo`, todo);
    // }
    // // read list of items
    // listTodo(query?: string) {
    //     return this._get(`/v2/api/todo` + (query ? query : ''));
    // }
    // // read one of items
    // getTodo(id: string) {
    //     return this._get(`/v2/api/todo/${id}`);
    // }
    // // update
    // updateTodo(todo: TodoModel) {
    //     return this._put(`/v2/api/todo/${todo._id}`, todo);
    // }
    // // delete
    // deleteTodo(id: string) {
    //     return this._delete(`/v2/api/todo/${id}`);
    // }


    // // -----------------------
    // // History

    // // read list of items
    // listHistory(alias: string, id: string,  query?: string) {
    //     return []; // this._get(`/v2/api/${alias}/${id}/history` + (query ? query : '')); // 숙제: query
    // }
    // // read one of items
    // getHistory(alias: string, id: string, historyid: string) {
    //     return []; // this._get(`/v2/api/${alias}/${id}/history/${historyid}`);
    // }


    // // -----------------------
    // // User Profile 관련
    // // get profile list
    // getProfile() {
    //     return this._get(`/v2/api/users`, []);
    // }
    // getProfileData(uid: any) {
    //     // console.log(uid);
    //     return this._get('/v2/api/usearch/' + uid, []);
    // }



    // // -----------------------
    // // File

    // uploadFile(file: any) {
    //     return this._post('/v2/api/file/upload', file);
    // }

    // uploadImage(image: any) {
    //     return this._post('/v2/api/image/upload', image);
    // }

    // // -----------------------
    // // Account Setting 관련
    // // get, update account info

    // // To Be Deprecated

    // // getAccount() {
    // //     // return this.listAccount();
    // //     return this._get(`/v2/api/account`, []);
    // // }
    // // getAccountData(id: string) {
    // //     console.log(id);
    // //     // return this.getAccount(id);
    // //     return this._get('/v2/api/account/' + id, []);
    // // }
    // // updateAccountData(account: any) {
    // //     console.log(account);
    // //     // return this.updateAccount(account);
    // //     return this.http.put(`/v2/api/account/${account.uid}`, account)
    // //         .map(res => res.json())
    // //         .catch(this.handleError);
    // // }

    // // -----------------------
    // // Space Setting 관련
    // // Space Setting update, delete 추가
    // updateSpaceSettingData(spaceSetting: any) {
    //     // console.log(spaceSetting);
    //     return this.http.put(`/v2/api/space/${spaceSetting.uid}`, spaceSetting)
    //         .map(res => res.json())
    //         .catch(this.handleError);
    // }
    // deleteSpaceSettingData(id: any) {
    //     console.log(id);
    //     return this.http.delete('/v2/api/space/' + id, []);
    // }


    // // -----------------------
    // // debugging & testing
    // sendReport(body) {
    //     let headers = new Headers();
    //     headers.append('Content-type', 'application/json');
    //     return this.http.post(this.apiUrl + '/v2/report', JSON.stringify(body), {headers: headers})
    //         .map(res => res.json());
    // }

}
