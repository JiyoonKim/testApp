import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';

import { Camera } from 'ionic-native';

// provider
import { System } from '../../providers/system';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    private _camera: any;
    private option: any = {
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType : Camera.PictureSourceType.CAMERA,
        encodingType: Camera.EncodingType.JPEG
    };
    private photos: any;
    private getImageOptions: any;


    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        private platform: Platform,
        private sys: System
        ) {
        let id = sys.user.id;

        this.platform.ready().then(() => {
            this._camera = Camera;
            this.getAccount(id);
        });

        this.getImageOptions = ['Photo Library', 'Camera'];
    }

    // linkedin server
    getAccount(id) {
        this.sys.getAccount(id).subscribe(res => console.log('server res ', res));
    }






    select(e) {
        if (e == 'Photo Library') {
            this.getPhotoLibrary();
        } else if (e == 'Camera') {
            this.getCameraPhoto();
        }
        console.log(e);
    }

    camera() {
        this.option.sourceType = Camera.PictureSourceType.CAMERA;
        return this._camera.getPicture(this.option);
    }

    getImage() {
        this.option.sourceType = Camera.PictureSourceType.PHOTOLIBRARY;
        return this._camera.getPicture(this.option);
    }

    getCameraPhoto() {
        console.log('getCameraPhoto func');

        this.camera().then((image: string) => {
            console.log('get camera image', image);
            this.photos = image;
        });
    }

    getPhotoLibrary() {
        console.log('getPhotoLibrary func');

        this.getImage().then((image: string) => {
            console.log('get photo image', image);
            this.photos = image;
        })
    }

}
