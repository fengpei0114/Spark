import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the PopoverPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html',
})
export class PopoverPage {

    constructor(private navParams: NavParams, public viewCtrl: ViewController) {
    }


    close(value: number) {
        console.log(value);
            this.viewCtrl.dismiss(value);

    }
}

