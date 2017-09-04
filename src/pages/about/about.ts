import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { LinkedIn, LinkedInLoginScopes } from '@ionic-native/linkedin';
import { NativeStorage } from '@ionic-native/native-storage';


@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(
        public navCtrl: NavController,
        private nativeStorage: NativeStorage,
        private linkedIn: LinkedIn
      ) {

  }

  doLinkedInLogin() {
        console.log('linkedin func start');

        // 'r_basicprofile', 'r_emailaddress', 'rw_company_admin', 'w_share'
        let scopes: LinkedInLoginScopes[] = ['r_basicprofile', 'r_emailaddress', 'rw_company_admin', 'w_share'];
        let promptToInstall = true;

        this.linkedIn.login(scopes, true)
        .then(() => {
            console.log('linkedin Logged in!');
        })
        .catch(e => console.log('Error logging in', e));

    }

    doLinkedInLogout(item, type) {
        this.linkedIn.logout();

        // .then((response) => {
        //     this.nativeStorage.remove('user');
        //     this.navCtrl.pop();
        // }, (error) => {
        //     console.log(error);
        // });

        // this.removeUserAccount(item, type);
        console.log(111111111, this.nativeStorage);

        this.nativeStorage.remove('user');
        console.log(22222222222, this.nativeStorage);
    }

    linkedinSession() {
        this.linkedIn.getActiveSession()
        .then((session) => {
            if (session) {
                console.log('We have an active session');
                console.log('Access token is: ', session.accessToken);
                console.log('Expires on: ', session.expiresOn);
            } else {
                console.log('There is no active session, we need to call the login method');
            }
        });
    }

    // refCode() {

    //     // original
    //     this.linkedIn.login(scopes, promptToInstall)
    //     .then((user) => {
    //             console.log('linkedin user', JSON.stringify(user))
    //             this.loading.dismiss();
    //             //

    //             this.linkedIn.getRequest('people/~').then((get)=> {
    //               console.log('linkedin get ', JSON.stringify(get));
    //             });
    //             let payload = {
    //         comment: 'Hello world!',
    //         visibility: {
    //           code: 'anyone'
    //         }
    //       };
    //             this.linkedIn.postRequest('people/~', payload).then((post)=> {
    //               console.log('linkedin post ', JSON.stringify(post));
    //             });
    //           맞나 확인

    //       this.nativeStorage.setItem('user', {
    //         name: user.displayName,
    //         email: user.email,
    //         // img: user.imageUrl,
    //         img: 'https://lh3.googleusercontent.com/00APBMVQh3yraN704gKCeM63KzeQ-zHUi5wK6E9TjRQ26McyqYBt-zy__4i8GXDAfeys=w300',
    //         token: user.accessToken,
    //             userId: user.id
    //       })
    //       .then((res) => {
    //         console.log('linkedin res ', JSON.stringify(res));
    //         //

    //               let linkedin = {
    //           img: res.img,
    //           email: res.email,
    //           name: res.name,
    //           token: res.token
    //         }
    //         this.newSocialData.linkedin.push(linkedin);
    //                 this.modifiedStatus();

    //         console.log('linkedin nativeStorage ', JSON.stringify(this.nativeStorage), JSON.stringify(this.newSocialData));
    //         this.linkedinSession();

    //       }, (error) => {
    //         console.log(error);
    //       })
    //     }, (error) => {
    //       console.log(error);
    //       this.loading.dismiss();
    //     });
    // }

}
