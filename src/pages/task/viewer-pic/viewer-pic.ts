import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ViewerPicPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-viewer-pic',
  templateUrl: 'viewer-pic.html',
})
export class ViewerPicPage {

  imageSrc: string = "";
  constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.imageSrc = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewerPicPage');
  }

  dismiss() {
      this.navCtrl.pop().then();
  }


}
