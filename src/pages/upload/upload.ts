import { Component } from '@angular/core';
import { IonicPage, NavController, App} from 'ionic-angular';
import { TakePhotoPage } from './take-photo/take-photo';

/**
 * Generated class for the UploadPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-upload',
  templateUrl: 'upload.html',
})
export class UploadPage {


    constructor(public navCtrl: NavController,public app: App) {

    }
    takePhoto() {
        this.app.getRootNav().push(TakePhotoPage);
    }
}
