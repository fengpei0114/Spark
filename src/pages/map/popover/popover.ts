import { Component,Inject, forwardRef } from '@angular/core';
import { IonicPage,NavParams, ViewController } from 'ionic-angular';
import { MapPage } from '../map';
/**
 * Generated class for the PopoverPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-popover',
  template:`
    <ion-list>
        <button ion-item (click)="close(1)">地图</button>
        <button ion-item (click)="close(2)">列表</button>
    </ion-list>
    `
})
export class PopoverPage {

    public index:number;
    constructor(private navParams: NavParams, 
                public viewCtrl: ViewController,
                ) {
        
    }


    close(value: number) {
        console.log(value);
        console.log(this.viewCtrl);
        this.viewCtrl.dismiss(value);

    }
}