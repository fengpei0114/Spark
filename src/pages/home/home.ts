import { Component, Output, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ToastController, App, Events, Slides } from 'ionic-angular';
import { Http, Headers, RequestOptions } from "@angular/http";
import { HttpService } from '../../providers/http-service/http-service';
import { AccountService } from '../../providers/account-service/account-service';
import { OrganizationServiceProvider } from "../../providers/organization-service/organization-service";
import { MalfunctionPage } from './malfunction/malfunction'

import 'rxjs/add/operator/map';
import { EquipmentPage } from './equipment/equipment';
import { HistoryPage } from './history/history';
import { MalfunctiondetailPage } from './malfunction_detail/malfunction_detail';
import { HistorydetailPage } from './history_detail/history_detail';
import { AlarmPage } from './alarm/alarm';
import { StatusPage } from './status/status';

/**
 * Generated class for the HomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [OrganizationServiceProvider]
})
export class HomePage implements OnInit{
    @ViewChild(Slides) slides: Slides;
    // @ViewChild('organSelect') organSelect:ElementRef;

    @Output() organizationOut = new EventEmitter();
    @Output() projectOut = new EventEmitter();
    


    menu:Array<object> = [];
    equipmentName:string;

    EquipmentArray = [{
        "name":"XXXXX-XXXXX1",
        "id":"1",
        "factoryname":"XXXXXX-XXXX",
        "status":{
            "power":"关",
            "running":"正常",
            "malfunction":"无",
        },
        "alarmMsg":{
            "alarmsum":"123123",
            "alarmtimeEnd":"2018-08-05T15:57:39",
            "malfunctionsum":"234234",
            "malfunctiontimeEnd":"2018-08-05T15:57:39",
            "sittingsum":"345345",
            "sittingtimeEnd":"2018-08-05T15:57:39",
        },
        "statusMsg":{
            "battery":"12",
            "probe1":"开启",
            "probe2":"开启",
            "extinguish1":"开启",
            "extinguish2":"开启",
            "relay1":"开启",
            "relay2":"开启",
        },
    },

    {
        "name":"XXXXX-XXXXX2",
        "id":"2",
        "factoryname":"XXXXXX-XXXX",
        "status":{
            "power":"开",
            "running":"异常",
            "malfunction":"无",
        },
        "alarmMsg":{
            "alarmsum":"123123",
            "alarmtimeEnd":"2018-08-05T15:57:39",
            "malfunctionsum":"234234",
            "malfunctiontimeEnd":"2018-08-05T15:57:39",
            "sittingsum":"345345",
            "sittingtimeEnd":"2018-08-05T15:57:39",
        },
        "statusMsg":{
            "battery":"12",
            "probe1":"开启",
            "probe2":"开启",
            "extinguish1":"开启",
            "extinguish2":"开启",
            "relay1":"开启",
            "relay2":"开启",
        },
    },
    {
        "name":"XXXXX-XXXXX3",
        "id":"3",
        "factoryname":"XXXXXX-XXXX",
        "status":{
            "power":"开",
            "running":"正常",
            "malfunction":"有",
        },
        "alarmMsg":{
            "alarmsum":"123123",
            "alarmtimeEnd":"2018-08-05T15:57:39",
            "malfunctionsum":"234234",
            "malfunctiontimeEnd":"2018-08-05T15:57:39",
            "sittingsum":"345345",
            "sittingtimeEnd":"2018-08-05T15:57:39",
        },
        "statusMsg":{
            "battery":"12",
            "probe1":"开启",
            "probe2":"开启",
            "extinguish1":"开启",
            "extinguish2":"开启",
            "relay1":"开启",
            "relay2":"开启",
        },
    },
    {
        "name":"XXXXX-XXXXX4",
        "id":"4",
        "factoryname":"XXXXXX-XXXX",
        "status":{
            "power":"开",
            "running":"正常",
            "malfunction":"无",
        },
        "alarmMsg":{
            "alarmsum":"123123",
            "alarmtimeEnd":"2018-08-05T15:57:39",
            "malfunctionsum":"234234",
            "malfunctiontimeEnd":"2018-08-05T15:57:39",
            "sittingsum":"345345",
            "sittingtimeEnd":"2018-08-05T15:57:39",
        },
        "statusMsg":{
            "battery":"12",
            "probe1":"开启",
            "probe2":"开启",
            "extinguish1":"开启",
            "extinguish2":"开启",
            "relay1":"开启",
            "relay2":"开启",
        },
    },]

    constructor(public navParams: NavParams,
                public app: App,
                public menuCtrl: MenuController,
                public nav: NavController,
                public http: Http,
                public events: Events,
                public organService: OrganizationServiceProvider,
                private toastCtrl: ToastController,
                public httpService: HttpService,
                private accountService: AccountService,
                // private elementREf:ElementRef,
                // private appConfig: AppConfig,
    ){
        this.equipmentName = this.EquipmentArray[0].name;
    }

    //初始化数据
    setUp() {

    }

    // openMenu(): void{
    //     this.menuCtrl.open();
    // }
    openMenu(): void{
        this.menuCtrl.open();
    }
    ngOnInit() {

    }
    checkAlarm(item){
        this.app.getRootNav().push(AlarmPage,item);
    }
    staticOfHome(){

    }
    checkStatus(item){
        this.app.getRootNav().push(StatusPage,item);
    }
    checkmalfunction(item){
        this.app.getRootNav().push(MalfunctionPage,item);
        // this.app.getRootNav().push(MalfunctionPage);
    }
    personalMsg(){

    }
    slideChanged(){
        console.log(this.EquipmentArray[this.slides.getActiveIndex()].id);
        this.equipmentName = this.EquipmentArray[this.slides.getActiveIndex()].name;
    }
}

