import { Component } from '@angular/core';
import { NavController, NavParams,ToastController, App } from 'ionic-angular';
import { Http , Headers ,RequestOptions } from '@angular/http';
import { HttpService } from '../../../providers/http-service/http-service';

/**
 * Generated class for the DevicePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-subnodedetail',
  templateUrl: 'subnode_detail.html',
})
export class SubNodeDetailPage {
    subnodeId:number;
    installpoint:string;
    subnode_alarmnum:number;
    subnode_noconfirmalarm:number;
    subnode_malnum:number;
    subnode_noconfirmmal:number;
    subnode_detectornum:number;
    subnode_valvenum:number;
    subnode_detector_1:number;
    subnode_detector_2:number;
    subnode_detector_3:number;
    subnode_detector_4:number;
    subnode_valve_1:number;
    subnode_valve_2:number;
    subnode_valve_3:number;
    subnode_valve_4:number;

    constructor(public http:Http,
                public app:App,
                public navCtrl: NavController,
                public navParams: NavParams,
                private httpService: HttpService,

    ) {
        // this.name = this.navParams.data;
        this.subnodeId = this.navParams.data.subnodeId;
        this.installpoint = this.navParams.data.installpoint;
        this.subnode_alarmnum = this.navParams.data.subnode_alarmnum;
        this.subnode_noconfirmalarm = this.navParams.data.subnode_noconfirmalarm;
        this.subnode_malnum = this.navParams.data.subnode_malnum;
        this.subnode_noconfirmmal = this.navParams.data.subnode_noconfirmmal;
        this.subnode_detectornum = this.navParams.data.subnode_detectornum;
        this.subnode_valvenum = this.navParams.data.subnode_valvenum;
        this.subnode_detector_1 = this.navParams.data.subnode_detector_1;
        this.subnode_detector_2 = this.navParams.data.subnode_detector_2;
        this.subnode_detector_3 = this.navParams.data.subnode_detector_3;
        this.subnode_detector_4 = this.navParams.data.subnode_detector_4;
        this.subnode_valve_1 = this.navParams.data.subnode_valve_1;
        this.subnode_valve_2 = this.navParams.data.subnode_valve_2;
        this.subnode_valve_3 = this.navParams.data.subnode_valve_3;
        this.subnode_valve_4 = this.navParams.data.subnode_valve_4;
    }
    setup(){
        
    }
    getdetailMsg(item){
        
    }
}
