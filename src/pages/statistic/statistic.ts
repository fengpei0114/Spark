import { Component } from '@angular/core';
import { IonicPage, NavController, App, NavParams } from 'ionic-angular';
import { StatisticDetailPage } from './statistic-detail/statistic-detail';
import { AccountService } from '../../providers/account-service/account-service';

/**
 * Generated class for the StaticticPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-statistic',
  templateUrl: 'statistic.html',
})
export class StatisticPage {
    showNoise:boolean = false;
    showWaterlevel:boolean = false;
    showAll:boolean = false;
    constructor(public navCtrl: NavController,
                private app: App,
                public accountService: AccountService,
                private navParams: NavParams,
    ) {
        this.setUp();
    }
    /*
     * 跳转至统计界面
     * */
    setUp() {
        
                this.showNoise = this.accountService.getSysType() == 0? true:false;
                this.showWaterlevel = this.accountService.getSysType() == 1? true:false;
                this.showAll = this.accountService.getSysType() == 3? true:false;
            }
    gotoStatistic(type) {
        // alert("haha");
        this.app.getRootNav().push(StatisticDetailPage,{type:type});

    }

}
