import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ToastController, App, Events } from 'ionic-angular';
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

    // @ViewChild('organSelect') organSelect:ElementRef;

    @Output() organizationOut = new EventEmitter();
    @Output() projectOut = new EventEmitter();
    

    // 测试树形结构

    menu:Array<object> = [];
    historyArray = {
        "id":"1",
        "image":"url('../assets/1.png')",
        "name":"设备一",
        "type":"类型一",
        "startTime":"2018-10-05",
        "endTime":"2018-10-10"
    };
    malfunctionArray = {
        "id":"1",
        "color":"url('../assets/2.png')",
        "name":"设备二",
        "type":"类型二",
        "startTime":"2018-10-12",
        "endTime":"2018-10-15"
    };


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
        // 订阅组织机构选中事件
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
    checkAlarm(){
        this.app.getRootNav().push(AlarmPage);
    }
    staticOfHome(){

    }
    runningHistory(){
        this.app.getRootNav().push(HistoryPage);
    }
    checkmalfunction(){
        this.app.getRootNav().push(MalfunctionPage);
    }
    personalMsg(){

    }
    check(type,id){
        if(type=="1"){
            console.log("1");
            this.app.getRootNav().push(HistorydetailPage,id);
        }else if(type=="2"){
            console.log("2");
            this.app.getRootNav().push(MalfunctiondetailPage,id);
        }
    }
}

