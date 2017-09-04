import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';

import { Camera } from 'ionic-native';


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
        ) {

        this.platform.ready().then(() => {
            this._camera = Camera;
        });

        this.getImageOptions = ['Photo Library', 'Camera'];
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
